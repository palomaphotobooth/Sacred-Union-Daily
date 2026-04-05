import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Bell, Heart, Wind, Feather, BookOpen, Waves, Library, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import presenceIcon from "../assets/images/presence-icon.png";
import devotionalsData from "../lib/devotionals.json";
import { dailyContent } from "../lib/daily-content";
import { dailyReadings } from "../lib/daily-readings";

export default function Home() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [timer, setTimer] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Set the initial day based on the current day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setCurrentDay((dayOfYear % 365) || 365);
  }, []);

  // Simple timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timer === 0) {
      setTimer(null);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevDay = () => {
    setDirection(-1);
    setCurrentDay(prev => prev > 1 ? prev - 1 : 365);
  };

  const handleNextDay = () => {
    setDirection(1);
    setCurrentDay(prev => prev < 365 ? prev + 1 : 1);
  };

  const devotional = devotionalsData[(currentDay - 1) % devotionalsData.length] || devotionalsData[0];
  
  // Use the current day to select a consistent daily content piece
  // We use modulo to wrap around if currentDay > array.length
  const dailyExtra = dailyContent[(currentDay - 1) % dailyContent.length];
  const dailyReading = dailyReadings[(currentDay - 1) % dailyReadings.length];

  const quickLinks = [
    { name: "Word", desc: "Read the Bible", icon: <BookOpen className="w-6 h-6 text-primary" />, href: "/bible" },
    { name: "Books", desc: "Mystic Library", icon: <Library className="w-6 h-6 text-primary" />, href: "/books" },
    { name: "Union", desc: "Visualizations", icon: <Waves className="w-6 h-6 text-primary" />, href: "/union" },
    { name: "Church", desc: "Find Community", icon: <MapPin className="w-6 h-6 text-primary" />, href: "/church" },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <header className="pt-12 pb-6 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-foreground">Good Morning</h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">Peace be with you today.</p>
          </div>
          <button 
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`p-3 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}
          >
            <Bell className="w-5 h-5" />
            {notificationsEnabled && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </header>

      <main className="px-6 space-y-10">
        
        {/* Today's Focus */}
        <section className="bg-primary text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10">
              <img src={presenceIcon} alt="" className="w-full h-full object-cover invert" />
           </div>
           <div className="relative z-10">
             <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80 flex items-center gap-2">
               <Wind className="w-3 h-3" />
               Today's Focus
             </p>
             <h2 className="text-2xl font-serif leading-tight">
               {dailyExtra.focus}
             </h2>
           </div>
        </section>

        {/* Table of Contents Teaser */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link, i) => (
              <Link key={link.name} href={link.href}>
                <a className={`flex flex-col justify-center p-4 rounded-2xl border border-border/50 bg-white shadow-sm hover:border-primary/30 transition-all ${i === 4 ? 'col-span-2 flex-row justify-start items-center gap-4' : ''}`}>
                  <div className="bg-primary/5 w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-primary/10">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-foreground">{link.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">{link.desc}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* Devotional Section */}
        <section className="border-t border-border/50 pt-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handlePrevDay}
              className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-0.5">DAY {devotional.day}</p>
              <h2 className="text-xl font-serif text-foreground truncate max-w-[220px]">
                {devotional.title.split(': ')[1] || 'Living From Union'}
              </h2>
            </div>

            <button 
              onClick={handleNextDay}
              className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Daily Content (Animates left/right when day changes) */}
          <div className="relative min-h-[600px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={currentDay}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="space-y-8 absolute w-full top-0 left-0"
              >
                {/* Daily Verse */}
                <div className="glass-panel p-6 rounded-3xl relative overflow-hidden bg-white/80">
                  <div className="absolute -right-8 -top-8 w-32 h-32 opacity-20">
                    <img src={presenceIcon} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="relative z-10">
                    <Feather className="w-6 h-6 text-primary mb-4" />
                    <blockquote className="text-xl font-serif leading-snug text-foreground mb-4">
                      "{dailyExtra.text}"
                    </blockquote>
                    <cite className="text-sm font-medium text-muted-foreground">— {dailyExtra.verse}</cite>
                  </div>
                </div>

                {/* Daily Devotional Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-serif flex items-center gap-2 text-foreground">
                    <Heart className="w-5 h-5 text-primary" />
                    {dailyReading.title}
                  </h3>
                  <div className="prose prose-stone text-foreground/85 leading-relaxed text-sm whitespace-pre-wrap font-serif">
                    {dailyReading.reading}
                  </div>
                  <p className="text-sm font-medium text-primary mt-3 font-serif border-l-2 border-primary/30 pl-3">
                    {dailyReading.question}
                  </p>
                </div>

                {/* Contemplation Exercise */}
                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                  <h3 className="text-lg font-serif flex items-center gap-2 mb-3">
                    <Wind className="w-5 h-5 text-primary" />
                    Today's Contemplation
                  </h3>
                  <p className="text-sm text-foreground/80 italic mb-2 font-serif">
                    {dailyExtra.reflection}
                  </p>
                  <p className="text-sm font-medium text-primary mb-4 font-serif">
                    {dailyExtra.action}
                  </p>
                  
                  {timer !== null ? (
                    <div className="flex items-center justify-between bg-white rounded-full p-2 pl-6 pr-2 shadow-sm border border-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="font-mono text-primary font-medium text-lg">{formatTime(timer)}</span>
                      </div>
                      <button 
                        onClick={() => setTimer(null)}
                        className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setTimer(120)}
                      className="w-full py-3 rounded-full bg-white text-primary font-medium text-sm shadow-sm border border-border hover:border-primary/50 transition-colors"
                    >
                      Start Timer (2:00)
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}