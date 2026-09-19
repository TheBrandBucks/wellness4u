'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  applicationId: string;
  applicantName: string;
  email: string;
  onReset: () => void;
}

export default function SuccessScreen({ applicationId, applicantName, email, onReset }: SuccessScreenProps) {
  return (
    <div className="text-center py-6 space-y-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h2 className="font-orbitron text-2xl font-bold text-slate-800">Application Submitted!</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Thank you, <span className="font-semibold text-slate-700">{applicantName}</span>. Your visa application has been received.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto space-y-3"
      >
        <div className="text-left space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Reference ID</span>
            <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-1 rounded-lg">
              {applicationId.slice(0, 8).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Confirmation sent to</span>
            <span className="text-xs font-medium text-slate-700">{email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Status</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Under Review</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-slate-400 max-w-xs mx-auto"
      >
        Our visa experts will review your application within 24 hours and contact you at the provided email.
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl font-orbitron text-sm font-semibold text-sky-700 border-2 border-sky-200 hover:bg-sky-50 transition-all duration-200 active:scale-95"
      >
        Start New Application
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
