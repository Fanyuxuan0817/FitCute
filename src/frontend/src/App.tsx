import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './pages/Login';
import TrainingView from './pages/Training';
import DietView from './pages/Diet';
import AnalysisView from './pages/Analysis';
import SettingsView from './pages/Settings';
import HelpView from './pages/Help';
import { AltDashboard } from './components/AltDashboard';
import { RecordModal } from './components/RecordModal';
import { SuggestionModal } from './components/SuggestionModal';
import { WeeklyReportModal } from './components/WeeklyReportModal';
import { EditPlanModal } from './components/EditPlanModal';
import { ViewType, AppState } from './types';

const initialData: AppState = {
  progress: 75,
  stats: {
    weight: 55.5,
    bodyFat: 22,
    muscleMass: 38.2,
    waterIntake: 58,
    targetCalories: 1500,
    consumedCalories: 1080,
  },
  tasks: [
    { id: "1", title: "早起饮用温开水 500ml", subtitle: "待开始", completed: true, time: "07:30" },
    { id: "2", title: "午间 15 分钟冥想", subtitle: "待开始 • 预计耗时 15min", completed: false },
    { id: "3", title: "晚间漫步 3000 步", subtitle: "进行中 • 当前 1244 步", completed: false },
  ],
  meals: [
    { id: "1", name: "晚餐：藜麦鸡胸肉沙拉", calories: 450, description: "富含优质蛋白，帮助夜间代谢。", image: "https://picsum.photos/seed/salad/200/200" },
    { id: "2", name: "加餐：混合浆果 150g", calories: 120, description: "天然抗氧化，脆脆的小满足。", image: "https://picsum.photos/seed/berries/200/200" },
  ],
  mood: "🥰",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [state, setState] = useState<AppState>(initialData);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'login') {
      setIsLoggedIn(false);
      return;
    }
    setActiveView(view);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <AltDashboard
            progress={state.progress}
            stats={state.stats}
            tasks={state.tasks}
            meals={state.meals}
            onOpenRecord={() => setIsRecordOpen(true)}
            onOpenSuggestions={() => setIsSuggestionsOpen(true)}
            onOpenWeekly={() => setIsWeeklyOpen(true)}
            onOpenEditPlan={() => setIsEditPlanOpen(true)}
          />
        );
      case 'training': return <TrainingView />;
      case 'diet': return <DietView />;
      case 'analysis': return <AnalysisView />;
      case 'settings': return <SettingsView />;
      case 'help': return <HelpView />;
      default: return (
        <AltDashboard
          progress={state.progress}
          stats={state.stats}
          tasks={state.tasks}
          meals={state.meals}
          onOpenRecord={() => setIsRecordOpen(true)}
          onOpenSuggestions={() => setIsSuggestionsOpen(true)}
          onOpenWeekly={() => setIsWeeklyOpen(true)}
          onOpenEditPlan={() => setIsEditPlanOpen(true)}
        />
      );
    }
  };

  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard': return '仪表盘';
      case 'training': return '训练计划';
      case 'diet': return '饮食推荐';
      case 'analysis': return '运动分析';
      case 'settings': return '设置';
      case 'help': return '帮助中心';
      default: return 'FitCute!';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9fc]">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />

      <div className="md:ml-64">
        <Header title={getViewTitle()} />

        <main className="pt-28 pb-12 px-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <RecordModal isOpen={isRecordOpen} onClose={() => setIsRecordOpen(false)} />
      <SuggestionModal isOpen={isSuggestionsOpen} onClose={() => setIsSuggestionsOpen(false)} appState={state} />
      <WeeklyReportModal isOpen={isWeeklyOpen} onClose={() => setIsWeeklyOpen(false)} />
      <EditPlanModal isOpen={isEditPlanOpen} onClose={() => setIsEditPlanOpen(false)} tasks={state.tasks} />

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-pink-50 flex justify-around items-center py-4 px-2 z-50">
        <button onClick={() => setActiveView('dashboard')} className={`flex flex-col items-center gap-1 ${activeView === 'dashboard' ? 'text-pink-500' : 'text-gray-400'}`}>
          <div className="w-6 h-6 flex items-center justify-center">🏠</div>
          <span className="text-[10px] font-bold">主页</span>
        </button>
        <button onClick={() => setActiveView('training')} className={`flex flex-col items-center gap-1 ${activeView === 'training' ? 'text-pink-500' : 'text-gray-400'}`}>
          <div className="w-6 h-6 flex items-center justify-center">💪</div>
          <span className="text-[10px] font-bold">训练</span>
        </button>
        <button onClick={() => setActiveView('diet')} className={`flex flex-col items-center gap-1 ${activeView === 'diet' ? 'text-pink-500' : 'text-gray-400'}`}>
          <div className="w-6 h-6 flex items-center justify-center">🥗</div>
          <span className="text-[10px] font-bold">饮食</span>
        </button>
        <button onClick={() => setActiveView('analysis')} className={`flex flex-col items-center gap-1 ${activeView === 'analysis' ? 'text-pink-500' : 'text-gray-400'}`}>
          <div className="w-6 h-6 flex items-center justify-center">📈</div>
          <span className="text-[10px] font-bold">分析</span>
        </button>
      </nav>
    </div>
  );
}