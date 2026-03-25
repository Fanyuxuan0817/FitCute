import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { RecordModal } from "./components/RecordModal";
import { SuggestionModal } from "./components/SuggestionModal";
import { WeeklyReportModal } from "./components/WeeklyReportModal";
import { EditPlanModal } from "./components/EditPlanModal";
import { Bell, Search, Menu, Plus } from "lucide-react";
import { AppState } from "./types";

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
  const [state, setState] = useState<AppState>(initialData);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFBFF]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 glass-header w-full flex justify-between items-center px-6 py-4 transition-all duration-300">
          <div className="md:hidden flex items-center gap-2 text-2xl font-bold text-pink-400 font-brand">
            <span className="font-brand">FitCute!</span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-on-surface-variant font-medium text-sm font-brand">早安，开启元气满满的一天</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-50 transition-colors">
              <Bell className="w-5 h-5 text-on-surface-variant" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-pink-50 bg-white">
              <img
                src="https://picsum.photos/seed/avatar/100/100"
                alt="User"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <Dashboard 
          progress={state.progress}
          stats={state.stats}
          tasks={state.tasks}
          meals={state.meals}
          onOpenRecord={() => setIsRecordOpen(true)}
          onOpenSuggestions={() => setIsSuggestionsOpen(true)}
          onOpenWeekly={() => setIsWeeklyOpen(true)}
          onOpenEditPlan={() => setIsEditPlanOpen(true)}
        />

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-header flex justify-around items-center px-4 py-3 z-50">
          <button className="flex flex-col items-center gap-1 text-pink-400">
            <Menu className="w-6 h-6" />
            <span className="text-[10px] font-bold">首页</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium">发现</span>
          </button>
          <button 
            onClick={() => setIsRecordOpen(true)}
            className="bg-pink-100 text-pink-400 w-14 h-14 rounded-full flex items-center justify-center shadow-lg -mt-8 border-4 border-white active:scale-95 transition-transform"
          >
            <Plus className="w-8 h-8" />
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-medium">消息</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </nav>

        {/* Modals */}
        <RecordModal isOpen={isRecordOpen} onClose={() => setIsRecordOpen(false)} />
        <SuggestionModal isOpen={isSuggestionsOpen} onClose={() => setIsSuggestionsOpen(false)} appState={state} />
        <WeeklyReportModal isOpen={isWeeklyOpen} onClose={() => setIsWeeklyOpen(false)} />
        <EditPlanModal isOpen={isEditPlanOpen} onClose={() => setIsEditPlanOpen(false)} tasks={state.tasks} />
      </main>
    </div>
  );
}
