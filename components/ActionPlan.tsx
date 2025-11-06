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
          <div key={attrId} className="flex items-center px-2.5 py-1 text-sm font-medium rounded-full bg-slate-200 text-slate-700">
            <span>{attribute.name}</span>
          </div>
        );
      })}
    </div>
  );
};


const ActionPlan: React.FC<ActionPlanProps> = ({ onGenerate, actionPlan, isLoading, error, hasPractices }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-slate-900">Next Steps</h3>

      <p className="text-slate-500 mt-1 mb-4 text-base">
        Once you've added your practices, let the AI coach suggest an action plan to help your team improve.
      </p>

      {!actionPlan && (
        <div className="bg-white rounded-lg border-2 border-dashed border-slate-200 p-6 text-center">
          <button
            onClick={onGenerate}
            disabled={isLoading || !hasPractices}
            className="w-full max-w-xs mx-auto flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-lg shadow-emerald-600/40"
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
          <p className="text-sm text-slate-500 mt-3">Add at least one practice to enable.</p>
        )}
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-4 text-center bg-rose-100 border border-rose-300 text-rose-700 p-3 rounded-lg text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {actionPlan && (
        <div className="mt-4 border-2 border-sky-400 rounded-xl p-4 bg-sky-50/50">
          <h4 className="text-2xl font-bold text-slate-800 mb-4">AI-Generated Action Plan</h4>
          <div className="space-y-4 text-left">
            {actionPlan.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-800 text-lg mb-1">{rec.title}</h4>
                <p className="text-slate-600 text-base mb-3">{rec.description}</p>
                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Impacted Attributes</h5>
                <ImpactDisplay attributeIds={rec.impacted_attributes} />
              </div>
            ))}
           <div className="text-center pt-2">
            <button
                onClick={onGenerate}
                disabled={isLoading}
                className="text-sm font-medium text-emerald-500 hover:text-emerald-600 disabled:opacity-50"
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