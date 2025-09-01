
import React, { useState, useCallback } from 'react';
import { Plan, View } from './types';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import DrawingView from './components/DrawingView';
import WritingView from './components/WritingView';
import GalleryView from './components/GalleryView';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MainMenu);
  const [plans, setPlans] = useState<Plan[]>([]);

  const addPlan = useCallback((plan: Omit<Plan, 'id' | 'createdAt'>) => {
    const newPlan: Plan = {
      ...plan,
      id: Date.now(),
      createdAt: new Date(),
    };
    setPlans(prevPlans => [newPlan, ...prevPlans]);
    setView(View.Gallery);
  }, []);

  const renderView = () => {
    switch (view) {
      case View.Drawing:
        return <DrawingView onSave={addPlan} onBack={() => setView(View.MainMenu)} />;
      case View.Writing:
        return <WritingView onSave={addPlan} onBack={() => setView(View.MainMenu)} />;
      case View.Gallery:
        return <GalleryView plans={plans} />;
      case View.MainMenu:
      default:
        return <MainMenu setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat bg-center opacity-50" 
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
      </div>
      <div className="relative container mx-auto px-4 py-8">
        <Header setView={setView} />
        <main className="mt-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
