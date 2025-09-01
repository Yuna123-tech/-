
import React, { useState } from 'react';
import { Plan } from '../types';
import { generateIdea } from '../services/geminiService';
import { SaveIcon, BackIcon, LightBulbIcon } from './icons';

interface WritingViewProps {
  onSave: (plan: Omit<Plan, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

const WritingView: React.FC<WritingViewProps> = ({ onSave, onBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }
    onSave({ type: 'text', title, content });
  };

  const handleGetIdea = async () => {
    if (!title.trim()) {
      alert('아이디어를 얻으려면 먼저 국가유산 이름을 제목에 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const idea = await generateIdea(title);
      setContent(prevContent => prevContent ? `${prevContent}\n\n[AI 추천 아이디어💡]\n${idea}` : `[AI 추천 아이디어💡]\n${idea}`);
    } catch (e) {
      console.error(e);
      setError('아이디어를 가져오는 데 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-amber-200 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">글로 홍보 계획 세우기</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
            국가유산 이름 (제목)
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 수원 화성"
            className="w-full p-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-semibold text-gray-700 mb-2">
            홍보 계획 내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="어떻게 홍보할지 자세히 적어보세요. (예: 수원 화성 그리기 대회를 열어요!)"
            rows={10}
            className="w-full p-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="text-center">
            <button
            onClick={handleGetIdea}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-full hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                <LightBulbIcon />
                <span className="ml-2">{isLoading ? '생각 중...' : 'AI에게 홍보 아이디어 얻기'}</span>
            </button>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="flex items-center px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-all duration-300">
          <BackIcon />
          <span className="ml-2">뒤로가기</span>
        </button>
        <button onClick={handleSave} className="flex items-center px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md">
          <SaveIcon />
          <span className="ml-2">저장하기</span>
        </button>
      </div>
    </div>
  );
};

export default WritingView;
