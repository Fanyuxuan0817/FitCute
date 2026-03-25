import React from 'react';
import { User, Bell, Shield, Smartphone, HelpCircle, ChevronRight, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

const SettingsView: React.FC = () => {
  const settingsGroups = [
    {
      title: '个人资料',
      items: [
        { id: 'profile', label: '修改资料', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'notifications', label: '通知设置', icon: Bell, color: 'text-pink-500', bg: 'bg-pink-50' },
      ]
    },
    {
      title: '安全与账号',
      items: [
        { id: 'security', label: '账号安全', icon: Shield, color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'devices', label: '设备管理', icon: Smartphone, color: 'text-purple-500', bg: 'bg-purple-50' },
      ]
    },
    {
      title: '关于',
      items: [
        { id: 'help', label: '帮助中心', icon: HelpCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] p-8 soft-pink-shadow flex flex-col md:flex-row items-center gap-6"
      >
        <div className="relative">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="Avatar" 
            className="w-24 h-24 rounded-full border-4 border-pink-100"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <span className="text-xs">✏️</span>
          </button>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-gray-800">小健将</h2>
          <p className="text-gray-400">ID: 88888888 | 加入 FitCute! 已经 32 天啦</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-pink-50 text-pink-500 text-xs font-bold rounded-full">LV.5 运动达人</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-500 text-xs font-bold rounded-full">勋章 x12</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-pink-500 text-white font-bold rounded-2xl hover:bg-pink-600 transition-colors">
          编辑资料
        </button>
      </motion.div>

      {/* Settings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {settingsGroups.map((group, groupIdx) => (
          <motion.div 
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800 px-2">{group.title}</h3>
            <div className="bg-white rounded-[32px] overflow-hidden soft-pink-shadow">
              {group.items.map((item, idx) => (
                <button 
                  key={item.id}
                  className={`w-full flex items-center gap-4 p-5 hover:bg-pink-50/30 transition-colors ${
                    idx !== group.items.length - 1 ? 'border-bottom border-pink-50' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                    <item.icon size={20} />
                  </div>
                  <span className="flex-1 text-left font-medium text-gray-700">{item.label}</span>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Info & Logout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-gray-800 px-2">系统</h3>
          <div className="bg-white rounded-[32px] overflow-hidden soft-pink-shadow">
            <div className="p-5 flex items-center justify-between border-bottom border-pink-50">
              <span className="font-medium text-gray-700">当前版本</span>
              <span className="text-sm text-gray-400">v1.2.0</span>
            </div>
            <button className="w-full flex items-center gap-4 p-5 hover:bg-red-50 text-red-500 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <LogOut size={20} />
              </div>
              <span className="flex-1 text-left font-bold">退出登录</span>
              <ChevronRight size={18} className="text-red-200" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mascot Footer */}
      <div className="flex flex-col items-center justify-center py-12 opacity-30">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvDKX6Ajyrx9n0A9ZhfM_Q88MHYmp19FcEN2fA7nKaUbl0z4R4U6VYR8Oz6dpF2Q1rPi4QFAsPNe7vBX56zhX1cVM91tbyUsbsQReOaPH2NVWOJdXMIHE7pXrMtid8Id4QPmUo-tuagpGZEAUm2xeFJL_jxOZ8bwYl39E-iNwm7n2RzZaV66Kkau-ng-dcBz6umjYjYEv2BferyFYWSKYW7G4e3ma5X8vNdPMTxl0peF3DGBZgc72V7tlcjOEMiRSS12q0tXuI8Ao" 
          alt="Mascot" 
          className="w-16 h-16 grayscale mb-2"
        />
        <p className="text-xs font-brand text-gray-400">FitCute! - 陪你变美每一天</p>
      </div>
    </div>
  );
};

export default SettingsView;
