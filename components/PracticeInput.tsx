import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';

interface PracticeInputProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onAddPractice: (description: string) => void;
  isLoading: boolean;
  onGenerateIdea: () => void;
  isGeneratingIdea: boolean;
}

const PracticeInput: React.FC<PracticeInputProps> = ({ description, onDescriptionChange, onAddPractice, isLoading, onGenerateIdea, isGeneratingIdea }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isLoading && !isGeneratingIdea) {
      onAddPractice(description.trim());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="practice-description" className="block text-lg font-semibold text-slate-700">
            Add a Team Practice
          </label>
          <button
            type="button"
            onClick={onGenerateIdea}
            disabled={isGeneratingIdea || isLoading}
            className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors disabled:text-slate-400 disabled:cursor-not-allowed flex items-center"
            aria-live="polite"
          >
            {isGeneratingIdea ? (
              <>
                <LoadingSpinner className="w-4 h-4 mr-1.5" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4 mr-1.5" />
                Suggest a Practice
              </>
            )}
          </button>
        </div>
        <div className="relative">
          <textarea
            id="practice-description"
            rows={4}
            className="w-full bg-white border-2 border-slate-300 rounded-lg p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors disabled:opacity-70"
            placeholder="e.g., We hold a daily stand-up meeting for 15 minutes to sync on progress and blockers."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={isLoading || isGeneratingIdea}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || isGeneratingIdea || !description.trim()}
          className="mt-3 w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-sky-600/40"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="w-5 h-5 mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Practice & Update Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PracticeInput;