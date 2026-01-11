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
  Sparkles
} from 'lucide-react';
import { useAI } from '../context/AIContext';

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
      <button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 flex items-center justify-center z-50 group"
        title="AIに質問する"
      >
        <Sparkles size={24} className="group-hover:animate-pulse" />
      </button>
    );
  }

  // Pane mode when open
  return (
    <div className="h-full bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-bold">AI学習アシスタント</h3>
            <p className="text-xs text-indigo-200">
              {providers.find(p => p.id === settings.provider)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="設定"
          >
            <Settings size={18} />
          </button>
          <button
            onClick={clearMessages}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="履歴を消去"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={toggleChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="閉じる"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-gradient-to-b from-indigo-50 to-white border-b border-indigo-100">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">API設定</h4>

          {/* Provider Selection */}
          <div className="mb-3">
            <label className="block text-xs text-gray-500 mb-1">プロバイダー</label>
            <div className="relative">
              <select
                value={settings.provider}
                onChange={(e) => updateSettings({ provider: e.target.value as 'openai' | 'anthropic' | 'google' })}
                className="w-full p-2.5 border border-indigo-200 rounded-lg appearance-none bg-white pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">APIキー</label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              placeholder={providers.find(p => p.id === settings.provider)?.apiKeyPlaceholder}
              className="w-full p-2.5 border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              APIキーはローカルに保存されます
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <Bot size={32} className="text-indigo-500" />
            </div>
            <p className="font-medium text-gray-700">こんにちは!</p>
            <p className="text-sm mt-1 text-gray-500">
              Pythonの学習で分からないことを<br />質問してください
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => sendMessage('変数とは何ですか？')}
                className="block w-full text-left p-3 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-gray-700 transition-colors"
              >
                <span className="text-indigo-500 mr-2">💡</span>変数とは何ですか？
              </button>
              <button
                onClick={() => sendMessage('for文の使い方を教えてください')}
                className="block w-full text-left p-3 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-gray-700 transition-colors"
              >
                <span className="text-indigo-500 mr-2">💡</span>for文の使い方
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                : 'bg-gradient-to-br from-gray-100 to-gray-200'
            }`}>
              {message.role === 'user' ? (
                <User size={14} className="text-white" />
              ) : (
                <Bot size={14} className="text-gray-600" />
              )}
            </div>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-md'
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-md shadow-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Bot size={14} className="text-gray-600" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <Loader size={18} className="text-indigo-500 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
        {!settings.apiKey && (
          <div className="mb-3 p-2.5 bg-amber-50 border border-amber-200 rounded-xl">
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
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
