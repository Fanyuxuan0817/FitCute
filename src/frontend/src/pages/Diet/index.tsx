import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Search, 
  Plus, 
  ChevronRight, 
  Loader2,
  Utensils,
  Flame,
  ChevronLeft
} from 'lucide-react';
import { analyzeFoodImage, FoodAnalysis } from '../../services/geminiService';

const DietView: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const meals = [
    { id: '1', type: 'BREAKFAST', time: '08:00', name: '全麦欧包 & 蓝莓酸奶', calories: 320, carbs: 45, protein: 12, fat: 8, image: 'https://picsum.photos/seed/breakfast/200/200' },
    { id: '2', type: 'LUNCH', time: '12:30', name: '香煎鸡胸肉 & 藜麦沙拉', calories: 450, carbs: 38, protein: 35, fat: 12, image: 'https://picsum.photos/seed/lunch/200/200' },
    { id: '3', type: 'SNACK', time: '15:30', name: '混合坚果 & 奇异果', calories: 180, carbs: 15, protein: 5, fat: 10, image: 'https://picsum.photos/seed/snack/200/200' },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const result = await analyzeFoodImage(base64);
        setAnalysisResult(result);
      } catch (error) {
        console.error(error);
        alert("分析失败，请重试喵~");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Meal List */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-xl border border-pink-50 text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-pink-50">
              <div className="px-4 py-1.5 bg-pink-500 text-white rounded-xl text-xs font-bold">MON 18</div>
              <div className="px-4 py-1.5 text-gray-400 text-xs font-bold">TUE 19</div>
              <div className="px-4 py-1.5 text-gray-400 text-xs font-bold">WED 20</div>
            </div>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-xl text-xs font-bold text-pink-500">全部</button>
            <button className="px-4 py-1.5 text-gray-400 text-xs font-bold hover:bg-white/50 rounded-xl">自制</button>
            <button className="px-4 py-1.5 text-gray-400 text-xs font-bold hover:bg-white/50 rounded-xl">外卖</button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Utensils className="text-pink-400" size={24} />
            今日推荐餐单
          </h3>
          <div className="space-y-4">
            {meals.map((meal) => (
              <motion.div 
                key={meal.id}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-[32px] border border-pink-50 shadow-sm flex items-center gap-6 group"
              >
                <img src={meal.image} alt={meal.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1 space-y-2">
                  <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{meal.type} • {meal.time}</p>
                  <h4 className="text-lg font-bold text-gray-800">{meal.name}</h4>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-pink-50 rounded-lg text-pink-500 text-[10px] font-bold">
                      热量 <span className="text-sm">{meal.calories}</span> kcal
                    </div>
                    <div className="flex gap-3 text-[10px] text-gray-400 font-medium">
                      <span>碳水 {meal.carbs}g</span>
                      <span>蛋白 {meal.protein}g</span>
                      <span>脂肪 {meal.fat}g</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-xs font-bold text-pink-400 hover:bg-pink-50 rounded-xl transition-colors">替换</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Quick Record & Analysis */}
      <div className="space-y-8">
        {/* Nutritional Overview */}
        <div className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-sm space-y-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-50 text-pink-500 rounded-xl">
              <Flame size={20} />
            </div>
            <h3 className="font-bold text-gray-800">营养摄入概览</h3>
          </div>

          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-pink-50" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={502.4} strokeDashoffset={502.4 * 0.4} className="text-pink-400" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">850</span>
              <span className="text-xs text-gray-400">剩余 kcal</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: '蛋白质', current: 45, target: 80, color: 'pink' },
              { label: '碳水化合物', current: 120, target: 200, color: 'blue' },
              { label: '脂肪', current: 30, target: 55, color: 'emerald' },
            ].map((macro) => (
              <div key={macro.label} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-500">{macro.label}</span>
                  <span className="text-pink-500">{macro.current} / {macro.target}g</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${macro.color === 'pink' ? 'pink-400' : macro.color === 'blue' ? 'blue-400' : 'emerald-400'}`} 
                    style={{ width: `${(macro.current / macro.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Record (AI Analysis) */}
        <div className="bg-white p-8 rounded-[40px] border border-pink-50 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Camera size={20} />
            </div>
            <h3 className="font-bold text-gray-800">快捷记录</h3>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-blue-100 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-blue-50/50 transition-all group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="text-blue-400 animate-spin" size={32} />
                <p className="text-xs text-blue-400 font-bold">AI 正在努力识别中...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera size={32} />
                </div>
                <p className="text-sm font-bold text-blue-400">拍照识别热量</p>
              </>
            )}
          </div>

          <AnimatePresence>
            {analysisResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-emerald-50 rounded-2xl space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-emerald-700">{analysisResult.foodName}</h4>
                  <span className="text-xs font-bold text-emerald-600">{analysisResult.calories} kcal</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-emerald-600 font-bold">
                  <div className="bg-white/50 p-2 rounded-lg text-center">P: {analysisResult.protein}g</div>
                  <div className="bg-white/50 p-2 rounded-lg text-center">C: {analysisResult.carbs}g</div>
                  <div className="bg-white/50 p-2 rounded-lg text-center">F: {analysisResult.fat}g</div>
                </div>
                <p className="text-[10px] text-emerald-600/80 italic">{analysisResult.description}</p>
                <button className="w-full py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors">
                  确认添加
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜搜你想吃的..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm"
            />
          </div>

          <button className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">
            添加记录
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietView;
