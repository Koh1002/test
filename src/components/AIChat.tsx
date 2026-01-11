import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Settings,
  Trash2,
  Loader,
  Bot,
  User,
  ChevronDown
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

  if (!isChatOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed right-6 bottom-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 flex items-center justify-center z-50"
        title="AIに質問する"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot size={24} />
          <div>
            <h3 className="font-bold">AI学習アシスタント</h3>
            <p className="text-xs text-indigo-200">
              {providers.find(p => p.id === settings.provider)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
            title="設定"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={clearMessages}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
            title="履歴を消去"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={toggleChat}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
            title="閉じる"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">API設定</h4>

          {/* Provider Selection */}
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">プロバイダー</label>
            <div className="relative">
              <select
                value={settings.provider}
                onChange={(e) => updateSettings({ provider: e.target.value as any })}
                className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8"
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
            <label className="block text-sm text-gray-600 mb-1">APIキー</label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              placeholder={providers.find(p => p.id === settings.provider)?.apiKeyPlaceholder}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              APIキーはローカルに保存され、外部に送信されることはありません。
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-medium">こんにちは！</p>
            <p className="text-sm mt-2">
              Pythonの学習で分からないことがあれば<br />
              何でも質問してください。
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => sendMessage('変数とは何ですか？')}
                className="block w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                💡 変数とは何ですか？
              </button>
              <button
                onClick={() => sendMessage('for文の使い方を教えてください')}
                className="block w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                💡 for文の使い方を教えてください
              </button>
              <button
                onClick={() => sendMessage('Pandasでデータを読み込む方法')}
                className="block w-full text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                💡 Pandasでデータを読み込む方法
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-indigo-600' : 'bg-gray-200'
            }`}>
              {message.role === 'user' ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-gray-600" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Bot size={16} className="text-gray-600" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
              <Loader size={20} className="text-gray-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        {!settings.apiKey && (
          <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700">
              ⚠️ APIキーを設定してください。設定ボタン（⚙️）から入力できます。
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
