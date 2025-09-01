
import React, { useState, useCallback, useEffect } from 'react';
import { Plan, View } from './types';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import DrawingView from './components/DrawingView';
import WritingView from './components/WritingView';
import GalleryView from './components/GalleryView';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.MainMenu);
  
  const [plans, setPlans] = useState<Plan[]>(() => {
    try {
      const savedPlans = localStorage.getItem('my-heritage-plans');
      if (savedPlans) {
        // 로컬 스토리지에서 불러온 데이터의 날짜 형식을 Date 객체로 변환합니다.
        const parsedPlans = JSON.parse(savedPlans) as (Omit<Plan, 'createdAt'> & { createdAt: string })[];
        return parsedPlans.map(plan => ({
          ...plan,
          createdAt: new Date(plan.createdAt),
        }));
      }
    } catch (error) {
      console.error("localStorage에서 계획을 불러오는 데 실패했습니다.", error);
    }
    return [];
  });

  // plans 상태가 변경될 때마다 localStorage에 자동으로 저장합니다.
  useEffect(() => {
    try {
      localStorage.setItem('my-heritage-plans', JSON.stringify(plans));
    } catch (error) {
      console.error("localStorage에 계획을 저장하는 데 실패했습니다.", error);
    }
  }, [plans]);


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
