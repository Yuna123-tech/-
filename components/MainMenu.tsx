
import React from 'react';
import { View } from '../types';
import { PencilIcon, DocumentTextIcon } from './icons';

interface MainMenuProps {
  setView: (view: View) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ setView }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-emerald-700 mb-4">어떻게 홍보 계획을 세워볼까요?</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        여러분이 조사한 국가유산을 사람들에게 알릴 수 있는 멋진 방법을 생각해보세요.
        그림으로 자유롭게 표현하거나, 글로 꼼꼼하게 계획을 세울 수 있어요.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          onClick={() => setView(View.Drawing)}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-amber-200 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-20 h-20 mx-auto bg-sky-100 rounded-full flex items-center justify-center mb-4">
            <PencilIcon />
          </div>
          <h3 className="text-2xl font-bold text-sky-800 mb-2">그림으로 만들기</h3>
          <p className="text-gray-600">
            상상력을 발휘하여 홍보 포스터나 안내도를 자유롭게 그려보세요!
          </p>
        </div>
        <div
          onClick={() => setView(View.Writing)}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-amber-200 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <DocumentTextIcon />
          </div>
          <h3 className="text-2xl font-bold text-emerald-800 mb-2">글로 만들기</h3>
          <p className="text-gray-600">
            누가, 언제, 어디서, 무엇을, 어떻게 홍보할지 계획을 글로 작성해보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
