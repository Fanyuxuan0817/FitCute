import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Flame, Zap, TrendingDown, CheckCircle2, Circle, ChevronRight, Utensils, Scale, Percent, Dumbbell, Droplets, Plus, Edit3 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Task, Meal, UserStats } from "@/src/types";

interface DashboardProps {
  progress: number;
  stats: UserStats;
  tasks: Task[];
  meals: Meal[];
  onOpenRecord: () => void;
  onOpenSuggestions: () => void;
  onOpenWeekly: () => void;
  onOpenEditPlan: () => void;
}

export function Dashboard({ progress, stats, tasks, meals, onOpenRecord, onOpenSuggestions, onOpenWeekly, onOpenEditPlan }: DashboardProps) {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Hero Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 cute-card p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-pink-50"
                cx="96"
                cy="96"
                fill="transparent"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-pink-200"
                cx="96"
                cy="96"
                fill="transparent"
                r="80"
                stroke="currentColor"
                strokeDasharray="502.65"
                strokeDashoffset={502.65 * (1 - progress / 100)}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-pink-300">{progress}%</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">已完成</span>
            </div>
          </div>
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-3xl font-bold text-gray-700 tracking-tight leading-tight font-brand">离目标更近一步啦喵~</h3>
            <p className="text-on-surface-variant max-w-md">你今天的努力就像一颗正在绽放的小花，保持这个节奏，终点就在不远处等待着你。</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <button onClick={onOpenWeekly} className="px-4 py-1.5 bg-pink-50 text-pink-400 rounded-full text-xs font-semibold hover:bg-pink-100 transition-colors">健康周报</button>
              <button className="px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors">喵友社区</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-pink-100 text-pink-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_20px_rgba(251,207,232,0.2)] border border-pink-200">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-all duration-500"></div>
          <div className="relative z-10">
            <Zap className="w-10 h-10 text-pink-400 fill-pink-400" />
            <h4 className="text-xl font-bold mt-4 font-brand">能量满满的一天</h4>
            <p className="text-pink-700/80 text-sm mt-2 font-medium">目前的代谢水平处于黄金阶段，非常适合进行舒缓的瑜伽运动。</p>
          </div>
          <button 
            onClick={onOpenSuggestions}
            className="relative z-10 mt-6 bg-white text-pink-400 px-6 py-3 rounded-full font-bold text-sm w-fit transition-transform active:scale-95 duration-200 shadow-sm hover:bg-pink-50"
          >
            查看建议
          </button>
        </div>
      </div>

      {/* Body Data Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={Scale} label="体重" value={stats.weight} unit="kg" trend="-0.2kg" color="pink" />
        <StatCard icon={Percent} label="体脂率" value={stats.bodyFat} unit="%" subtitle="理想范围 (18-24%)" color="blue" />
        <StatCard icon={Dumbbell} label="肌肉量" value={stats.muscleMass} unit="kg" subtitle="状态：优秀" color="yellow" />
        <StatCard icon={Droplets} label="水分" value={stats.waterIntake} unit="%" subtitle="充足，请保持饮水" color="purple" />
      </div>

      {/* Plans & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="cute-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-700 font-brand">今日计划 (Today's Plan)</h4>
            <button onClick={onOpenEditPlan} className="text-pink-300 text-xs font-bold hover:underline">编辑计划</button>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-center p-4 bg-white rounded-2xl border-2 border-dashed transition-colors cursor-pointer",
                  task.completed ? "border-pink-100 opacity-70" : "border-pink-50 hover:border-pink-200"
                )}
              >
                <div className="flex-1">
                  <span className={cn("block text-sm font-bold text-gray-700", task.completed && "line-through")}>
                    {task.title}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {task.completed ? `已于 ${task.time} 完成` : task.subtitle}
                  </span>
                </div>
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-pink-300 fill-pink-300 text-white" />
                ) : (
                  <Circle className="w-6 h-6 text-pink-100" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-3xl p-8 shadow-[0_8px_20px_rgba(209,250,229,0.2)] border border-green-100 flex flex-col h-full">
          <h4 className="text-xl font-bold text-gray-700 mb-6 font-brand">饮食建议 (Dietary Recommendations)</h4>
          <div className="bg-white rounded-2xl p-6 mb-6 flex items-center justify-between border border-green-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">今日摄入目标</p>
                <p className="text-2xl font-black text-gray-700">{stats.targetCalories} <span className="text-sm font-medium">kcal</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-on-surface-variant">剩余</p>
              <p className="text-lg font-bold text-green-600">{stats.targetCalories - stats.consumedCalories} kcal</p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="flex gap-4 items-center p-2 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden shrink-0 border border-green-100">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">{meal.name}</p>
                  <p className="text-xs text-gray-500 mt-1 italic">{meal.description}</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-400 hover:text-green-600 shadow-sm">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-4 mb-12 text-center px-6">
        <div className="inline-block bg-yellow-50 px-8 py-3 rounded-full text-yellow-700 text-sm font-brand shadow-sm border border-yellow-100">
          “每一个汗水滴落的瞬间，都是在和更好的自己相遇哦！加油喵~ 🐾”
        </div>
      </footer>

      {/* Floating Action Button */}
      <button 
        onClick={onOpenRecord}
        className="hidden md:flex fixed bottom-8 right-8 bg-pink-100 text-pink-700 px-8 py-4 rounded-full shadow-lg items-center gap-3 hover:scale-105 hover:bg-pink-200 active:scale-95 transition-all z-50 font-bold font-brand border border-pink-200"
      >
        <Edit3 className="w-5 h-5" />
        记录今日
      </button>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, trend, subtitle, color }: any) {
  const colors: any = {
    pink: "bg-pink-50/80 border-pink-100 text-pink-400",
    blue: "bg-blue-50 border-blue-100 text-blue-400",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-500",
    purple: "bg-purple-50 border-purple-100 text-purple-300",
  };

  return (
    <div className={cn("rounded-3xl p-6 flex flex-col justify-between min-h-[160px] shadow-sm border hover:translate-y-[-4px] transition-transform duration-300", colors[color])}>
      <div className="flex justify-between items-start">
        <Icon className="w-6 h-6" />
        <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
      </div>
      <div>
        <div className="text-3xl font-black text-gray-700">{value}<span className="text-sm font-medium ml-1">{unit}</span></div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] text-green-500 mt-1 font-medium">
            <TrendingDown className="w-3 h-3" />
            较昨日 {trend}
          </div>
        )}
        {subtitle && (
          <div className="flex items-center gap-1 text-[10px] mt-1 font-medium opacity-80">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
