'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Country, VisaType } from '@/lib/supabase';
import StepIndicator from './StepIndicator';
import Step1Selection from './Step1Selection';
import Step2Checklist from './Step2Checklist';
import Step3Application from './Step3Application';
import SuccessScreen from './SuccessScreen';

const STEP_LABELS = ['Select', 'Checklist', 'Apply'];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function VisaWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [countries, setCountries] = useState<Country[]>([]);
  console.log('Countries:', countries);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType | null>(null);

  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);
  const [visaTypesLoading, setVisaTypesLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<{ id: string; name: string; email: string } | null>(null);

useEffect(() => {
  fetch('http://localhost:3006/api/v1/countries')
    .then(async (r) => {
      const data = await r.json();
      console.log("API Response:", data); // 👈 yahan console
      return data?.data || [];
    })
    .then((countries) => {
      console.log("Countries Array:", countries); // 👈 yahan final data
      setCountries(countries);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
    })
    .finally(() => setCountriesLoading(false));
}, []);

  useEffect(() => {
    if (!selectedCountry) { setVisaTypes([]); return; }
    setVisaTypesLoading(true);
    setSelectedVisaType(null);
    fetch(`http://localhost:3006/api/v1/visa-types?countryId=${selectedCountry.id}`)
      .then(async (r) => {
      const data = await r.json();
      console.log("API Response:", data); // 👈 yahan console
      return data?.data || [];
    })
      .then(setVisaTypes)
      .finally(() => setVisaTypesLoading(false));
  }, [selectedCountry]);

  const goNext = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const handleSubmit = async (formData: any, files: File[]) => {
    if (!selectedCountry || !selectedVisaType) return;
    setSubmitting(true);
    try {
      const formDataToSend = new FormData();

      // Add form fields
      formDataToSend.append('applicantName', formData.applicant_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('dateOfBirth', formData.date_of_birth || '');
      formDataToSend.append('nationality', selectedNationality);
      formDataToSend.append('passportNumber', formData.passport_number || '');
      formDataToSend.append('destinationCountryId', selectedCountry.id);
      formDataToSend.append('visaTypeId', selectedVisaType.id);
      formDataToSend.append('notes', '');

      // Add files
      files.forEach((file, index) => {
        formDataToSend.append('documents', file);
      });

      const res = await fetch('http://localhost:3006/api/v1/applications/submit', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!res.ok) throw new Error('Submission failed');
      const app = await res.json();
      setSubmittedApp({ id: app.data.id, name: formData.applicant_name, email: formData.email });
      setDirection(1);
      setStep(4);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDirection(1);
    setSelectedCountry(null);
    setSelectedNationality('');
    setSelectedVisaType(null);
    setVisaTypes([]);
    setSubmittedApp(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div
          className="px-8 pt-8 pb-6"
          style={{ background: 'linear-gradient(135deg, #02143a 0%, #0c4a8a 100%)' }}
        >
          <div className="text-center mb-6">
            <h1 className="font-orbitron text-2xl font-bold text-white tracking-wide">
              Visa Application
            </h1>
            <p className="text-sky-200 text-xs mt-1 font-medium">Powered by Mz Global Experts</p>
          </div>
          {step < 4 && (
            <StepIndicator currentStep={step} totalSteps={3} labels={STEP_LABELS} />
          )}
        </div>

        {/* Body */}
        <div className="px-8 py-8 min-h-[420px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {step === 1 && (
                <Step1Selection
                  countries={countries}
                  loading={countriesLoading}
                  selectedCountry={selectedCountry}
                  selectedNationality={selectedNationality}
                  selectedVisaType={selectedVisaType}
                  visaTypes={visaTypes}
                  visaTypesLoading={visaTypesLoading}
                  onCountryChange={setSelectedCountry}
                  onNationalityChange={setSelectedNationality}
                  onVisaTypeChange={setSelectedVisaType}
                  onNext={goNext}
                />
              )}
              {step === 2 && selectedCountry && selectedVisaType && (
                <Step2Checklist
                  country={selectedCountry}
                  visaType={selectedVisaType}
                  nationality={selectedNationality}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}
              {step === 3 && selectedCountry && selectedVisaType && (
                <Step3Application
                  country={selectedCountry}
                  visaType={selectedVisaType}
                  nationality={selectedNationality}
                  onBack={goBack}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                />
              )}
              {step === 4 && submittedApp && (
                <SuccessScreen
                  applicationId={submittedApp.id}
                  applicantName={submittedApp.name}
                  email={submittedApp.email}
                  onReset={handleReset}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
