import React from 'react';
import type { Practice, Scores } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { ATTRIBUTE_GROUPS } from '../constants';

interface PracticeListItemProps {
  practice: Practice;
  onRemovePractice: (id: string) => void;
  onSelectPractice: (practice: Practice) => void;
}

const getGradeForGroup = (scores: Scores, attributeIds: string[]): { grade: string; colorClasses: string } => {
  if (!attributeIds || attributeIds.length === 0) {
    return { grade: 'N/A', colorClasses: 'bg-slate-200 text-slate-700' };
  }
  
  const groupScores = attributeIds.map(id => scores[id] || 0);
  const averageScore = groupScores.reduce((sum, score) => sum + score, 0) / groupScores.length;

  if (averageScore > 3) return { grade: 'A', colorClasses: 'bg-emerald-100 text-emerald-800 border border-emerald-200' };
  if (averageScore > 1) return { grade: 'B', colorClasses: 'bg-sky-100 text-sky-800 border border-sky-200' };
  if (averageScore > -1) return { grade: 'C', colorClasses: 'bg-slate-200 text-slate-700 border border-slate-300' };
  if (averageScore > -3) return { grade: 'D', colorClasses: 'bg-amber-100 text-amber-800 border border-amber-200' };
  return { grade: 'F', colorClasses: 'bg-rose-100 text-rose-800 border border-rose-200' };
};

const PracticeListItem: React.FC<PracticeListItemProps> = ({ practice, onRemovePractice, onSelectPractice }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl flex justify-between items-start group transition-all duration-200 hover:shadow-lg hover:border-slate-300 border border-slate-200"
    >
      <button
        onClick={() => onSelectPractice(practice)}
        className="text-left flex-grow"
        aria-label={`View details for practice: ${practice.description}`}
      >
        <p className="text-slate-700 group-hover:text-slate-900 pr-4 text-base">{practice.description}</p>
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
            {ATTRIBUTE_GROUPS.map((group) => {
              const { grade, colorClasses } = getGradeForGroup(practice.scores, group.attributeIds);
              return (
                <div key={group.title} title={group.title} className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
                  {group.title}: <span className="font-bold">{grade}</span>
                </div>
              );
            })}
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening when deleting
          onRemovePractice(practice.id)
        }}
        className="text-slate-400 flex-shrink-0 hover:text-rose-500 transition-colors p-1 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 ml-2"
        aria-label="Remove practice"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PracticeListItem;
