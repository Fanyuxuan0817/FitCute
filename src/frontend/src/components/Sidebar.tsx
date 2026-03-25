import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { ViewType } from '../types';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'training', label: '训练计划', icon: Dumbbell },
    { id: 'diet', label: '饮食推荐', icon: Utensils },
    { id: 'analysis', label: '运动分析', icon: LineChart },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-pink-50 flex flex-col py-8 z-40 hidden md:flex rounded-r-[32px] shadow-xl shadow-pink-100/20">
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvDKX6Ajyrx9n0A9ZhfM_Q88MHYmp19FcEN2fA7nKaUbl0z4R4U6VYR8Oz6dpF2Q1rPi4QFAsPNe7vBX56zhX1cVM91tbyUsbsQReOaPH2NVWOJdXMIHE7pXrMtid8Id4QPmUo-tuagpGZEAUm2xeFJL_jxOZ8bwYl39E-iNwm7n2RzZaV66Kkau-ng-dcBz6umjYjYEv2BferyFYWSKYW7G4e3ma5X8vNdPMTxl0peF3DGBZgc72V7tlcjOEMiRSS12q0tXuI8Ao" 
            alt="Mascot" 
            className="w-8 h-8"
          />
        </div>
        <div>
          <h1 className="text-2xl font-brand text-pink-500">FitCute!</h1>
          <p className="text-[10px] text-gray-400 font-medium">智能健身助教</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              activeView === item.id 
                ? 'bg-pink-100 text-pink-600' 
                : 'text-gray-500 hover:bg-pink-50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
            {activeView === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 mt-auto space-y-2">
        <button 
          onClick={() => onViewChange('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
            activeView === 'help' 
              ? 'bg-pink-100 text-pink-600' 
              : 'text-gray-500 hover:bg-pink-50'
          }`}
        >
          <HelpCircle size={20} />
          <span className="font-medium text-sm">帮助中心</span>
          {activeView === 'help' && (
            <motion.div 
              layoutId="active-pill"
              className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500"
            />
          )}
        </button>
        <button 
          onClick={() => onViewChange('login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">退出登录</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
