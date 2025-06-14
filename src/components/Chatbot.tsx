import React, { useState } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatbotProps {
  /**
   * Header shown at the top of the widget
   */
  title?: string;
  /**
   * OpenAI API key
   */
  apiKey: string;
}

/**
 * A minimal, style-able chatbot container.
 * This is just a stub to get the library compiling – logic & styling will be fleshed out in later steps.
 */
export const Chatbot: React.FC<ChatbotProps> = ({ title = 'AI Chatbot', apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputValue }]
        })
      });

      const data = await response.json();
      const botMessage: Message = { id: Date.now().toString(), text: data.choices[0].message.content, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, width: 350, height: 500, display: 'flex', flexDirection: 'column', background: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee', background: '#f8f8f8', fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#888' }}>Your messages will appear here...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: 8, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <span style={{ background: msg.sender === 'user' ? '#000' : '#e9ecef', color: msg.sender === 'user' ? 'white' : 'black', padding: '8px 12px', borderRadius: 12, display: 'inline-block' }}>
                {msg.text}
              </span>
            </div>
          ))
        )}
        {isLoading && <p style={{ color: '#888' }}>Loading...</p>}
      </div>
      <div style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex' }}>
        <input
          style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4, marginRight: 8 }}
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          style={{ padding: '8px 16px', background: '#000', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}; 