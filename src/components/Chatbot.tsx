import React from 'react';

export interface ChatbotProps {
  /**
   * Header shown at the top of the widget
   */
  title?: string;
}

/**
 * A minimal, style-able chatbot container.
 * This is just a stub to get the library compiling – logic & styling will be fleshed out in later steps.
 */
export const Chatbot: React.FC<ChatbotProps> = ({ title = 'AI Chatbot' }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, width: 350, height: 500, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee', background: '#f8f8f8', fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
        <p style={{ color: '#888' }}>Your messages will appear here...</p>
      </div>
      <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
        <input style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} placeholder="Type a message..." disabled />
      </div>
    </div>
  );
}; 