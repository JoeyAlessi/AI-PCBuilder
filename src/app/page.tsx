"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PCVisualizer } from "@/components/PCVisualizer";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to PC Builder! Ask me anything about PC components or your build.",
      sender: "assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight;
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user" as const,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Here's a suggested component...",
          sender: "assistant",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-4rem)] p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      {/* Left - Chat */}
      <div className="flex flex-col h-full border border-gray-700 rounded-b-lg bg-gray-900 shadow-lg overflow-hidden">
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[75%] px-4 py-3 rounded-lg whitespace-pre-wrap",
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-800 text-gray-300 mr-auto"
              )}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="max-w-[75%] bg-gray-800 text-gray-300 ml-auto px-4 py-3 rounded-lg animate-pulse">
              Assistant is typing...
            </div>
          )}
        </ScrollArea>

        <footer className="px-6 py-4 border-t border-gray-700 bg-gray-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-3"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about PC components..."
              disabled={loading}
              className="bg-gray-700 text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </form>
        </footer>
      </div>

      <div className="h-full overflow-y-auto rounded-b-lg border border-gray-700 bg-gray-900 shadow-lg">
        <PCVisualizer />
      </div>
    </div>
  );
}
