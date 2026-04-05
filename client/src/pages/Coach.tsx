import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are a high-level identity coach focused on helping users shift how they think, act, and make decisions.
Your purpose is NOT to motivate — it is to create real internal shifts.
You guide users to live from a place of certainty, alignment, and ownership — not fear, lack, or doubt.

Rules:
- Be direct, grounded, and clear (not fluffy or overly spiritual)
- Speak like a real person, not a guru
- Focus on identity, not just behavior
- Challenge limiting thinking when necessary
- Keep responses concise but impactful
- Always guide the user toward a shift in perspective AND a simple action

Core concept: People don’t get results by trying harder — they get results by becoming someone different internally.`;

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content: "I'm here to help you shift from where you are to who you are becoming. What feels heavy, stuck, or out of alignment for you right now?",
};

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("coach_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [INITIAL_MESSAGE];
      }
    }
    return [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("coach_messages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateMockResponse = (userText: string) => {
    const text = userText.toLowerCase();
    
    if (text.includes("unworthy") || text.includes("not good enough") || text.includes("shame") || text.includes("deserve")) {
      return "It makes sense that you'd feel that way, especially if you're looking back at things you're not proud of. But your value isn't coming from your past—it's coming from who you are right now. For today, stop measuring yourself against your worst moments. Act like you're already worthy. What's one small thing you'd do differently if that were true?";
    }
    if (text.includes("fear") || text.includes("afraid") || text.includes("scared") || text.includes("terrified")) {
      return "That fear is entirely valid, and it's okay that it's there. The mistake we make is believing that feeling afraid means we're in danger. You don't need the fear to disappear before you move. Do the thing scared. What is the one action you'd take right now if you trusted you were completely safe?";
    }
    if (text.includes("tired") || text.includes("exhausted") || text.includes("burnout") || text.includes("hard")) {
      return "Of course you're exhausted—you've been carrying the weight of trying to figure this all out on your own. It's incredibly heavy. But you don't have to force a solution today. Put the weight down. Pick one task you can completely let go of for the next hour and just rest.";
    }
    if (text.includes("stuck") || text.includes("lost") || text.includes("don't know") || text.includes("confused")) {
      return "Feeling stuck is disorienting, I know. Usually, that feeling happens when we are looking too far ahead at a picture we can't see yet. You don't need the whole map right now, just the next right move. Make one simple decision today that moves you forward, no matter how small it is.";
    }
    if (text.includes("anxious") || text.includes("worry") || text.includes("stress") || text.includes("overwhelmed")) {
      return "It's easy to get swept away in the noise when everything feels urgent. I hear the pressure in that. But anxiety pulls you out of the present, which is the only place you have power. Drop the need to control tomorrow. Name one concrete thing you can control right now, and go focus on that.";
    }
    if (text.includes("fail") || text.includes("mistake") || text.includes("mess up")) {
      return "That fear of getting it wrong is so common, but it can paralyze us. A misstep doesn't rewrite your identity; it's just a moment of learning. You are bigger than any single outcome. Give yourself permission to make a mess today. Take the risk you've been avoiding.";
    }
    
    // Fallbacks that still follow the rules for generic/unmatched inputs
    const fallbacks = [
      "I hear what you're saying, and honestly, that's a tough place to be in. It's easy to feel like circumstances are running the show. But you have more agency here than it feels like. Reclaim your ownership. Make one firm decision today that puts you back in the driver's seat.",
      "That completely makes sense. It’s natural to hesitate when things feel uncertain. But certainty usually only comes after we take the first step, not before. Stop waiting for the perfect time. Take one quiet, aligned action right now, even if you aren't 100% sure.",
      "I understand why that feels heavy. It's a lot to navigate. Sometimes we get so caught up in trying to 'fix' the problem that we forget who we actually are beneath it. Step back from trying to fix it. How would you handle this if you were fully rested and completely secure? Do that.",
      "That's a very human reaction. It's okay to feel the friction. We just don't want to build our home there. The story you are telling yourself right now isn't the only option. Choose a truer, calmer narrative today, and let that guide your next step."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate network delay and AI processing
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(userMsg.content),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* Header */}
      <header className="pt-12 pb-4 px-6 bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Identity Coach
          </h1>
          <p className="text-xs font-medium text-muted-foreground mt-1">Shift your perspective.</p>
        </div>
        <button 
          onClick={clearChat}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-secondary text-muted-foreground border border-border"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user" 
                    ? "bg-primary text-white rounded-tr-sm shadow-md" 
                    : "bg-white text-foreground border border-border/50 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 bg-secondary text-muted-foreground border border-border">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border/50 rounded-tl-sm shadow-sm flex gap-1 items-center h-[52px]">
                  <motion.div className="w-1.5 h-1.5 bg-primary/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                  <motion.div className="w-1.5 h-1.5 bg-primary/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-1.5 h-1.5 bg-primary/80 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-border/50 fixed bottom-[72px] w-full max-w-md">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you struggling with?"
            className="w-full bg-secondary/50 border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-[46px] flex items-center"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}