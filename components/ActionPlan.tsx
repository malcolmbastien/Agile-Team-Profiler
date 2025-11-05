import React from 'react';
import type { Recommendation } from '../types';
import { ATTRIBUTES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface ActionPlanProps {
  onGenerate: () => void;
  actionPlan: Recommendation[] | null;
  isLoading: boolean;
  error: string | null;
  hasPractices: boolean;
}

const attributesById = Object.fromEntries(ATTRIBUTES.map(attr => [attr.id, attr]));

const ImpactDisplay: React.FC<{ attributeIds: string[] }> = ({ attributeIds }) => {
  if (!attributeIds || attributeIds.length === 0) {
    return <p className="text-sm text-slate-500">No specific attributes highlighted.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {attributeIds.map((attrId) => {
        const attribute = attributesById[attrId];
        if (!attribute) return null;

        return (
          <div key={attrId} className="flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-700 text-slate-300">
            <span>{attribute.name}</span>
          </div>
        );
      })}
    </div>
  );
};


const ActionPlan: React.FC<ActionPlanProps> = ({ onGenerate, actionPlan, isLoading, error, hasPractices }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-100">Next Steps</h3>
      {actionPlan && <h4 className="text-2xl font-bold text-slate-100 mt-1">Give each suggestion a title.</h4>}

      <p className="text-slate-400 mt-1 mb-4">
        Once you've added your practices, let the AI coach suggest an action plan to help your team improve.
      </p>

      {!actionPlan && (
        <div className="bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 p-6 text-center">
          <button
            onClick={onGenerate}
            disabled={isLoading || !hasPractices}
            className="w-full max-w-xs mx-auto flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-emerald-900/50"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Generating Plan...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Suggest Action Plan
              </>
            )}
          </button>
         {!hasPractices && (
          <p className="text-xs text-slate-500 mt-2">Add at least one practice to enable.</p>
        )}
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-4 text-center bg-rose-900/30 border border-rose-700/50 text-rose-300 p-3 rounded-lg text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {actionPlan && (
        <div className="mt-4 border border-sky-500/50 rounded-xl p-4">
          <div className="space-y-4 text-left">
            {actionPlan.map((rec, index) => (
              <div key={index} className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-slate-100 mb-2">{rec.title}</h4>
                <p className="text-slate-200 text-sm mb-3">{rec.description}</p>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">IMPACTED ATTRIBUTES</h5>
                <ImpactDisplay attributeIds={rec.impacted_attributes} />
              </div>
            ))}
           <div className="text-center pt-2">
            <button
                onClick={onGenerate}
                disabled={isLoading}
                className="text-sm font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
            >
                {isLoading ? (
                <>
                    <LoadingSpinner className="w-4 h-4 mr-2 inline-block" />
                    Regenerating...
                </>
                ) : (
                'Suggest a different plan'
                )}
            </button>
           </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ActionPlan;