import React from 'react';
import { ATTRIBUTES, ATTRIBUTE_GROUPS } from '../constants';
import type { Scores } from '../types';
import AttributeDisplay from './AttributeDisplay';

interface TeamProfileProps {
  totalScores: Scores;
}

const TeamProfile: React.FC<TeamProfileProps> = ({ totalScores }) => {
  const attributesById = Object.fromEntries(ATTRIBUTES.map(attr => [attr.id, attr]));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 lg:p-8 h-full sticky top-8">
      <div className="border-b-2 border-sky-500/30 pb-4 mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-100 tracking-wide">Agile Team Profile</h2>
        <p className="text-slate-300 mt-1">Aggregated attributes from all team practices.</p>
      </div>
      <div className="space-y-6">
        {ATTRIBUTE_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-bold text-cyan-400 border-b border-gray-700 pb-2 mb-4">
              {group.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.attributeIds.map((attrId) => {
                const attr = attributesById[attrId];
                if (!attr) return null;
                return (
                   <AttributeDisplay key={attr.id} attribute={attr} score={totalScores[attr.id] || 0} />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamProfile;