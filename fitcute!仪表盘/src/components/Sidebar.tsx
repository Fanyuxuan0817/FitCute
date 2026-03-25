import React from "react";
import { LayoutDashboard, Dumbbell, Utensils, BarChart3, Settings, Droplets } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "仪表盘", active: true },
  { icon: Dumbbell, label: "训练计划" },
  { icon: Utensils, label: "饮食推荐" },
  { icon: BarChart3, label: "运动分析" },
  { icon: Settings, label: "设置" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full py-6 bg-[#FDFBFF] border-r border-pink-50 w-64 rounded-r-3xl shadow-sm z-50">
      <div className="px-6 mb-8">
        <span className="text-2xl font-black text-pink-400 font-brand">FitCute!</span>
      </div>

      <div className="px-4 mb-10 flex flex-col gap-1">
        <div className="flex items-center gap-3 px-4 py-3 bg-pink-100/30 rounded-2xl relative">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/cat/100/100"
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm animate-breathing"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[10px]">💧</span>
            </div>
          </div>
          <div>
            <p className="font-brand text-sm text-on-surface">嗨，小健将！</p>
            <p className="text-[10px] text-on-surface-variant">记得多喝水 💧</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "px-4 py-3 flex items-center gap-3 rounded-2xl transition-all font-brand",
              item.active
                ? "bg-pink-100 text-pink-600"
                : "text-slate-500 hover:bg-pink-50"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
