"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

interface Category {
  design: number;
  content: number;
  features: number;
  mobile: number;
}

interface Results {
  year: number;
  score: number;
  categories: Category;
  recommendations: string[];
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const getScoreColor = (score: unknown): string => {
    const numericScore = Number(score);
    if (numericScore >= 80) return 'from-green-400 to-emerald-500';
    if (numericScore >= 60) return 'from-blue-400 to-cyan-500';
    return 'from-orange-400 to-red-500';
  };

  const getAIAdvice = (categories: Category) => {
    const scores = Object.values(categories).map(Number);
    const lowestScore = Math.min(...scores);
    const lowestCategory = Object.entries(categories).find(([_, score]) => Number(score) === lowestScore)?.[0];
    
    const advice = {
      design: "디자인 개선이 가장 시급해요. 최신 트렌드를 참고해보세요! 🎨",
      content: "콘텐츠를 더 매력적으로 만들어보세요. 스토리텔링이 중요해요! 📝",
      features: "편의 기능을 보강해보세요. 고객 경험이 더 좋아질 거예요! ⚡️",
      mobile: "모바일 최적화가 필요해요. 요즘은 모바일이 정말 중요하답니다! 📱"
    } as const;
    
    return advice[lowestCategory as keyof typeof advice] || advice.design;
  };

  const loadingMessages = [
    "트렌드를 분석하고 있어요 ✨",
    "힙한 요소를 찾고 있어요 🔍",
    "디자인 점수를 계산중이에요 🎨",
    "멋진 추천사항을 준비중이에요 💫"
  ];

  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  const analyzeWebsite = async () => {
    setLoading(true);
    
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);
    
    const randomYear = Math.floor(Math.random() * (2023 - 2016 + 1)) + 2016;
    const getRandomScore = () => Math.floor(Math.random() * (95 - 30 + 1)) + 30;

    const allRecommendations = [
      "스크롤 애니메이션 기능을 추가해보세요!",
      "최신 UI 트렌드인 뉴모피즘을 적용해보세요!",
      "인스타그램 쇼핑 기능 연동을 추천드려요!",
      "모바일 최적화가 필요해 보여요!",
      "AI 챗봇 도입을 고려해보세요!",
      "다크모드 지원을 추가해보세요!",
      "상품 AR 미리보기 기능은 어떨까요?",
      "실시간 재고 현황 표시를 추가해보세요!",
      "개인화된 상품 추천 시스템을 도입해보세요!",
      "라이브 커머스 기능 도입을 고려해보세요!",
      "최신 트렌드인 미니멀한 디자인으로 개선해보세요!",
      "상품 이미지를 더 크게 보여주는 레이아웃을 추천드려요!",
      "모던한 타이포그래피로 업데이트가 필요해보여요!",
      "브랜드 컬러를 더 과감하게 사용해보세요!",
      "여백을 더 활용한 깔끔한 디자인을 추천드려요!",
      "상품 카드 디자인을 현대적으로 개선해보세요!",
      "메인 비주얼의 임팩트를 더 강화해보세요!",
      "감각적인 마이크로 인터랙션을 추가해보세요!",
      "글래스모피즘 디자인 요소를 적용해보세요!",
      "그리드 시스템을 더 체계적으로 정리해보세요!"
    ];

    const shuffled = allRecommendations.sort(() => 0.5 - Math.random());
    const selectedRecommendations = shuffled.slice(0, Math.random() < 0.5 ? 3 : 4);

