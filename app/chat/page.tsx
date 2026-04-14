'use client';

import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-16">
        <ChatInterface />
      </div>
    </div>
  );
}