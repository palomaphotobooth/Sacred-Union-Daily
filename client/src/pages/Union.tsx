import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Heart, Circle, ArrowRight } from "lucide-react";
import unionWavesBg from "../assets/images/union-waves.png";

export default function Union() {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  
  const visualizations = [
    {
      title: "The Wave and the Ocean",
      description: "Imagine a wave rising from the ocean. The wave has its own unique shape, expression, and movement. Yet, at no point is the wave ever separate from the ocean itself. It is made of the ocean. It moves by the power of the ocean. When the wave crashes, it simply returns to the stillness of the deep. You are the wave; God is the ocean. Your unique expression of life is never separated from its Source.",
      icon: <Waves className="w-8 h-8 text-primary" />
    },
    {
      title: "The Ray and the Sun",
      description: "A ray of sunlight stretches across the void of space to touch the earth. The ray can be seen and felt, but it cannot be severed from the sun. If you sever the ray from its source, it ceases to exist. In the same way, your life is a ray of divine light. You are an extension of the Father's love, radiating His presence into the world, eternally connected to the Source.",
      icon: <Circle className="w-8 h-8 text-primary" />
    },
    {
      title: "The Branch and the Vine",
      description: "Look at a branch on a vine. Where does the vine end and the branch begin? There is no separation. The very same life-sap that flows through the roots flows directly into the branches to produce fruit. Christ is the vine; you are the branch. His life is your life. His peace is your peace. You don't have to strive to produce fruit; you only have to abide.",
      icon: <Heart className="w-8 h-8 text-primary" />
    }
  ];

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

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <header className="pt-12 pb-6 px-6 relative">
        <h1 className="text-3xl font-serif text-foreground mb-2">Visualizing Union</h1>
        <p className="text-sm text-muted-foreground font-light">Contemplate your unbroken connection to the Source of all life.</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Active Visualization */}
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel rounded-3xl p-6 relative overflow-hidden"
        >
          {/* Background subtle image */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <img src={unionWavesBg} alt="" className="w-full h-full object-cover mix-blend-multiply" />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              {visualizations[step].icon}
            </div>
            <h2 className="text-2xl font-serif mb-4 text-foreground">{visualizations[step].title}</h2>
            <p className="text-foreground/80 leading-relaxed text-sm mb-8">
              {visualizations[step].description}
            </p>

            <div className="flex items-center justify-between">
              {timer !== null ? (
                <div className="flex items-center gap-4 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-primary font-medium">{formatTime(timer)}</span>
                  <button 
                    onClick={() => setTimer(null)}
                    className="text-xs text-muted-foreground hover:text-foreground ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setTimer(120)} // 2 minutes
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  Start 2 Min Timer
                </button>
              )}

              <button 
                onClick={() => setStep((prev) => (prev + 1) % visualizations.length)}
                className="p-2.5 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Practice the Presence Reminder Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mt-8">
          <h3 className="font-serif text-lg mb-2">Practice The Presence</h3>
          <p className="text-sm text-muted-foreground mb-6">Set random gentle reminders throughout your day to pause and acknowledge God's indwelling presence.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm font-medium">Frequency</span>
              <select className="bg-transparent text-primary text-sm font-medium focus:outline-none cursor-pointer">
                <option>Every 2 hours</option>
                <option>3 times a day</option>
                <option>Hourly</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm font-medium">Sound</span>
              <select className="bg-transparent text-primary text-sm font-medium focus:outline-none cursor-pointer">
                <option>Soft Chime</option>
                <option>Singing Bowl</option>
                <option>Silent Vibrate</option>
              </select>
            </div>
            
            <button className="w-full mt-4 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
              Enable Reminders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}