    setTimeout(() => {
      clearInterval(messageInterval);
      setResults({
        year: randomYear,
        score: getRandomScore(),
        categories: {
          design: getRandomScore(),
          content: getRandomScore(),
          features: getRandomScore(),
          mobile: getRandomScore()
        },
        recommendations: selectedRecommendations
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none blur-3xl"></div>

      <div className="max-w-4xl mx-auto pt-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
              내 쇼핑몰, 힙한가요?
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            쇼핑몰 URL을 입력하면 트렌드 점수를 알려드려요 ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && url && !loading) {
                  analyzeWebsite();
                }
              }}
              placeholder="분석할 쇼핑몰 URL을 입력하세요"
              className="w-full px-6 py-4 bg-gray-900 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-32"
            />
            <button
              onClick={analyzeWebsite}
              disabled={loading || !url}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
              ) : (
                <>
                  <FiTrendingUp />
                  분석하기
                </>
              )}
            </button>
          </div>
          
          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-center mt-4"
            >
              {loadingMessage}
            </motion.p>
          )}
        </motion.div>
        {!loading && !results && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    {/* 사용 방법 섹션 */}
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 shadow-xl border border-gray-800">
    <h3 className="text-xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
  ✨ 이렇게 사용해보세요
</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all"
        >
          <div className="text-lg mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
            1
          </div>
          <h4 className="font-medium mb-2 text-blue-400">URL 입력</h4>
          <p className="text-gray-400">분석하고 싶은 쇼핑몰의 주소를 입력해주세요.</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
        >
          <div className="text-lg mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
            2
          </div>
          <h4 className="font-medium mb-2 text-purple-400">AI 분석</h4>
          <p className="text-gray-400">AI가 쇼핑몰의 트렌드 점수를 분석해드려요.</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all"
        >
          <div className="text-lg mb-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
            3
          </div>
          <h4 className="font-medium mb-2 text-cyan-400">맞춤 추천</h4>
          <p className="text-gray-400">트렌드에 맞는 개선 방향을 추천받으세요.</p>
        </motion.div>
      </div>
    </div>

    {/* 트렌드 섹션 */}
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-gray-800">
      <h3 className="text-xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        🔥 2025 쇼핑몰 트렌드
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
        >
          <h4 className="font-medium mb-4 text-purple-400 flex items-center gap-2">
            <span>💫</span>
            2025 트렌드 키워드
          </h4>
          <ul className="space-y-3">
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
              미니멀한 UI/UX 디자인
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
              AI 기반 개인화 추천
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
              라이브 커머스 활성화
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
              모바일 최적화 강화
            </motion.li>
          </ul>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all"
        >
          <h4 className="font-medium mb-4 text-pink-400 flex items-center gap-2">
            <span>⚡️</span>
            필수 도입 기능
          </h4>
          <ul className="space-y-3">
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
              AR 가상 피팅/배치
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
              AI 챗봇 고객 상담
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
              간편 결제 시스템
            </motion.li>
            <motion.li className="flex items-center gap-2 text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
              실시간 재고 관리
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  </motion.div>
)}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="bg-gray-900 rounded-2xl p-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                {results.year}년 감성
              </div>
              <p className="text-gray-400 text-lg">
                {new Date().getFullYear() - results.year === 0 
                  ? "🎉 축하드려요! 현재 트렌드와 완벽하게 일치해요 ✨"
                  : new Date().getFullYear() - results.year <= 2 
                  ? `⭐️ 트렌드와 ${new Date().getFullYear() - results.year}년 차이로 꽤 힙한 감성이에요!`
                  : new Date().getFullYear() - results.year <= 4 
                  ? `💫 트렌드와 ${new Date().getFullYear() - results.year}년의 갭이 있어요. 조금만 더 업데이트해볼까요?`
                  : `✨ 트렌드와 ${new Date().getFullYear() - results.year}년의 차이가 있네요! 새로운 변화를 시작해보세요`}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {Object.entries(results.categories).map(([key, value]: [string, any], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium capitalize">{key}</h3>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(value)} text-transparent bg-clip-text`}>
                      {value}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className={`h-full bg-gradient-to-r ${getScoreColor(value)} rounded-full transition-all duration-1000`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold mb-4">🤖 AI 맞춤 조언</h3>
              <p className="text-gray-300">
                {getAIAdvice(results.categories)}
              </p>
            </motion.div>

            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">💡 트렌드 업데이트 추천</h3>
              <ul className="space-y-3">
                {results.recommendations.map((rec: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <span className="text-blue-400">•</span>
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-gray-400 text-lg text-center mb-6">더 멋진 쇼핑몰을 만들어보세요 ✨</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://store.cafe24.com/kr/apps"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="group relative px-6 py-3 rounded-lg text-center overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                    <span className="text-xl">🚀</span>
                    <span>쇼핑몰 필수 앱 둘러보기</span>
                  </div>
                </a>
                <a
                  href="https://d.cafe24.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 rounded-lg text-center overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                    <span className="text-xl">💫</span>
                    <span>트렌디한 디자인 찾아보기</span>
                  </div>
                </a>
                <a
                  href="https://experts.cafe24.com/client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 rounded-lg text-center overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                    <span className="text-xl">👨‍💻</span>
                    <span>전문가와 함께 시작하기</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
