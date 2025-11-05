import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface PracticeInputProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onAddPractice: (description: string) => void;
  isLoading: boolean;
}

const PracticeInput: React.FC<PracticeInputProps> = ({ description, onDescriptionChange, onAddPractice, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isLoading) {
      onAddPractice(description.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="practice-description" className="block text-lg font-medium text-slate-200 mb-2">
        Add a Team Practice
      </label>
      <div className="relative">
        <textarea
          id="practice-description"
          rows={4}
          className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-slate-200 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder="e.g., We hold a daily stand-up meeting for 15 minutes to sync on progress and blockers."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="mt-3 w-full flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-sky-900/50"
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
  );
};

export default PracticeInput;