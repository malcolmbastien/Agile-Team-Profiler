import React from 'react';
import { EXAMPLE_PRACTICES } from '../data/examplePractices';

interface ExamplePracticesProps {
  onSelect: (description: string) => void;
}

const ExamplePractices: React.FC<ExamplePracticesProps> = ({ onSelect }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_PRACTICES.map((practice, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(practice)}
            className="px-3 py-1.5 text-sm bg-white border border-slate-300 text-slate-600 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-sky-500"
            aria-label={`Use example practice: ${practice}`}
          >
            {practice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePractices;