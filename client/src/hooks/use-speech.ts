import { useState, useEffect, useRef } from 'react';

export function useSpeech(textChunks: string[]) {
  const [isReading, setIsReading] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = () => {
    if (!synth) return;
    synth.cancel();
    setIsReading(false);
    setCurrentChunkIndex(0);
  };

  const playPause = () => {
    if (!synth) return;
    
    if (isReading) {
      synth.pause();
      setIsReading(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsReading(true);
      } else {
        startReading(currentChunkIndex);
      }
    }
  };

  const startReading = (index: number) => {
    if (!synth || !textChunks || textChunks.length === 0) return;
    if (index >= textChunks.length) {
      stop();
      return;
    }
    
    synth.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(textChunks[index]);
    
    const voices = synth.getVoices();
    
    // Look for high-quality "Premium" or "Natural" voices (often female voices sound more realistic in default TTS engines)
    const premiumVoices = voices.filter(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Premium') || 
       v.name.includes('Enhanced') || 
       v.name.includes('Natural') || 
       v.name.includes('Online') || 
       v.name.includes('Google') || 
       v.name.includes('Siri') ||
       v.name.includes('Samantha') ||
       v.name.includes('Karen') ||
       v.name.includes('Moira') ||
       v.name.includes('Tessa'))
    );
    
    // Fallback to any English female voice if premium isn't found
    const femaleVoices = voices.filter(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Female') || v.name.includes('Woman') || v.name.includes('Zira'))
    );

    if (premiumVoices.length > 0) {
      utterance.voice = premiumVoices[0];
    } else if (femaleVoices.length > 0) {
      utterance.voice = femaleVoices[0];
    } else {
      // Fallback to any English voice
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      if (englishVoices.length > 0) {
        utterance.voice = englishVoices[0];
      }
    }
    
    // Soothing, conversational pace
    utterance.rate = 0.9; 
    utterance.pitch = 1.0; 
    
    utterance.onend = () => {
      if (index + 1 < textChunks.length) {
        setCurrentChunkIndex(index + 1);
        startReading(index + 1);
      } else {
        stop();
      }
    };
    
    utterance.onerror = (e) => {
      console.error('Speech error', e);
      stop();
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
    setIsReading(true);
    setCurrentChunkIndex(index);
  };

  useEffect(() => {
    if (synth) {
      synth.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        synth.getVoices();
      };
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  return {
    isReading,
    currentChunkIndex,
    playPause,
    stop,
  };
}