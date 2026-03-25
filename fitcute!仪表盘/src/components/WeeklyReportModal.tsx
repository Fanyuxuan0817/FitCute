import React from "react";
import { Modal } from "./Modal";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Flame, Zap, TrendingDown, Award, Droplets, Utensils, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const data = [
  { day: "周一", steps: 8000, calories: 400 },
  { day: "周二", steps: 12000, calories: 600 },
  { day: "周三", steps: 6000, calories: 300 },
  { day: "周四", steps: 15000, calories: 750 },
  { day: "周五", steps: 9000, calories: 450 },
  { day: "周六", steps: 18000, calories: 900 },
  { day: "周日", steps: 5000, calories: 250 },
];

export function WeeklyReportModal({ isOpen, onClose }: WeeklyReportModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="我的健康周报" className="max-w-4xl">
      <div className="space-y-8 py-4">
        <div className="flex items-center gap-2 -mt-4 mb-6">
          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 已保存至档案
          </span>
        </div>

        {/* Weekly Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 bg-blue-50 p-6 rounded-3xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-brand text-blue-600">本周消耗热量</span>
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold font-brand text-blue-800">12,450</span>
              <span className="text-sm ml-1 text-blue-600">kcal</span>
            </div>
            <p className="text-[10px] mt-2 text-blue-600/70">击败了全国 85% 的“懒猫”</p>
          </div>
          <div className="bg-green-50 p-6 rounded-3xl">
            <div className="flex justify-between items-start">
              <span className="font-brand text-green-600">平均运动</span>
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold font-brand text-green-800">45</span>
              <span className="text-xs ml-1 text-green-600">min</span>
            </div>
          </div>
          <div className="bg-pink-50 p-6 rounded-3xl">
            <div className="flex justify-between items-start">
              <span className="font-brand text-pink-600">体重下降</span>
              <TrendingDown className="w-6 h-6 text-pink-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold font-brand text-pink-800">-0.8</span>
              <span className="text-xs ml-1 text-pink-600">kg</span>
            </div>
          </div>
        </div>

        {/* Trends & Body Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-50/50 p-6 rounded-3xl border border-pink-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-brand text-lg text-slate-700">步数与热量趋势</h3>
              <div className="flex gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400"></span>步数</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-300"></span>热量</span>
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="steps" fill="#f472b6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="calories" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-50/50 p-6 rounded-3xl border border-pink-50 flex flex-col justify-center gap-4">
            <h3 className="font-brand text-lg text-slate-700">体成分动态</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">体重</span><span className="text-green-500">-1.5%</span></div>
                <p className="font-brand text-xl text-pink-500">52.4 kg</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden"><div className="bg-pink-300 h-full w-[65%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1"><span className="text-slate-500">体脂率</span><span className="text-green-500">-0.4%</span></div>
                <p className="font-brand text-xl text-blue-400">22.1 %</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden"><div className="bg-blue-300 h-full w-[45%]"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h3 className="font-brand text-lg text-slate-700 mb-4">本周荣誉勋章</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "🏅", label: "连续 7 天", color: "bg-orange-50 border-orange-100 text-orange-600" },
              { icon: "🏃‍♀️", label: "运动达人", color: "bg-blue-50 border-blue-100 text-blue-600" },
              { icon: "🥗", label: "健康食客", color: "bg-green-50 border-green-100 text-green-600" },
              { icon: "💧", label: "补水标兵", color: "bg-pink-50 border-pink-100 text-pink-600" },
            ].map((badge) => (
              <div key={badge.label} className={cn("border border-dashed p-4 rounded-3xl flex flex-col items-center text-center", badge.color)}>
                <span className="text-3xl mb-1">{badge.icon}</span>
                <span className="text-[10px] font-bold">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cat Expert Advice */}
        <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100 flex items-center gap-6">
          <div className="w-24 h-24 flex-shrink-0 animate-breathing">
            <img
              src="https://picsum.photos/seed/catcoach/200/200"
              alt="Cat Coach"
              className="w-full h-full rounded-full border-4 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-brand text-pink-500 mb-2 flex items-center gap-1">小猫专家建议 🐾</h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              “喵~ 这一周你表现得超级棒！虽然周三稍微偷了一点点懒，但总体的运动量已经超过了预期哦。记得多喝水，别变成干巴巴的小鱼干！”
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button onClick={onClose} className="px-12 py-3 bg-pink-400 text-white rounded-full font-brand text-lg hover:bg-pink-500 transition-all shadow-lg shadow-pink-100">
            我知道了
          </button>
        </div>
      </div>
    </Modal>
  );
}
