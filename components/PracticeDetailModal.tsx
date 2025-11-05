import React, { useEffect, useMemo, useState } from 'react';
import type { Practice, Attribute } from '../types';
import { ATTRIBUTES } from '../constants';
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

  const attributesById = useMemo(() => Object.fromEntries(ATTRIBUTES.map(attr => [attr.id, attr])), []);

  const { positiveImpacts, negativeImpacts } = useMemo(() => {
    const summary = practice.summary;
    if (!summary) {
      return { positiveImpacts: [], negativeImpacts: [] };
    }

    const positive = summary.positive_impacts.map(attrId => {
      const attribute = attributesById[attrId];
      const score = practice.scores[attrId] || 0;
      return { attribute, score };
    }).filter((item): item is { attribute: Attribute; score: number } => !!item.attribute);
    
    const negative = summary.negative_impacts.map(attrId => {
      const attribute = attributesById[attrId];
      const score = practice.scores[attrId] || 0;
      return { attribute, score };
    }).filter((item): item is { attribute: Attribute; score: number } => !!item.attribute);

    positive.sort((a, b) => b.score - a.score);
    negative.sort((a, b) => a.score - b.score);
    
    return { positiveImpacts: positive, negativeImpacts: negative };
  }, [practice.summary, practice.scores, attributesById]);


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
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
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
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h2 id="practice-detail-title" className="text-xl font-bold text-slate-100 tracking-wide">
            Practice Analysis
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Close modal"
            disabled={isUpdating}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label htmlFor="practice-description-edit" className="block text-sm font-medium text-slate-400 mb-2">
                Practice Description
              </label>
              <textarea
                id="practice-description-edit"
                rows={3}
                className="w-full bg-gray-900/60 border-2 border-gray-700 rounded-lg p-3 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors disabled:opacity-75"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                disabled={isUpdating}
                aria-label="Practice description"
              />
            </div>

            <div className="p-4 bg-gray-900/60 rounded-lg">
              <h3 className="text-md font-semibold text-sky-400 mb-2 flex items-center">
                <span role="img" aria-label="sparkles" className="mr-2">✨</span> AI Coach Summary
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">{practice.summary.summary}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-semibold text-cyan-400 border-b border-gray-700 pb-2 mb-4">
              Attribute Impact Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Positive Impacts Column */}
              <div>
                <h4 className="text-lg font-semibold text-sky-400 mb-3 flex items-center">
                  <span role="img" aria-label="thumbs up" className="mr-2 text-xl">👍</span> Pros
                </h4>
                {positiveImpacts.length > 0 ? (
                  <ul className="space-y-2">
                    {positiveImpacts.map(({ attribute, score }) => (
                      <li key={attribute.id} className="p-3 bg-gray-900/60 rounded-lg group" title={attribute.description}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-300">{attribute.name}</span>
                          <span className={`font-bold ${score > 0 ? 'text-sky-400' : score < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                            {score > 0 ? `+${score}` : score}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500 italic p-3 bg-gray-900/60 rounded-lg">No significant positive impacts identified.</div>
                )}
              </div>

              {/* Negative Impacts Column */}
              <div>
                <h4 className="text-lg font-semibold text-rose-400 mb-3 flex items-center">
                  <span role="img" aria-label="thumbs down" className="mr-2 text-xl">👎</span> Cons
                </h4>
                {negativeImpacts.length > 0 ? (
                  <ul className="space-y-2">
                    {negativeImpacts.map(({ attribute, score }) => (
                      <li key={attribute.id} className="p-3 bg-gray-900/60 rounded-lg group" title={attribute.description}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-300">{attribute.name}</span>
                           <span className={`font-bold ${score > 0 ? 'text-sky-400' : score < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                            {score > 0 ? `+${score}` : score}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500 italic p-3 bg-gray-900/60 rounded-lg">No significant negative impacts identified.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex-shrink-0 flex justify-end items-center p-4 border-t border-gray-700 bg-gray-800 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdating}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating || !editedDescription.trim() || editedDescription.trim() === practice.description}
            className="ml-3 w-36 flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform active:scale-95 shadow-lg shadow-sky-900/50"
          >
            {isUpdating ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PracticeDetailModal;