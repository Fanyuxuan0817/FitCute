import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-pink-50 px-8 flex items-center justify-between z-30">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索你的健身数据..." 
            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-100 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-pink-500 transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">嗨，小健将！</p>
            <p className="text-[10px] text-gray-400">记得多喝水 💧</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-pink-100 overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCldbmd9DbOMYevu_nPljbJ11XAsIpM3CCMdSrvUr4UFF9GifIE8CsLNHCezxfoCUST5LpvwcdEZ-4gO7EGxOJq2WOwaM0EeaOIzXZiLuLNKlxmiUIRpSt4mZXRFRNongozmwiNX3GTnxVVjgf9reCiuHMUXIxEPl1cZ1NfNX4yS2C8co0uh0H5Ry2XaRRsWGdecqpMEW-8cCW45enAP6nEqhpe37SLq5xIJ0tXKi8b5E95EdSaj4kFjndNfH1do5v7GKnn_Rs561c" 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
