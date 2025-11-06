import React, { useState, useMemo } from 'react';
import { analyzePractice, generateActionPlan, generatePracticeIdea } from './services/geminiService';
import type { Practice, Scores, Recommendation } from './types';
import { ATTRIBUTES } from './constants';
import PracticeInput from './components/PracticeInput';
import PracticeList from './components/PracticeList';
import TeamProfile from './components/CharacterSheet';
import PracticeDetailModal from './components/PracticeDetailModal';
import ActionPlan from './components/ActionPlan';

function App() {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [practiceDescription, setPracticeDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState<boolean>(false);

  // New state for Action Plan
  const [actionPlan, setActionPlan] = useState<Recommendation[] | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [actionPlanError, setActionPlanError] = useState<string | null>(null);

  const handleAddPractice = async (description: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { scores, category, summary } = await analyzePractice(description);
      const newPractice: Practice = {
        id: new Date().toISOString() + Math.random(), // Add random number for better key uniqueness
        description,
        scores,
        category,
        summary,
      };
      setPractices(prev => [newPractice, ...prev]);
      setPracticeDescription(''); // Clear input on success
      setActionPlan(null);
      setActionPlanError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePractice = async (id: string, newDescription: string) => {
    setIsUpdating(true);
    setError(null);
    try {
      const { scores, category, summary } = await analyzePractice(newDescription);
      const updatedPractice: Practice = {
        id,
        description: newDescription,
        scores,
        category,
        summary,
      };

      setPractices(prev =>
        prev.map(p => (p.id === id ? updatedPractice : p))
      );
      setSelectedPractice(updatedPractice); // Keep modal open with new data
      setActionPlan(null);
      setActionPlanError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while updating the practice.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemovePractice = (id: string) => {
    setPractices(prev => prev.filter(p => p.id !== id));
    setActionPlan(null);
    setActionPlanError(null);
  };

  const handleSelectPractice = (practice: Practice) => {
    setSelectedPractice(practice);
  };

  const handleCloseModal = () => {
    setSelectedPractice(null);
  };

  const totalScores = useMemo<Scores>(() => {
    const totals: Scores = ATTRIBUTES.reduce((acc, attr) => {
      acc[attr.id] = 0;
      return acc;
    }, {} as Scores);

    practices.forEach(practice => {
      for (const key in practice.scores) {
        if (Object.prototype.hasOwnProperty.call(totals, key)) {
          totals[key] += practice.scores[key];
        }
      }
    });

    return totals;
  }, [practices]);

  const handleGenerateActionPlan = async () => {
    if (practices.length === 0) return;
    setIsGeneratingPlan(true);
    setActionPlanError(null);
    setActionPlan(null); // Clear previous plan
    try {
      const plan = await generateActionPlan(practices, totalScores);
      setActionPlan(plan);
    } catch (err) {
      if (err instanceof Error) {
        setActionPlanError(err.message);
      } else {
        setActionPlanError('An unknown error occurred while generating the action plan.');
      }
    } finally {
      setIsGeneratingPlan(false);
    }
  };
  
  const handleGenerateIdea = async () => {
    setIsGeneratingIdea(true);
    setError(null);
    try {
      const idea = await generatePracticeIdea();
      setPracticeDescription(idea);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating an idea.');
      }
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8 lg:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
          Agile Team Profiler
        </h1>
        <p className="mt-2 text-lg text-slate-600 max-w-5xl mx-auto">
          Translate your team's ways of working into a profile highlighting its strengths and trade-offs.
        </p>
      </header>

      {error && (
        <div className="bg-rose-100 border border-rose-400 text-rose-700 p-4 rounded-lg mb-6 max-w-4xl mx-auto text-center">
          <strong>Error:</strong> {error}
        </div>
      )}

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-8">
          <PracticeInput
            description={practiceDescription}
            onDescriptionChange={setPracticeDescription}
            onAddPractice={handleAddPractice}
            isLoading={isLoading}
            onGenerateIdea={handleGenerateIdea}
            isGeneratingIdea={isGeneratingIdea}
          />
          <PracticeList
            practices={practices}
            onRemovePractice={handleRemovePractice}
            onSelectPractice={handleSelectPractice}
          />
          <ActionPlan
            onGenerate={handleGenerateActionPlan}
            actionPlan={actionPlan}
            isLoading={isGeneratingPlan}
            error={actionPlanError}
            hasPractices={practices.length > 0}
          />
        </div>

        <div className="mt-8 lg:mt-0">
          <TeamProfile totalScores={totalScores} />
        </div>
      </main>

      {selectedPractice && (
        <PracticeDetailModal
          practice={selectedPractice}
          onClose={handleCloseModal}
          onUpdatePractice={handleUpdatePractice}
          isUpdating={isUpdating}
        />
      )}

      <footer className="text-center mt-12 py-4 text-slate-500 text-sm border-t border-slate-200">
        <p>Powered by Google Gemini. Built for visualizing agile trade-offs.</p>
      </footer>
    </div>
  );
}

export default App;