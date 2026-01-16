import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Settings,
  Trash2,
  Loader,
  Bot,
  User,
  ChevronDown,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useAI } from '../context/AIContext';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function AIChat() {
  const {
    messages,
    settings,
    isLoading,
    isChatOpen,
    providers,
    sendMessage,
    updateSettings,
    clearMessages,
    toggleChat
  } = useAI();

  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  // Floating button when closed
  if (!isChatOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 w-14 h-14 rounded-full shadow-xl shadow-indigo-300 hover:scale-110 z-50"
        title="AIに質問する"
      >
        <Sparkles size={24} />
      </Button>
    );
  }

  // Pane mode when open
  return (
    <div className="h-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-white/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">AI学習アシスタント</h3>
            <p className="text-xs text-indigo-200">
              {providers.find(p => p.id === settings.provider)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              showSettings ? "bg-white/30" : "hover:bg-white/20"
            )}
            title="設定"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={clearMessages}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="履歴を消去"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={toggleChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="閉じる"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex-shrink-0">
          <h4 className="font-medium text-slate-700 mb-3 text-sm">API設定</h4>

          {/* Provider Selection */}
          <div className="mb-3">
            <label className="block text-xs text-slate-500 mb-1.5">プロバイダー</label>
            <div className="relative">
              <select
                value={settings.provider}
                onChange={(e) => updateSettings({ provider: e.target.value as 'openai' | 'anthropic' | 'google' })}
                className="w-full p-2.5 border border-slate-200 rounded-xl appearance-none bg-white pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">APIキー</label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              placeholder={providers.find(p => p.id === settings.provider)?.apiKeyPlaceholder}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-1.5">
              APIキーはローカルに保存されます
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <MessageCircle size={28} className="text-indigo-500" />
              </div>
              <p className="font-medium text-slate-700">こんにちは!</p>
              <p className="text-sm mt-1 text-slate-500">
                Pythonの学習で分からないことを<br />質問してください
              </p>
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => sendMessage('変数とは何ですか？')}
                  className="block w-full text-left p-3 bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl text-sm text-slate-700 transition-all hover:border-indigo-200"
                >
                  <span className="text-indigo-500 mr-2">💡</span>変数とは何ですか？
                </button>
                <button
                  onClick={() => sendMessage('for文の使い方を教えてください')}
                  className="block w-full text-left p-3 bg-white hover:bg-indigo-50 border border-slate-200 rounded-xl text-sm text-slate-700 transition-all hover:border-indigo-200"
                >
                  <span className="text-indigo-500 mr-2">💡</span>for文の使い方
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                message.role === 'user'
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                  : "bg-slate-100"
              )}>
                {message.role === 'user' ? (
                  <User size={14} className="text-white" />
                ) : (
                  <Bot size={14} className="text-slate-600" />
                )}
              </div>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                message.role === 'user'
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-md"
                  : "bg-slate-100 text-slate-800 rounded-tl-md"
              )}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                <Bot size={14} className="text-slate-600" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3">
                <Loader size={18} className="text-indigo-500 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
        {!settings.apiKey && (
          <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700">
              ⚠️ APIキーを設定してください（⚙️ボタン）
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力..."
            className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}
