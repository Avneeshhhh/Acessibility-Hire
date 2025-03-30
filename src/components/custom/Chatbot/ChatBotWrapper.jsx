'use client';
import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('./ChatBot'), {
  ssr: false
});

const ChatBotWrapper = () => {
  return <ChatBot />;
};

export default ChatBotWrapper; 