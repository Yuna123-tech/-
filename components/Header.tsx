
import React from 'react';
import { View } from '../types';
import { HomeIcon, CollectionIcon } from './icons';

interface HeaderProps {
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-amber-200">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
          ✨ 나의 국가유산 홍보대사 프로젝트 ✨
        </h1>
        <p className="text-sm text-emerald-600 mt-1">
          우리의 소중한 국가유산을 멋지게 알려봐요!
        </p>
      </div>
      <nav className="mt-4 sm:mt-0">
        <button
          onClick={() => setView(View.MainMenu)}
          className="mr-2 inline-flex items-center px-4 py-2 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <HomeIcon />
          <span className="ml-2">처음으로</span>
        </button>
        <button
          onClick={() => setView(View.Gallery)}
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <CollectionIcon />
          <span className="ml-2">우리들의 계획 보기</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
