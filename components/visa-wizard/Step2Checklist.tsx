'use client';

import { motion } from 'framer-motion';
import { Country, VisaType } from '@/lib/supabase';
import { CheckSquare, Clock, DollarSign, FileText, Info, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Step2Props {
  country: Country;
  visaType: VisaType;
  nationality: string;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2Checklist({ country, visaType, nationality, onBack, onNext }: Step2Props) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allChecked = checkedItems.size === visaType.documentChecklist?.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{country.flag_emoji}</span>
          <h2 className="font-orbitron text-xl font-bold text-slate-800">
            {visaType.name}
          </h2>
        </div>
        <p className="text-sm text-slate-500 ml-9">
          Document checklist for <span className="font-semibold text-sky-700">{nationality}</span> nationals applying to <span className="font-semibold text-sky-700">{country.name}</span>
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-xl p-3">
          <Clock className="w-4 h-4 text-sky-600 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Processing</div>
            <div className="text-sm font-semibold text-slate-800">{visaType.processing_time}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Visa Fee</div>
            <div className="text-sm font-semibold text-slate-800">{visaType.fee > 0 ? `$${visaType.fee}` : 'Free'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 col-span-2 md:col-span-1">
          <FileText className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Documents</div>
            <div className="text-sm font-semibold text-slate-800">{visaType.documentChecklist?.length} required</div>
          </div>
        </div>
      </div>

      {/* Requirements note */}
      {visaType.requirements && (
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">{visaType.requirements}</p>
        </div>
      )}

      {/* Checklist */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron text-sm font-bold text-slate-700">Required Documents</h3>
          <span className="text-xs text-slate-400">{checkedItems.size}/{visaType.documentChecklist?.length} collected</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sky-600 rounded-full"
            animate={{ width: `${(checkedItems.size / visaType.documentChecklist?.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="space-y-2 mt-3">
          {visaType.documentChecklist?.map((item, index) => {
            const checked = checkedItems.has(index);
            return (
              <motion.button
                key={index}
                onClick={() => toggleItem(index)}
                className={`checklist-item w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  checked
                    ? 'bg-sky-50 border-sky-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked ? 'bg-sky-600 border-sky-600' : 'border-slate-300 bg-white'
                }`}>
                  {checked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </div>
                <span className={`text-sm leading-snug ${checked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                  {item}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {allChecked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3"
        >
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">All documents collected! Ready to apply.</span>
        </motion.div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-orbitron text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-orbitron text-sm font-semibold text-white bg-sky-700 hover:bg-sky-600 transition-all duration-200 shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 active:scale-95"
        >
          Start Application
        </button>
      </div>
    </div>
  );
}
