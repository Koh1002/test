import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ChatMessage, AISettings, AIProvider } from '../types';

interface AIContextType {
  messages: ChatMessage[];
  settings: AISettings;
  isLoading: boolean;
  isChatOpen: boolean;
  providers: AIProvider[];
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  sendMessage: (content: string) => Promise<void>;
  updateSettings: (settings: Partial<AISettings>) => void;
  clearMessages: () => void;
  toggleChat: () => void;
}

const providers: AIProvider[] = [
  { id: 'openai', name: 'OpenAI (GPT)', apiKeyPlaceholder: 'sk-...' },
  { id: 'anthropic', name: 'Anthropic (Claude)', apiKeyPlaceholder: 'sk-ant-...' },
  { id: 'google', name: 'Google (Gemini)', apiKeyPlaceholder: 'AIza...' },
];

const defaultSettings: AISettings = {
  provider: 'openai',
  apiKey: '',
};

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [settings, setSettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('python-learning-ai-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (content: string) => {
    if (!settings.apiKey) {
      addMessage('APIキーを設定してください。', 'assistant');
      return;
    }

    addMessage(content, 'user');
    setIsLoading(true);

    try {
      let response: string;

      if (settings.provider === 'openai') {
        response = await callOpenAI(content, settings.apiKey);
      } else if (settings.provider === 'anthropic') {
        response = await callAnthropic(content, settings.apiKey);
      } else if (settings.provider === 'google') {
        response = await callGoogle(content, settings.apiKey);
      } else {
        response = 'サポートされていないプロバイダーです。';
      }

      addMessage(response, 'assistant');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'エラーが発生しました';
      addMessage(`エラー: ${errorMessage}`, 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (newSettings: Partial<AISettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('python-learning-ai-settings', JSON.stringify(updated));
      return updated;
    });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        settings,
        isLoading,
        isChatOpen,
        providers,
        addMessage,
        sendMessage,
        updateSettings,
        clearMessages,
        toggleChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}

// API Calls
async function callOpenAI(message: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたはPythonプログラミングの優秀な講師です。初心者にもわかりやすく、丁寧に教えてください。回答は日本語で行ってください。',
        },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI APIエラー');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(message: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: 'あなたはPythonプログラミングの優秀な講師です。初心者にもわかりやすく、丁寧に教えてください。回答は日本語で行ってください。',
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    throw new Error('Anthropic APIエラー');
  }

  const data = await response.json();
  return data.content[0].text;
}

async function callGoogle(message: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `あなたはPythonプログラミングの優秀な講師です。初心者にもわかりやすく、丁寧に教えてください。\n\n質問: ${message}`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Google APIエラー');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
