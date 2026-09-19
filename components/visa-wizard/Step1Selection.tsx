'use client';

import { Country, VisaType } from '@/lib/supabase';
import { Globe, MapPin, Loader2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Argentine',
  'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahraini', 'Bangladeshi',
  'Belarusian', 'Belgian', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bulgarian',
  'Cambodian', 'Cameroonian', 'Canadian', 'Chilean', 'Chinese', 'Colombian', 'Congolese',
  'Croatian', 'Cuban', 'Czech', 'Danish', 'Dominican', 'Dutch', 'Ecuadorian', 'Egyptian',
  'Emirati', 'Estonian', 'Ethiopian', 'Filipino', 'Finnish', 'French', 'Georgian',
  'German', 'Ghanaian', 'Greek', 'Guatemalan', 'Honduran', 'Hungarian', 'Indian',
  'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Jamaican', 'Japanese',
  'Jordanian', 'Kazakhstani', 'Kenyan', 'Korean', 'Kuwaiti', 'Latvian', 'Lebanese',
  'Lithuanian', 'Luxembourgish', 'Malaysian', 'Maldivian', 'Mexican', 'Moldovan',
  'Mongolian', 'Moroccan', 'Mozambican', 'Namibian', 'Nepalese', 'New Zealander',
  'Nigerian', 'Norwegian', 'Omani', 'Pakistani', 'Palestinian', 'Panamanian', 'Peruvian',
  'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Saudi', 'Senegalese',
  'Serbian', 'Singaporean', 'Slovak', 'Slovenian', 'Somali', 'South African', 'Spanish',
  'Sri Lankan', 'Sudanese', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tanzanian',
  'Thai', 'Tunisian', 'Turkish', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani',
  'Venezuelan', 'Vietnamese', 'Yemeni', 'Zambian', 'Zimbabwean',
];

interface Step1Props {
  countries: Country[];
  loading: boolean;
  selectedCountry: Country | null;
  selectedNationality: string;
  selectedVisaType: VisaType | null;
  visaTypes: VisaType[];
  visaTypesLoading: boolean;
  onCountryChange: (country: Country) => void;
  onNationalityChange: (nationality: string) => void;
  onVisaTypeChange: (visaType: VisaType) => void;
  onNext: () => void;
}

const categoryColors: Record<string, string> = {
  Study: 'bg-sky-100 text-sky-700 border-sky-200',
  Work: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Tourist: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function Step1Selection({
  countries, loading, selectedCountry, selectedNationality,
  selectedVisaType, visaTypes, visaTypesLoading,
  onCountryChange, onNationalityChange, onVisaTypeChange, onNext,
}: Step1Props) {
  const canProceed = selectedCountry && selectedNationality && selectedVisaType;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-orbitron text-xl font-bold text-slate-800 mb-1">
          Select Your Destination
        </h2>
        <p className="text-sm text-slate-500">Choose your destination country, nationality, and visa type</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Destination Country */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Globe className="w-4 h-4 text-sky-600" />
            Destination Country
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-10 text-slate-800 font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer hover:border-sky-300"
              value={selectedCountry?.id || ''}
              onChange={(e) => {
                const c = countries.find(c => c.id === e.target.value);
                if (c) onCountryChange(c);
              }}
              disabled={loading}
            >
              <option value="">
                {loading ? 'Loading countries...' : '-- Select destination --'}
              </option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag_emoji} {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            {loading && (
              <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 animate-spin" />
            )}
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin className="w-4 h-4 text-sky-600" />
            Your Nationality
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-10 text-slate-800 font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer hover:border-sky-300"
              value={selectedNationality}
              onChange={(e) => onNationalityChange(e.target.value)}
            >
              <option value="">-- Select nationality --</option>
              {NATIONALITIES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Visa Type Cards */}
      {selectedCountry && (
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            Select Visa Type
          </label>

          {visaTypesLoading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
              <span className="text-sm">Loading visa types...</span>
            </div>
          ) : visaTypes.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
              No visa types found for this country
            </div>
          ) : (
            <div className="grid gap-3">
              {visaTypes?.map((vt) => (
                <button
                  key={vt.id}
                  onClick={() => onVisaTypeChange(vt)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedVisaType?.id === vt.id
                      ? 'border-sky-500 bg-sky-50 shadow-sm shadow-sky-100'
                      : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-800 text-sm">{vt.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[vt.category] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {vt.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{vt.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {/* <div className="text-sm font-bold text-slate-800">{vt.fee > 0 ? `$${vt.fee.toFixed(0)}` : 'Free'}</div> */}
                      <div className="text-xs text-slate-400">{vt.processing_time}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 rounded-xl font-orbitron text-sm font-semibold text-white bg-sky-700 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 active:scale-95"
        >
          View Checklist
        </button>
      </div>
    </div>
  );
}
