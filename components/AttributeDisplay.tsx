import React from 'react';
import { SCORE_MAX } from '../constants';
import type { Attribute } from '../types';

interface AttributeDisplayProps {
  attribute: Attribute;
  score: number;
}

const AttributeDisplay: React.FC<AttributeDisplayProps> = ({ attribute, score }) => {
  const barColor = score > 0 ? 'bg-sky-500' : 'bg-rose-500';
  const barWidth = `${(Math.abs(score) / (SCORE_MAX * 2)) * 100}%`;
  const barPosition = score > 0 ? { left: '50%' } : { right: '50%' };

  return (
    <div className="p-3 bg-gray-800/40 rounded-lg group transition-all duration-300 hover:bg-gray-700/60 border border-transparent hover:border-gray-600">
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white">{attribute.name}</h4>
        <span className={`font-bold text-lg ${score > 0 ? 'text-sky-400' : score < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
          {score > 0 ? `+${score}` : score}
        </span>
      </div>
      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="absolute top-0 h-full w-px bg-gray-600 z-10" style={{ left: '50%' }}></div>
        <div 
          className={`absolute top-0 h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: barWidth, ...barPosition }}
        />
      </div>
      <p className="text-sm text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {attribute.description}
      </p>
    </div>
  );
};

export default AttributeDisplay;