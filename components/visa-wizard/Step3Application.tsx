'use client';

import { Country, VisaType } from '@/lib/supabase';
import { User, Mail, Phone, Calendar, CreditCard, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface FormData {
  applicant_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  passport_number: string;
}

interface Step3Props {
  country: Country;
  visaType: VisaType;
  nationality: string;
  onBack: () => void;
  onSubmit: (formData: FormData, files: File[]) => Promise<void>;
  submitting: boolean;
}

export default function Step3Application({
  country, visaType, nationality, onBack, onSubmit, submitting
}: Step3Props) {
  const [form, setForm] = useState<FormData>({
    applicant_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    passport_number: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles(prev => [...prev, ...Array.from(newFiles)]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const isValid = form.applicant_name && form.email && form.phone && form.passport_number;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(form, files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{country.flag_emoji}</span>
          <h2 className="font-orbitron text-xl font-bold text-slate-800">Personal Details</h2>
        </div>
        <p className="text-sm text-slate-500 ml-8">
          Applying for <span className="font-semibold text-sky-700">{visaType.name}</span>
        </p>
      </div>

      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="font-orbitron text-xs font-bold text-slate-500 uppercase tracking-widest">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <User className="w-3.5 h-3.5 text-sky-600" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.applicant_name}
              onChange={update('applicant_name')}
              placeholder="As on passport"
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              placeholder="+1 (555) 000-0000"
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              Date of Birth
            </label>
            <input
              type="date"
              value={form.date_of_birth}
              onChange={update('date_of_birth')}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <CreditCard className="w-3.5 h-3.5 text-sky-600" />
              Passport Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.passport_number}
              onChange={update('passport_number')}
              placeholder="e.g. A12345678"
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors font-mono"
            />
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-3">
        <h3 className="font-orbitron text-xs font-bold text-slate-500 uppercase tracking-widest">
          Document Upload
        </h3>
        <p className="text-xs text-slate-400">
          Upload scanned copies of the {visaType.documentChecklist.length} required documents
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver ? 'border-sky-400 bg-sky-50' : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? 'text-sky-500' : 'text-slate-300'}`} />
          <p className="text-sm font-medium text-slate-600">Drop files here or <span className="text-sky-600">browse</span></p>
          <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG — up to 10MB each</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-sky-700 uppercase">{f.name.split('.').pop()}</span>
                  </div>
                  <span className="text-sm text-slate-700 truncate">{f.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{(f.size / 1024).toFixed(0)}KB</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-slate-400 hover:text-red-500 transition-colors ml-2 text-lg leading-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-orbitron text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-orbitron text-sm font-semibold text-white bg-sky-700 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 active:scale-95"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
}
