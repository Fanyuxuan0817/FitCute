import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import fitCuteImage from '../../assets/FitCute.jpg';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#faf9fc]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Mascot Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col items-center justify-center p-12 bg-primary-container rounded-[48px] aspect-square relative overflow-hidden soft-pink-shadow"
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <img 
              src={fitCuteImage} 
              alt="FitCute Mascot"
              className="w-72 h-72 object-cover rounded-3xl mb-8 drop-shadow-2xl"
            />
            <p className="font-brand text-on-primary-container text-3xl">今天要一起流汗吗？</p>
          </motion.div>
          
          {/* Decorative Blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-tertiary-container/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-16 rounded-[48px] soft-pink-shadow border border-white/50"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">欢迎回来，我的健身搭子！</h1>
            <p className="text-gray-500 text-lg">今天也是遇见更可爱自己的第一步 ✨</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 px-1">账号</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入你的手机号或邮箱"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-100/50 rounded-2xl transition-all outline-none"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2 px-1">
                  <label className="block text-sm font-bold text-gray-700">密码</label>
                  <button type="button" className="text-xs text-pink-500 font-bold hover:underline">忘记密码？</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="输入密码"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-100/50 rounded-2xl transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-pink-100 text-pink-600 font-bold py-5 rounded-2xl text-xl hover:bg-pink-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              开启今天的健身之旅
              <ArrowRight size={24} />
            </button>
          </form>

          <div className="mt-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-100 flex-1"></div>
              <span className="text-xs text-gray-400 uppercase tracking-widest">快捷登录</span>
              <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            <div className="flex justify-center gap-6">
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                <Github size={24} className="text-gray-600" />
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                <Chrome size={24} className="text-gray-600" />
              </button>
            </div>

            <p className="text-center mt-10 text-gray-500">
              还没有账号？ <button className="text-pink-500 font-bold hover:underline">立即加入 FitCute!</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginView;
