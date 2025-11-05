import React from 'react';
import type { Practice } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface PracticeListItemProps {
  practice: Practice;
  onRemovePractice: (id: string) => void;
  onSelectPractice: (practice: Practice) => void;
}

const PracticeListItem: React.FC<PracticeListItemProps> = ({ practice, onRemovePractice, onSelectPractice }) => {
  return (
    <div
      className="bg-gray-800/40 p-4 rounded-xl flex justify-between items-center group transition-all duration-200 hover:bg-gray-700/60"
    >
      <button
        onClick={() => onSelectPractice(practice)}
        className="text-left flex-grow"
        aria-label={`View details for practice: ${practice.description}`}
      >
        <p className="text-slate-200 group-hover:text-white pr-4">{practice.description}</p>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening when deleting
          onRemovePractice(practice.id)
        }}
        className="text-gray-500 flex-shrink-0 hover:text-rose-500 transition-colors p-1 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Remove practice"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PracticeListItem;