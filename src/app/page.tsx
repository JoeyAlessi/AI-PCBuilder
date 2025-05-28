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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current) {
      return;
    }
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      const data = await res.json();

      if (!data.content) {
        throw new Error("Invalid response format: missing content");
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: "assistant",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error in handleSendMessage:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-4rem)] p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col h-full border border-gray-700 rounded-lg bg-gray-900 shadow-lg overflow-hidden">
        <ScrollArea className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[75%] px-4 py-3 rounded-lg whitespace-pre-wrap mb-3",
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-800 text-gray-300 mr-auto"
              )}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="max-w-[75%] bg-gray-800 text-gray-300 mr-auto px-4 py-3 rounded-lg animate-pulse">
              Assistant is typing...
            </div>
          )}

          <div ref={bottomRef} />
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

      <div className="h-full overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
        <PCVisualizer />
      </div>
    </div>
  );
}
