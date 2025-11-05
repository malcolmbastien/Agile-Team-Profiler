import React, { useMemo } from 'react';
import type { Practice } from '../types';
import PracticeListItem from './PracticeListItem';

interface PracticeListProps {
  practices: Practice[];
  onRemovePractice: (id: string) => void;
  onSelectPractice: (practice: Practice) => void;
}

const PracticeList: React.FC<PracticeListProps> = ({ practices, onRemovePractice, onSelectPractice }) => {
  const groupedPractices = useMemo(() => {
    return practices.reduce((acc, practice) => {
      const category = practice.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(practice);
      return acc;
    }, {} as Record<string, Practice[]>);
  }, [practices]);

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedPractices).sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return a.localeCompare(b);
    });
  }, [groupedPractices]);

  if (practices.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
        <h3 className="text-lg font-medium text-slate-300">No practices added yet.</h3>
        <p className="text-slate-400">Add your first practice above to build your team profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-slate-100 mb-2">
        Added Practices
      </h3>
      {sortedCategories.map((category) => (
        <div key={category}>
          <h4 className="text-md font-semibold text-sky-400 mb-3 border-b border-gray-700 pb-2">
            {category}
          </h4>
          <div className="space-y-3">
            {groupedPractices[category].map((practice) => (
              <PracticeListItem
                key={practice.id}
                practice={practice}
                onSelectPractice={onSelectPractice}
                onRemovePractice={onRemovePractice}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PracticeList;