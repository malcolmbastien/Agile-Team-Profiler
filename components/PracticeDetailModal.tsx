import React, { useEffect, useState } from 'react';
import type { Practice } from '../types';
import { XIcon } from './icons/XIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface PracticeDetailModalProps {
  practice: Practice;
  onClose: () => void;
  onUpdatePractice: (id: string, newDescription: string) => Promise<void>;
  isUpdating: boolean;
}

const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({ practice, onClose, onUpdatePractice, isUpdating }) => {
  const [editedDescription, setEditedDescription] = useState<string>(practice.description);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isUpdating) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, isUpdating]);

  // Sync local state if practice prop changes (e.g., after an update)
  useEffect(() => {
    setEditedDescription(practice.description);
  }, [practice.description]);

  const handleSave = () => {
    if (!isUpdating && editedDescription.trim() && editedDescription.trim() !== practice.description) {
      onUpdatePractice(practice.id, editedDescription.trim());
    }
  };


  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={!isUpdating ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="practice-detail-title"
    >
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }

        @keyframes slide-up {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
      <div
        className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up border border-slate-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 id="practice-detail-title" className="text-xl font-bold text-slate-800 tracking-wide">
            Practice Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
            aria-label="Close modal"
            disabled={isUpdating}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label htmlFor="practice-description-edit" className="block text-base font-medium text-slate-600 mb-2">
                Practice Description
              </label>
              <textarea
                id="practice-description-edit"
                rows={3}
                className="w-full bg-white border-2 border-slate-300 rounded-lg p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors disabled:opacity-75"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                disabled={isUpdating}
                aria-label="Practice description"
              />
            </div>

            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-sky-600 mb-2 flex items-center">
                <span role="img" aria-label="sparkles" className="mr-2">✨</span> AI Coach Summary
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">{practice.summary.summary}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-cyan-600 border-b border-slate-200 pb-2 mb-4">
              Key Takeaways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros Column */}
              <div>
                <h4 className="text-lg font-semibold text-sky-600 mb-3 flex items-center">
                  <span role="img" aria-label="thumbs up" className="mr-2 text-xl">👍</span> Key Pros
                </h4>
                {(practice.summary.key_pros?.length ?? 0) > 0 ? (
                  <ul className="space-y-2 list-disc list-inside text-slate-700">
                    {practice.summary.key_pros.map((pro, index) => (
                      <li key={`pro-${index}`}>{pro}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-base text-slate-500 italic p-3 bg-slate-100 rounded-lg">No key pros identified.</div>
                )}
              </div>

              {/* Cons Column */}
              <div>
                <h4 className="text-lg font-semibold text-rose-500 mb-3 flex items-center">
                  <span role="img" aria-label="thumbs down" className="mr-2 text-xl">👎</span> Key Cons
                </h4>
                {(practice.summary.key_cons?.length ?? 0) > 0 ? (
                  <ul className="space-y-2 list-disc list-inside text-slate-700">
                    {practice.summary.key_cons.map((con, index) => (
                      <li key={`con-${index}`}>{con}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-base text-slate-500 italic p-3 bg-slate-100 rounded-lg">No key cons identified.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex-shrink-0 flex justify-end items-center p-4 border-t border-slate-200 bg-slate-100/70 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-base font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdating}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating || !editedDescription.trim() || editedDescription.trim() === practice.description}
            className="ml-3 whitespace-nowrap flex items-center justify-center bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform active:scale-95 shadow-lg shadow-sky-600/40"
          >
            {isUpdating ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Saving...
              </>
            ) : (
              'Save & Re-analyze'
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PracticeDetailModal;