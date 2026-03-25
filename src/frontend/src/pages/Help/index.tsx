import React from 'react';
import { Search, MessageCircle, BookOpen, HelpCircle, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const HelpView: React.FC = () => {
  const faqs = [
    { question: '如何开启 AI 饮食识别？', answer: '在“饮食推荐”页面点击相机图标，上传食物照片即可自动识别热量和营养成分喵~' },
    { question: '训练计划可以自定义吗？', answer: '当然可以！在“训练计划”的动作仓库中，点击“添加自定义动作”即可创建属于你的专属动作。' },
    { question: '数据同步失败怎么办？', answer: '请检查网络连接，或尝试重新登录。如果问题持续存在，请联系我们的萌萌客服。' },
    { question: '如何获得更多勋章？', answer: '坚持每日打卡、完成挑战任务或达成运动里程碑，都能解锁精美的勋章哦！' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-pink-100 rounded-[32px] flex items-center justify-center mx-auto mb-6"
        >
          <HelpCircle size={48} className="text-pink-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">有什么可以帮到你的吗？</h2>
        <p className="text-gray-400">FitCute! 智能助教随时待命，为你解答一切疑问喵 🐾</p>
        
        <div className="relative max-w-xl mx-auto mt-8">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索问题、功能或教程..." 
            className="w-full pl-14 pr-6 py-5 bg-white rounded-[32px] soft-pink-shadow border-none focus:ring-2 focus:ring-pink-100 outline-none text-lg"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: '新手指南', desc: '快速上手 FitCute!', icon: BookOpen, color: 'blue' },
          { title: '在线客服', desc: '与萌萌助手对话', icon: MessageCircle, color: 'pink' },
          { title: '社区讨论', desc: '分享你的健身心得', icon: ExternalLink, color: 'emerald' },
        ].map((item, i) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] soft-pink-shadow border border-pink-50 flex flex-col items-center text-center group cursor-pointer hover:bg-pink-50/20 transition-all"
          >
            <div className={`w-16 h-16 rounded-3xl bg-${item.color}-50 text-${item.color}-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={32} />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 px-2">常见问题</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white rounded-[32px] p-8 soft-pink-shadow border border-pink-50 group cursor-pointer hover:border-pink-200 transition-all"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800 group-hover:text-pink-500 transition-colors">{faq.question}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-pink-300 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-pink-500 rounded-[40px] p-12 text-center text-white space-y-6 shadow-xl shadow-pink-200">
        <h3 className="text-3xl font-bold">还没找到答案？</h3>
        <p className="text-pink-100 max-w-md mx-auto">
          别担心，我们的专业健身教练和技术团队正在待命，点击下方按钮立即发起咨询。
        </p>
        <button className="px-12 py-4 bg-white text-pink-500 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-colors">
          联系人工客服
        </button>
      </div>
    </div>
  );
};

export default HelpView;
