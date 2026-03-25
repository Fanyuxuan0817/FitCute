import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Search, 
  Plus, 
  ChevronRight, 
  Info,
  Dumbbell,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';

const TrainingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plan');
  const [searchQuery, setSearchQuery] = useState('');

  const plan = [
    { 
      id: '1', 
      name: '深蹲 (Squats)', 
      description: '核心收紧，背部挺直，感受臀部发力。膝盖不要超过脚尖。', 
      sets: 4, 
      reps: '15 次', 
      image: 'https://picsum.photos/seed/squat/400/300',
      tag: '动作要点',
      color: 'pink'
    },
    { 
      id: '2', 
      name: '开合跳 (Jumping Jacks)', 
      description: '保持呼吸节奏，跳跃时落地轻盈，用前脚掌着地缓冲。', 
      sets: 3, 
      duration: '60 秒', 
      image: 'https://picsum.photos/seed/jump/400/300',
      tag: '有氧预热',
      color: 'blue'
    },
  ];

  const library = [
    { name: '平板支撑', icon: '🧘', difficulty: 3, category: '腹部' },
    { name: '波比跳', icon: '🏃', difficulty: 5, category: '全身' },
    { name: '哑铃弯举', icon: '💪', difficulty: 2, category: '手臂' },
    { name: '登山者', icon: '⛰️', difficulty: 4, category: '核心' },
    { name: '保加利亚蹲', icon: '🦵', difficulty: 4, category: '腿部' },
  ];

  const categories = ['全部', '腹部', '腿部', '手臂', '背部'];

  return (
    <div className="space-y-8">
      {/* Week Progress */}
      <div className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-gray-800">本周打卡成就</h3>
          </div>
          <span className="text-xs text-pink-400 font-bold">连续运动 12 天啦！加油喵 🐾</span>
        </div>
        <div className="flex justify-between gap-2">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-3">
              <span className="text-[10px] text-gray-400 font-bold">{day}</span>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                i < 4 ? 'bg-emerald-50 text-emerald-500' : i === 4 ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-gray-50 text-gray-200 border-2 border-dashed border-gray-100'
              }`}>
                {i < 4 ? '🐾' : i === 4 ? '12' : ''}
              </div>
              {i === 4 && <span className="text-[8px] font-bold text-pink-500 uppercase">Today</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button 
          onClick={() => setActiveTab('plan')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'plan' ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-white text-gray-400 border border-pink-50'}`}
        >
          今日训练项目
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === 'library' ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-white text-gray-400 border border-pink-50'}`}
        >
          动作仓库
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'plan' ? (
          <motion.div 
            key="plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {plan.map((item) => (
                <div key={item.id} className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-sm flex flex-col md:flex-row gap-8 group">
                  <div className="w-full md:w-64 aspect-[4/3] rounded-3xl overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-pink-500">
                      {item.tag}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                      <button className="p-2 text-gray-300 hover:text-pink-400 transition-colors">
                        <Info size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    <div className="flex gap-4">
                      <div className="px-6 py-3 bg-gray-50 rounded-2xl text-center">
                        <p className="text-[10px] text-gray-400 font-bold">组数</p>
                        <p className="text-lg font-bold text-gray-800">{item.sets} 组</p>
                      </div>
                      <div className="px-6 py-3 bg-gray-50 rounded-2xl text-center">
                        <p className="text-[10px] text-gray-400 font-bold">{item.reps ? '次数' : '时长'}</p>
                        <p className="text-lg font-bold text-gray-800">{item.reps || item.duration}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-2xl flex items-start gap-3">
                      <span className="text-yellow-600">⚠️</span>
                      <p className="text-[10px] text-yellow-700 font-medium leading-relaxed">
                        注意：下蹲时呼气，起身时吸气，保护腰椎安全。
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-6 bg-pink-500 text-white rounded-[32px] font-bold text-xl shadow-xl shadow-pink-200 flex items-center justify-center gap-3 hover:bg-pink-600 active:scale-[0.98] transition-all">
                <Play size={24} fill="currentColor" />
                开始训练
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-sm space-y-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
                    <BarChart3 size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">今日运动记录</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-3">训练时长 (分钟)</label>
                    <input type="number" defaultValue={20} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-lg font-bold" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-3">感觉强度如何？</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['轻松 ☁️', '适中 ⚡', '超累 🔥'].map((level, i) => (
                        <button key={level} className={`py-3 text-[10px] font-bold rounded-xl border transition-all ${i === 1 ? 'bg-pink-50 border-pink-200 text-pink-500' : 'bg-white border-gray-100 text-gray-400'}`}>
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-emerald-50 rounded-3xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-700">预计热量消耗</span>
                      <span className="text-lg font-bold text-emerald-700">145 kcal</span>
                    </div>
                    <div className="h-2 bg-emerald-200/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4" />
                    </div>
                    <p className="text-[8px] text-emerald-600/60 font-medium">基于您的体重与当前训练强度自动估算</p>
                  </div>

                  <button className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all">
                    保存打卡记录 🐾
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="library"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="搜索动作..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-pink-50 rounded-2xl shadow-sm focus:ring-2 focus:ring-pink-100 outline-none"
                />
              </div>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl overflow-x-auto">
                {categories.map((cat) => (
                  <button key={cat} className={`px-6 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${cat === '全部' ? 'bg-white shadow-sm text-pink-500' : 'text-gray-400 hover:bg-white/50'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {library.map((item) => (
                <motion.div 
                  key={item.name}
                  whileHover={{ y: -8 }}
                  className="bg-white p-6 rounded-[32px] border border-pink-50 shadow-sm flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h5 className="font-bold text-gray-800 mb-1">{item.name}</h5>
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className={s <= item.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <button className="w-full py-2 bg-pink-50 text-pink-500 rounded-xl text-[10px] font-bold hover:bg-pink-100 transition-colors">
                    添加到计划
                  </button>
                </motion.div>
              ))}
              <div className="bg-pink-50 border-2 border-dashed border-pink-200 rounded-[32px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-pink-100 transition-all text-pink-400">
                <Plus size={32} />
                <span className="text-xs font-bold">添加自定义动作</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainingView;
