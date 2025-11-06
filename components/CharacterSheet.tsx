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
    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg p-6 lg:p-8 h-full sticky top-8">
      <div className="border-b-2 border-sky-500/40 pb-4 mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-wide">Agile Team Profile</h2>
        <p className="text-slate-600 mt-1 text-base">Aggregated attributes from all team practices.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        {ATTRIBUTE_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="border-b border-slate-200 pb-2 mb-4">
              <h3 className="text-xl font-bold text-cyan-600">
                {group.title}
              </h3>
              {group.description && (
                <p className="text-sm text-slate-500 mt-1">{group.description}</p>
              )}
            </div>
            <div className="space-y-4">
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