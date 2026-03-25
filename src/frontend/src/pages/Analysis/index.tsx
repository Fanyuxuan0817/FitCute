import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  BarChart3, 
  Weight, 
  Percent, 
  Trophy,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

const AnalysisView: React.FC = () => {
  const steps = [
    { day: '周一', value: 6200, height: 60 },
    { day: '周二', value: 8400, height: 80 },
    { day: '周三', value: 12000, height: 100, active: true },
    { day: '周四', value: 5100, height: 50 },
    { day: '周五', value: 7500, height: 70 },
    { day: '周六', value: 9200, height: 90 },
    { day: '周日', value: 4200, height: 40 },
  ];

  const badges = [
    { icon: '🔥', label: '连续7天', color: 'bg-orange-100' },
    { icon: '🐦', label: '早起鸟', color: 'bg-blue-100' },
    { icon: '🏃', label: '半马达人', color: 'bg-gray-100', locked: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-brand text-gray-800 tracking-wide">你的运动足迹 ✨</h2>
          <p className="text-gray-500 mt-1">发现更好的自己，每一小步都值得记录。</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
          <button className="px-6 py-2 text-sm font-bold rounded-xl bg-white shadow-sm text-pink-500">本周</button>
          <button className="px-6 py-2 text-sm font-bold text-gray-400 hover:bg-white/50 rounded-xl transition-all">本月</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Summary Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 bg-pink-100 rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/40 rounded-2xl backdrop-blur-md">
                <Flame className="text-pink-600" />
              </div>
              <h3 className="font-bold text-pink-700">今日摘要</h3>
            </div>
            <div className="space-y-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-pink-700">524</span>
                <span className="text-pink-700/60 font-bold">kcal</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/30 p-4 rounded-3xl backdrop-blur-md">
                  <p className="text-[10px] text-pink-700/60 font-bold mb-1">运动时长</p>
                  <p className="text-2xl font-bold text-pink-700">45<span className="text-xs font-normal">min</span></p>
                </div>
                <div className="bg-white/30 p-4 rounded-3xl backdrop-blur-md">
                  <p className="text-[10px] text-pink-700/60 font-bold mb-1">活跃分钟</p>
                  <p className="text-2xl font-bold text-pink-700">128<span className="text-xs font-normal">min</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        </motion.div>

        {/* Chart Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 bg-white rounded-[40px] p-8 border border-pink-50 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-bold text-gray-800">步数趋势图</h3>
            </div>
            <span className="text-xs text-gray-400 font-bold">平均 8,420 步 / 天</span>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-4 px-4 min-h-[200px]">
            {steps.map((step) => (
              <div key={step.day} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="relative w-full flex flex-col items-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${step.height}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`w-full max-w-[40px] rounded-full transition-all cursor-pointer ${
                      step.active ? 'bg-blue-400' : 'bg-blue-50 group-hover:bg-blue-100'
                    }`}
                  />
                  {step.active && (
                    <div className="absolute -top-10 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-lg">
                      12k
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${step.active ? 'text-gray-800' : 'text-gray-400'}`}>
                  {step.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-[32px] p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 text-pink-500 rounded-xl">
                  <Weight size={20} />
                </div>
                <h4 className="text-sm font-bold text-gray-500">体重变化</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-800">54.2</span>
                <span className="text-sm text-gray-400">kg</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <TrendingDown size={14} />
                <span>较上周下降 0.8kg</span>
              </div>
            </div>
            <div className="h-12 flex items-end gap-1 mt-8">
              {[0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5].map((h, i) => (
                <div key={i} className="flex-1 bg-pink-200 rounded-full" style={{ height: `${h * 100}%`, opacity: 0.3 + h * 0.7 }} />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-[32px] p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-500 rounded-xl">
                  <Percent size={20} />
                </div>
                <h4 className="text-sm font-bold text-gray-500">体脂率</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-800">22.5</span>
                <span className="text-sm text-gray-400">%</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <TrendingDown size={14} />
                <span>较上周下降 0.2%</span>
              </div>
            </div>
            <div className="h-12 flex items-end gap-1 mt-8">
              {[0.6, 0.4, 0.3, 0.5, 0.4, 0.3, 0.2].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-200 rounded-full" style={{ height: `${h * 100}%`, opacity: 0.3 + h * 0.7 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Badges Card */}
        <div className="lg:col-span-5 bg-white rounded-[40px] p-8 border border-pink-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 text-yellow-500 rounded-xl">
                <Trophy size={20} />
              </div>
              <h3 className="font-bold text-gray-800">成就奖章</h3>
            </div>
            <button className="text-xs text-pink-500 font-bold hover:underline">查看全部</button>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div key={badge.label} className={`flex flex-col items-center gap-3 text-center group cursor-pointer ${badge.locked ? 'opacity-40 grayscale' : ''}`}>
                <div className={`w-16 h-16 ${badge.color} rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm`}>
                  {badge.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-600">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Encouragement Footer */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tertiary-container/30 border border-dashed border-tertiary-container/60 rounded-[40px] p-10 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvHz-hfGRYcQlS3e63U5Gq0JdA0_06mce7R7JMh8-pqzDKAyu1EIX0IwBYhK3tOlFRkIvfamMCk6g1c5eXSAAU8Z-DuoUwJLbzUG1kdz00QKRzLCDpCMk5dgUPiXNhq5kEx_XKl_bWvl4CndWYAxViseSvpiK68d8fUxWJJETBVJSb1FPVkgMN-MuzGzlH9lsE58DUVL6WSi2nvTtD2pLpY8VCtwwJZvuu3OeOZsvNoHdCTsTbsXo6gFKjkviyhPeSOX7Poov7sVE" 
            alt="Mascot"
            className="w-16 h-16"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <p className="text-2xl font-brand text-emerald-800 leading-tight">
            “不要急于看到结果，现在的每一分努力，<br className="hidden md:block"/>都在悄悄地改变着你的未来。”
          </p>
          <p className="text-sm text-emerald-600 font-medium mt-3">— 你的贴心助教 FitCute!</p>
        </div>
        <button className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95">
          继续加油 ✨
        </button>
      </motion.section>
    </div>
  );
};

export default AnalysisView;
