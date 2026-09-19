'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-10">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? '#0369a1'
                    : isActive
                    ? '#0c4a8a'
                    : '#e2e8f0',
                  borderColor: isCompleted || isActive ? '#0369a1' : '#cbd5e1',
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm"
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span
                    className="font-orbitron text-xs font-bold"
                    style={{ color: isActive ? '#ffffff' : '#94a3b8' }}
                  >
                    {stepNum}
                  </span>
                )}
              </motion.div>
              <span
                className="mt-2 text-xs font-medium text-center max-w-[72px] leading-tight"
                style={{
                  color: isActive ? '#0c4a8a' : isCompleted ? '#0369a1' : '#94a3b8',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '10px',
                }}
              >
                {labels[i]}
              </span>
            </div>

            {i < totalSteps - 1 && (
              <div className="relative mx-2 mt-[-20px]" style={{ width: '60px' }}>
                <div className="h-[2px] w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-sky-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > stepNum ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
