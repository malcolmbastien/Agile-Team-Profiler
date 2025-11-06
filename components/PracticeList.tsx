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
      <div className="text-center py-10 px-4 bg-white rounded-lg border-2 border-dashed border-slate-200">
        <h3 className="text-xl font-medium text-slate-700">No practices added yet.</h3>
        <p className="text-slate-500 mt-1">Add your first practice above to build your team profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Added Practices
      </h3>
      {sortedCategories.map((category) => (
        <div key={category}>
          <h4 className="text-lg font-semibold text-sky-600 mb-3 border-b border-slate-200 pb-2">
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