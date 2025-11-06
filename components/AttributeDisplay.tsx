import React from 'react';
import { SCORE_MAX } from '../constants';
import type { Attribute } from '../types';

interface AttributeDisplayProps {
  attribute: Attribute;
  score: number;
}

const AttributeDisplay: React.FC<AttributeDisplayProps> = ({ attribute, score }) => {
  const barColor = score > 0 ? 'bg-sky-500' : 'bg-rose-500';
  const barWidth = `${(Math.abs(score) / SCORE_MAX) * 50}%`;
  const barPosition = score > 0 ? { left: '50%' } : { right: '50%' };

  return (
    <div title={attribute.description}>
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-medium text-slate-700 truncate pr-2">{attribute.name}</h4>
        <span className={`font-semibold text-lg ${score > 0 ? 'text-sky-500' : score < 0 ? 'text-rose-500' : 'text-slate-500'}`}>
          {score > 0 ? `+${score}` : score}
        </span>
      </div>
      <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="absolute top-0 h-full w-px bg-slate-300 z-10" style={{ left: '50%' }}></div>
        <div 
          className={`absolute top-0 h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: barWidth, ...barPosition }}
        />
      </div>
    </div>
  );
};

export default AttributeDisplay;
