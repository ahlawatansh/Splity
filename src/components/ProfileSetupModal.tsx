import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  // By default name is user
  const [fullName, setFullName] = useState(() => localStorage.getItem('profile_fullname') || 'User');
  // Mobile phone number
  const [mobilePhone, setMobilePhone] = useState(() => localStorage.getItem('profile_phone') || user?.phone || '+91 98765 43210');
  // Monthly spending limit (budget)
  const [spendingLimit, setSpendingLimit] = useState(() => localStorage.getItem('profile_ceiling') || '45000');
  // Target monthly savings
  const [targetSavings, setTargetSavings] = useState(() => localStorage.getItem('profile_savings') || '10000');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNameFocusOrClick = () => {
    // On clicking user it should be blank ready for taking name
    if (fullName.trim().toLowerCase() === 'user') {
      setFullName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const resolvedName = fullName.trim() || 'Ansh Ahlawat';
    const resolvedPhone = mobilePhone.trim() || '+91 98765 43210';
    const resolvedLimit = spendingLimit.trim() || '45000';
    const resolvedSavings = targetSavings.trim() || '10000';

    localStorage.setItem('profile_fullname', resolvedName);
    localStorage.setItem('profile_phone', resolvedPhone);
    localStorage.setItem('profile_ceiling', resolvedLimit);
    localStorage.setItem('profile_savings', resolvedSavings);

    if (user?.id) {
      localStorage.setItem(`profile_setup_done_${user.id}`, 'true');
    }
    localStorage.setItem('profile_setup_done_global', 'true');

    window.dispatchEvent(new CustomEvent('splity:refresh'));

    setTimeout(() => {
      setSubmitting(false);
      onComplete();
    }, 200);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3.5 sm:p-6 overflow-hidden pointer-events-auto -translate-y-4 sm:-translate-y-5">
          {/* Backdrop — no click-to-close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/25 backdrop-blur-[6px] pointer-events-none"
          />

          {/* Outer frosted container — wide, matching other modals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 w-[94vw] max-w-2xl sm:max-w-3xl p-2 rounded-[36px] bg-white/[0.325] border-none shadow-none pointer-events-auto"
          >
            {/* Inner white card */}
            <div className="bg-white rounded-[28px] border border-[#edf2ee] flex flex-col overflow-hidden shadow-none">
              {/* Header — no close button */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-[#edf2ee] bg-white shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight truncate">
                        Personal Profile Setup
                      </h2>
                      <span className="text-[10px] font-semibold bg-[rgba(22,101,52,0.08)] text-[#166534] px-2.5 py-0.5 rounded-full border border-[rgba(22,101,52,0.14)]">
                        Onboarding
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-light mt-0.5 truncate">
                      Configure your finance identity to get started
                    </p>
                  </div>
                </div>
                {/* No close button — user must save & continue */}
              </div>

              {/* Body: Horizontal 3-column layout for wide feel */}
              <div className="p-5 sm:p-7">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Four fields: 2x2 on tablet/desktop or 4 on wide desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onFocus={handleNameFocusOrClick}
                        onClick={handleNameFocusOrClick}
                        placeholder="Full Name"
                        required
                        className="w-full h-10 px-3.5 rounded-2xl border border-gray-200/90 hover:border-gray-300 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 text-xs sm:text-[12.5px] text-gray-900 placeholder:text-gray-400 placeholder:text-[11px] font-light transition-all outline-none bg-white shadow-none"
                      />
                      <p className="text-[10px] text-gray-400 font-light px-0.5">
                        Shown across ledger &amp; dashboard
                      </p>
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700 block">
                        Mobile Number (+91)
                      </label>
                      <input
                        type="text"
                        value={mobilePhone}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const afterPrefix = raw.replace(/^(\+91|\+9|\+)?\s*/, '');
                          const digits = afterPrefix.replace(/\D/g, '').slice(0, 10);
                          setMobilePhone(digits ? `+91 ${digits}` : '+91 ');
                        }}
                        placeholder="+91 98765 43210"
                        className="w-full h-10 px-3.5 rounded-2xl border border-gray-200/90 hover:border-gray-300 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 text-xs sm:text-[12.5px] text-gray-900 placeholder:text-gray-400 placeholder:text-[11px] font-mono-num font-light transition-all outline-none bg-white shadow-none"
                      />
                      <p className="text-[10px] text-gray-400 font-light px-0.5">
                        Peer contact &amp; settlement mobile
                      </p>
                    </div>

                    {/* Monthly Budget Limit */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700 block">
                        Monthly Budget Limit (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none select-none">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={spendingLimit}
                          onChange={(e) => setSpendingLimit(e.target.value)}
                          placeholder="45000"
                          required
                          className="w-full h-10 pl-8 pr-3.5 rounded-2xl border border-gray-200/90 hover:border-gray-300 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 text-xs sm:text-[12.5px] text-gray-900 placeholder:text-gray-400 placeholder:text-[11px] font-mono-num font-light transition-all outline-none bg-white shadow-none"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 font-light px-0.5">
                        Fixed total budget ceiling
                      </p>
                    </div>

                    {/* Monthly Savings Target */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700 block">
                        Monthly Savings Goal (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none select-none">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={targetSavings}
                          onChange={(e) => setTargetSavings(e.target.value)}
                          placeholder="25000"
                          className="w-full h-10 pl-8 pr-3.5 rounded-2xl border border-gray-200/90 hover:border-gray-300 focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 text-xs sm:text-[12.5px] text-gray-900 placeholder:text-gray-400 placeholder:text-[11px] font-mono-num font-light transition-all outline-none bg-white shadow-none"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 font-light px-0.5">
                        Target retained savings
                      </p>
                    </div>
                  </div>

                  {/* Save & Continue button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-10 rounded-2xl font-medium text-xs text-white flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] active:scale-[0.99] transition-all cursor-pointer shadow-none"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Profile &amp; Continue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
};
