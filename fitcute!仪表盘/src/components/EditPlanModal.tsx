import React, { useState } from "react";
import { Modal } from "./Modal";
import { Dumbbell, Utensils, Trash2, PlusCircle } from "lucide-react";
import { Task } from "@/src/types";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

export function EditPlanModal({ isOpen, onClose, tasks }: EditPlanModalProps) {
  const [selectedIntensity, setSelectedIntensity] = useState<{ [key: string]: string }>({});

  const handleIntensitySelect = (taskId: string, level: string) => {
    setSelectedIntensity(prev => ({ ...prev, [taskId]: level }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="编辑今日计划" className="max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4">
        {/* Left Column: Workout Planner */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-pink-400" /> 训练项目编辑
            </h3>
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              key={tasks.length}
              className="text-xs font-bold px-3 py-1 bg-pink-100 text-pink-600 rounded-full"
            >
              已选 {tasks.length} 项
            </motion.span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 p-5 rounded-3xl border border-pink-100 relative group transition-all hover:shadow-md"
                >
                  <div className="flex justify-between mb-4">
                    <h4 className="font-bold text-lg text-on-surface flex items-center gap-2">
                      {task.title.split(" ")[0]} <span className="text-sm font-normal text-on-surface-variant">舒缓身心</span>
                    </h4>
                    <motion.button 
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-400 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-on-surface-variant block mb-2">时长: 30 分钟</label>
                      <input type="range" className="w-full accent-pink-400 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div className="flex gap-2">
                      {["低强度", "中强度", "高强度"].map((level) => {
                        const isSelected = selectedIntensity[task.id] === level;
                        return (
                          <motion.button 
                            key={level} 
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleIntensitySelect(task.id, level)}
                            className={cn(
                              "flex-1 py-2 px-3 text-xs font-bold rounded-full transition-all border",
                              isSelected 
                                ? "bg-pink-400 text-white border-pink-400 shadow-sm" 
                                : "bg-white text-slate-400 border-slate-200 hover:border-pink-300 hover:text-pink-400"
                            )}
                          >
                            {level}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#fff5f7" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-pink-300 hover:text-pink-400 transition-all bg-white"
            >
              <PlusCircle className="w-5 h-5" /> 添加新训练
            </motion.button>
          </div>
        </div>

        {/* Right Column: Diet Insight */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Utensils className="w-5 h-5 text-green-500" /> 营养摄入同步
          </h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50/30 p-6 rounded-3xl border border-green-100 border-dashed space-y-4"
          >
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-green-600 font-bold mb-1">今日预计消耗</p>
                <span className="text-3xl font-black text-green-700">450 <span className="text-lg font-medium">kcal</span></span>
              </div>
              <div className="text-right">
                <p className="text-sm text-on-surface-variant font-medium mb-1">建议摄入</p>
                <span className="text-2xl font-black text-on-surface">1850 <span className="text-base font-medium">kcal</span></span>
              </div>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </motion.div>

          <div className="space-y-3">
            {["早餐建议", "午餐建议", "晚餐建议"].map((meal, i) => (
              <motion.div 
                key={meal} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 hover:border-green-200 transition-all"
              >
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-2xl">
                  {["🥣", "🥗", "🥩"][i]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">{meal}</h4>
                  <p className="text-sm text-on-surface-variant">
                    {["燕麦粥 + 蓝莓 + 坚果", "煎三文鱼 + 藜麦饭 + 西兰花", "鸡胸肉沙拉 + 紫薯"][i]}
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs font-bold text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                >
                  一键替换
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-slate-50">
        <motion.button 
          whileHover={{ backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose} 
          className="px-8 py-3 rounded-2xl font-bold text-slate-500 border-2 border-slate-100 transition-all"
        >
          取消
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose} 
          className="px-10 py-3 rounded-2xl font-bold bg-slate-800 text-white shadow-lg transition-all"
        >
          保存并同步
        </motion.button>
      </div>
    </Modal>
  );
}
