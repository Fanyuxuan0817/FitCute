import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingDown, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  ChevronRight,
  Plus,
  Utensils
} from 'lucide-react';

const DashboardView: React.FC = () => {
  const stats = [
    { label: '体重', value: '55.5', unit: 'kg', trend: '-0.2kg', color: 'pink' },
    { label: '体脂率', value: '22', unit: '%', trend: '理想范围', color: 'blue' },
    { label: '肌肉量', value: '38.2', unit: 'kg', trend: '状态：优秀', color: 'yellow' },
    { label: '水分', value: '58', unit: '%', trend: '充足，请保持', color: 'indigo' },
  ];

  const todayPlan = [
    { title: '早起饮用温开水 500ml', time: '已于 07:30 完成', completed: true },
    { title: '午间 15 分钟冥想', time: '待开始 • 预计耗时 15min', completed: false },
    { title: '晚间漫步 3000 步', time: '进行中 • 当前 1244 步', completed: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 border border-pink-50 shadow-sm"
        >
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-pink-50" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={502.4} strokeDashoffset={502.4 * 0.25} className="text-pink-400" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-pink-500">75%</span>
              <span className="text-xs text-gray-400">已完成</span>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-brand text-gray-800">离目标更近一步啦喵~</h2>
            <p className="text-gray-500 leading-relaxed">
              你今天的努力就像一颗正在绽放的小花，保持这个节奏，终点就在不远处等待着你。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="px-6 py-2 bg-pink-50 text-pink-500 rounded-full text-sm font-bold hover:bg-pink-100 transition-colors">健康周报</button>
              <button className="px-6 py-2 bg-blue-50 text-blue-500 rounded-full text-sm font-bold hover:bg-blue-100 transition-colors">喵友社区</button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-pink-100 rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center mb-6">
              <Flame className="text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-pink-600 mb-2">能量满满的一天</h3>
            <p className="text-pink-500/80 text-sm leading-relaxed">
              目前的代谢水平处于黄金阶段，非常适合进行舒缓的瑜伽运动。
            </p>
          </div>
          <button className="relative z-10 w-full py-3 bg-white text-pink-500 rounded-2xl font-bold hover:shadow-lg transition-all mt-6">
            查看建议
          </button>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-200/50 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[24px] border border-pink-50 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-${stat.color}-50 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                {stat.label === '体重' && <TrendingDown size={20} />}
                {stat.label === '体脂率' && <span className="font-bold text-sm">%</span>}
                {stat.label === '肌肉量' && <Flame size={20} />}
                {stat.label === '水分' && <Droplets size={20} />}
              </div>
              <span className="text-xs font-bold text-gray-400">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.unit}</span>
            </div>
            <p className={`text-[10px] mt-2 font-medium ${stat.label === '体重' ? 'text-emerald-500' : 'text-gray-400'}`}>
              {stat.trend}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Plan and Dietary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              今日计划 <span className="text-gray-400 font-normal text-sm">(Today's Plan)</span>
            </h3>
            <button className="text-sm text-pink-500 font-medium hover:underline">编辑计划</button>
          </div>
          <div className="space-y-4">
            {todayPlan.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-pink-50 group hover:border-pink-200 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.completed ? 'bg-pink-100 text-pink-500' : 'bg-gray-50 text-gray-300'}`}>
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-pink-300 transition-colors" size={20} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">
            饮食建议 <span className="text-gray-400 font-normal text-sm">(Dietary)</span>
          </h3>
          <div className="bg-tertiary-container/30 rounded-[32px] p-6 space-y-6 border border-tertiary-container/50">
            <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-tertiary-container rounded-xl flex items-center justify-center text-tertiary">
                  <Utensils size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold">今日摄入目标</p>
                  <p className="text-xl font-bold text-gray-800">1500 <span className="text-xs font-normal">kcal</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold">剩余</p>
                <p className="text-lg font-bold text-emerald-500">420 <span className="text-xs font-normal">kcal</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <img 
                  src="https://picsum.photos/seed/salad/100/100" 
                  alt="Meal" 
                  className="w-14 h-14 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">晚餐：藜麦鸡胸肉沙拉</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">富含优质蛋白，帮助夜间代谢。</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <img 
                  src="https://picsum.photos/seed/fruit/100/100" 
                  alt="Meal" 
                  className="w-14 h-14 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">加餐：混合浆果 150g</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">天然抗氧化，脆脆的小满足。</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </div>

            <button className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 flex items-center justify-center gap-2 hover:bg-pink-600 transition-all">
              <Plus size={20} />
              记录今日
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
