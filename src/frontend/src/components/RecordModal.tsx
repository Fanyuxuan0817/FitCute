import React, { useState } from "react";
import { Modal } from "./Modal";
import { Scale, Droplets, Utensils, Heart, Camera, Check } from "lucide-react";
import { cn } from "../lib/utils";

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordModal({ isOpen, onClose }: RecordModalProps) {
  const [weight, setWeight] = useState(54.5);
  const [water, setWater] = useState(2);
  const [mood, setMood] = useState("🥰");

  const moods = ["🥳", "😊", "🥰", "😐", "😴"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="记录今日">
      <div className="space-y-8 py-4">
        <p className="text-on-surface-variant font-medium -mt-4 mb-4">每一步努力都值得被治愈 ✨</p>

        {/* Weight Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-brand text-xl flex items-center gap-2">
              <Scale className="w-5 h-5 text-pink-400" /> 当前体重
            </h3>
            <span className="text-2xl font-bold text-pink-400">{weight} <span className="text-sm font-normal text-slate-400">kg</span></span>
          </div>
          <div className="bg-pink-50/50 p-6 rounded-3xl border border-dashed border-pink-100">
            <input
              type="range"
              min="40"
              max="100"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-pink-100 rounded-full appearance-none cursor-pointer accent-pink-400"
            />
            <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium">
              <span>40kg</span>
              <span>55kg</span>
              <span>70kg</span>
              <span>85kg</span>
              <span>100kg</span>
            </div>
          </div>
        </section>

        {/* Water Section */}
        <section className="space-y-4">
          <h3 className="font-brand text-xl flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-400" /> 今日饮水
          </h3>
          <div className="flex flex-wrap gap-3">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                onClick={() => setWater(i + 1)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all border-2",
                  i < water
                    ? "bg-blue-100 text-blue-500 border-white shadow-sm"
                    : "bg-slate-50 text-slate-300 border-dashed border-slate-200 hover:bg-blue-50"
                )}
              >
                <Droplets className={cn("w-6 h-6", i < water && "fill-blue-500")} />
              </button>
            ))}
            <div className="flex items-center px-4 text-sm font-medium text-blue-600">
              已饮用 {water * 250}ml / 2000ml
            </div>
          </div>
        </section>

        {/* Diet Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-brand text-xl flex items-center gap-2">
              <Utensils className="w-5 h-5 text-green-400" /> 饮食记录
            </h3>
            <button className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-bold hover:bg-green-100 transition-colors">
              <Camera className="w-4 h-4" /> 拍照识别
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["早餐", "午餐", "晚餐", "加餐"].map((meal, i) => (
              <div key={meal} className="p-4 bg-slate-50 rounded-3xl border border-transparent hover:border-pink-100 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                    <span className="text-lg">{["🥣", "🥗", "🍲", "🍏"][i]}</span> {meal}
                  </span>
                  <input
                    type="number"
                    placeholder="千卡"
                    className="w-20 bg-white border-none rounded-full text-xs px-3 py-1 focus:ring-1 focus:ring-pink-200"
                  />
                </div>
                <div className="text-xs text-slate-400 italic">待记录...</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mood Section */}
        <section className="space-y-4">
          <h3 className="font-brand text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" /> 心情状态
          </h3>
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-full">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={cn(
                  "w-12 h-12 text-2xl transition-all rounded-full",
                  mood === m ? "scale-125 bg-white shadow-sm" : "grayscale opacity-60 hover:opacity-100 hover:scale-110"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        <div className="flex gap-4 pt-4">
          <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-full hover:bg-slate-200 transition-colors">
            取消
          </button>
          <button onClick={onClose} className="flex-[2] py-4 bg-pink-300 text-white font-brand text-xl rounded-full shadow-lg shadow-pink-100 hover:bg-pink-400 transition-all">
            保存今日记录
          </button>
        </div>
      </div>
    </Modal>
  );
}