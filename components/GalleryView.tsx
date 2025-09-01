
import React from 'react';
import { Plan } from '../types';

interface GalleryViewProps {
  plans: Plan[];
}

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-amber-100">
        <h3 className="font-bold text-lg text-amber-900 truncate">{plan.title}</h3>
        <p className="text-xs text-gray-500">{plan.createdAt.toLocaleString('ko-KR')}</p>
      </div>
      {plan.type === 'drawing' ? (
        <div className="p-4 bg-gray-50 flex-grow">
          <img src={plan.content} alt={plan.title} className="w-full h-auto object-contain rounded-md border border-gray-200" />
        </div>
      ) : (
        <div className="p-4 flex-grow">
          <p className="text-gray-700 whitespace-pre-wrap">{plan.content}</p>
        </div>
      )}
    </div>
  );
};

const GalleryView: React.FC<GalleryViewProps> = ({ plans }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">✨ 우리들의 멋진 홍보 계획 ✨</h2>
      {plans.length === 0 ? (
        <div className="text-center bg-white/80 p-12 rounded-2xl shadow-md border border-amber-200">
          <p className="text-xl text-gray-600">아직 등록된 계획이 없어요.</p>
          <p className="mt-2 text-gray-500">첫 번째 홍보 계획을 만들어보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryView;
