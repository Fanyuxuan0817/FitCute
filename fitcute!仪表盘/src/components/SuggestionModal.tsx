import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Zap, Activity, Utensils, Sparkles } from "lucide-react";
import { getCatExpertAdvice } from "@/src/services/geminiService";
import { AppState } from "@/src/types";

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
}

export function SuggestionModal({ isOpen, onClose, appState }: SuggestionModalProps) {
  const [advice, setAdvice] = useState("正在为你生成专属元气建议喵...");

  useEffect(() => {
    if (isOpen) {
      getCatExpertAdvice(appState).then(setAdvice);
    }
  }, [isOpen, appState]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="今日份元气建议 ✨" className="max-w-lg">
      <div className="space-y-8 py-4">
        <div className="h-1.5 w-16 bg-pink-200 rounded-full mx-auto -mt-4 mb-8"></div>

        {/* Metabolism Insight */}
        <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100 mb-8 flex items-start gap-4">
          <div className="bg-white p-2 rounded-full text-2xl shadow-sm">🔥</div>
          <div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-600">当前代谢水平：</span>
              处于黄金阶段，非常适合进行舒缓的瑜伽运动。
            </p>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-sky-50/40 p-5 rounded-3xl border border-dashed border-sky-200">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-sky-500" />
              <h3 className="font-bold text-sky-700">运动建议</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                推荐“晨间瑜伽 15min”
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                或“晚间漫步 3000步”
              </li>
            </ul>
          </div>

          <div className="bg-green-50/40 p-5 rounded-3xl border border-dashed border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <Utensils className="w-6 h-6 text-green-500" />
              <h3 className="font-bold text-green-700">饮食建议</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                推荐“高蛋白藜麦鸡胸肉沙拉”
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                或“混合莓果奶昔”
              </li>
            </ul>
          </div>
        </div>

        {/* Cat Expert Advice */}
        <div className="flex flex-col items-center bg-pink-50/50 rounded-3xl p-6 border border-pink-100">
          <div className="animate-breathing mb-4">
            <img
              src="https://picsum.photos/seed/catcoach/200/200"
              alt="Cat Coach"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-pink-100 text-sm text-gray-700 text-center">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-pink-100 rotate-45"></div>
            {advice}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button onClick={onClose} className="w-full py-4 bg-pink-300 hover:bg-pink-400 text-white font-bold rounded-full transition-all shadow-md active:scale-95 text-lg">
            一键开启：同步至今日计划
          </button>
          <button onClick={onClose} className="w-full py-2 text-slate-400 hover:text-pink-400 transition-colors font-medium text-sm">
            暂不需要，我知道了
          </button>
        </div>
      </div>
    </Modal>
  );
}
