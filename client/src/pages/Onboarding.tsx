import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import bookCover from "@assets/file_00000000402071fdb7facc8cf83a00fd_1775315411196.png";

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Living From Union",
      content: "Welcome. You are about to shift how you experience God, yourself, and the world. God is not distant—the Father, Son, and Spirit have already made their home in you.",
    },
    {
      title: "Stop Trying to Arrive",
      content: "This isn't about striving to reach God. It's about awakening to the reality of His grace and the finished work of Christ. You are fully known, fully loved, and fully included right now.",
    },
    {
      title: "Reclaim Your Identity",
      content: "Access your daily readings, contemplative library, and your personal AI Coach to help you shift out of fear and lack, and live from a place of certainty, alignment, and power.",
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-end p-6 bg-black text-white overflow-hidden">
      {/* Background Image - The Book Cover */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{ backgroundImage: `url(${bookCover})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-black/20" />

      {/* Content */}
      <div className="relative z-20 mb-12">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-serif leading-tight text-[#fdeeb7] drop-shadow-md">{steps[step].title}</h1>
          <p className="text-lg text-white/90 font-light leading-relaxed">
            {steps[step].content}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-[#fdeeb7]" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-[#fdeeb7] flex items-center justify-center text-black shadow-[0_0_20px_rgba(253,238,183,0.4)] hover:scale-105 transition-transform"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}