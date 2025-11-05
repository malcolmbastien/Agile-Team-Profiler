import React from 'react';
import { EXAMPLE_PRACTICES } from '../data/examplePractices';

interface ExamplePracticesProps {
  onSelect: (description: string) => void;
}

const ExamplePractices: React.FC<ExamplePracticesProps> = ({ onSelect }) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-slate-400 mb-3">Need inspiration? Try one of these:</h3>
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_PRACTICES.map((practice, index) => (
          <button
            key={index}
            onClick={() => onSelect(practice)}
            className="px-3 py-1.5 text-xs bg-gray-700/60 text-slate-300 rounded-full hover:bg-gray-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500"
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