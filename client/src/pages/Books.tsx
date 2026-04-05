import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, List, Volume2, SquarePlay, Pause } from "lucide-react";
import bookData from "../lib/book.json";
import { useSpeech } from "../hooks/use-speech";

// Extended mock library
const LIBRARY = [
  { id: "union", title: "Living From Union", author: "Nicholas Buonaugurio", type: "Contemporary" },
  { id: "lawrence", title: "The Practice of the Presence of God", author: "Brother Lawrence", type: "Classic Mysticism" },
  { id: "avila", title: "The Interior Castle", author: "Teresa of Avila", type: "Classic Mysticism" },
  { id: "john", title: "Dark Night of the Soul", author: "St. John of the Cross", type: "Classic Mysticism" },
  { id: "guyon", title: "Experiencing the Depths of Jesus Christ", author: "Jeanne Guyon", type: "Classic Mysticism" },
  { id: "julian", title: "Revelations of Divine Love", author: "Julian of Norwich", type: "Classic Mysticism" },
  { id: "eckhart", title: "The Works of Meister Eckhart", author: "Meister Eckhart", type: "Classic Mysticism" },
  { id: "cloud", title: "The Cloud of Unknowing", author: "Anonymous", type: "Classic Mysticism" },
  { id: "kempis", title: "The Imitation of Christ", author: "Thomas à Kempis", type: "Classic Mysticism" },
  { id: "augustine", title: "Confessions", author: "St. Augustine", type: "Classic Mysticism" },
  { id: "pilgrim", title: "The Way of a Pilgrim", author: "Anonymous", type: "Classic Mysticism" },
  { id: "carmel", title: "The Ascent of Mount Carmel", author: "St. John of the Cross", type: "Classic Mysticism" },
  { id: "canticle", title: "Spiritual Canticle", author: "St. John of the Cross", type: "Classic Mysticism" },
  { id: "dialogue", title: "The Dialogue", author: "St. Catherine of Siena", type: "Classic Mysticism" },
  { id: "privy", title: "The Book of Privy Counseling", author: "Anonymous", type: "Classic Mysticism" },
  { id: "caussade", title: "Abandonment to Divine Providence", author: "Jean-Pierre de Caussade", type: "Classic Mysticism" },
  { id: "francis", title: "Introduction to the Devout Life", author: "St. Francis de Sales", type: "Classic Mysticism" },
];

export default function Books() {
  const [selectedBook, setSelectedBook] = useState(LIBRARY[0]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);
  const [showToc, setShowToc] = useState(true);
  const [showLibrary, setShowLibrary] = useState(true);
  
  const currentParagraphs = currentChapterIndex !== null ? bookData[currentChapterIndex].paragraphs : [];
  
  // Audio Reader State via Custom Hook
  const { isReading, currentChunkIndex, playPause, stop } = useSpeech(currentParagraphs);
  const [readerVisible, setReaderVisible] = useState(false);

  useEffect(() => {
    if (isReading) {
      setReaderVisible(true);
    }
  }, [isReading]);

  // Clean up speech when navigating away from the current chapter
  useEffect(() => {
    return () => {
      stop();
    };
  }, [currentChapterIndex, showToc, showLibrary]);

  const goToChapter = (index: number) => {
    stop();
    setReaderVisible(false);
    setCurrentChapterIndex(index);
    setShowToc(false);
    setShowLibrary(false);
    window.scrollTo(0, 0);
  };

  const nextChapter = () => {
    if (currentChapterIndex !== null && currentChapterIndex < bookData.length - 1) {
      goToChapter(currentChapterIndex + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex !== null && currentChapterIndex > 0) {
      goToChapter(currentChapterIndex - 1);
    }
  };

  const toggleReader = () => {
    if (!readerVisible) {
      setReaderVisible(true);
      playPause();
    } else {
      stop();
      setReaderVisible(false);
    }
  };

  // If showing the main library selection
  if (showLibrary) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pb-24">
        <header className="pt-12 pb-6 px-6 relative">
          <h1 className="text-3xl font-serif text-foreground mb-2">Mystic Library</h1>
          <p className="text-sm text-muted-foreground font-light">Explore the depths of contemplative Christian thought.</p>
        </header>

        <main className="px-6 space-y-4">
          {LIBRARY.map((book) => (
            <button
              key={book.id}
              onClick={() => {
                setSelectedBook(book);
                setShowLibrary(false);
                setShowToc(true);
              }}
              className="w-full text-left bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:border-primary/40 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                {book.type}
              </span>
              <h3 className="font-serif text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                By {book.author}
              </p>
            </button>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 relative">
      {/* Header */}
      <header className="pt-12 pb-4 px-6 bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (showToc) {
                setShowLibrary(true);
              } else {
                stop();
                setShowToc(true);
              }
            }}
            className="p-2 -ml-2 rounded-full hover:bg-secondary text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-serif text-foreground truncate max-w-[200px]">
            {showToc ? selectedBook.title : `Chapter ${bookData[currentChapterIndex!].id}`}
          </h1>
        </div>
        {!showToc && (
          <div className="flex items-center gap-1">
            <button 
              onClick={toggleReader}
              className={`p-2 rounded-full transition-colors ${readerVisible ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary text-foreground'}`}
            >
              {readerVisible ? <SquarePlay className="w-5 h-5 fill-current" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => {
                stop();
                setShowToc(true);
              }}
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      {/* Floating Audio Player when active */}
      <AnimatePresence>
        {readerVisible && !showToc && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-6 right-6 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg z-30 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {isReading ? (
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-white/50" />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Audio Reader</p>
                <p className="text-sm font-medium">Playing Chapter {bookData[currentChapterIndex!].id}</p>
              </div>
            </div>
            <button onClick={playPause} className="p-2 rounded-full hover:bg-white/20 transition-colors">
              {isReading ? <Pause className="w-5 h-5 fill-current" /> : <SquarePlay className="w-5 h-5 fill-current" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-6 py-6">
        <AnimatePresence mode="wait">
          {showToc ? (
            <motion.div
              key="toc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-serif text-primary mb-2">Contents</h2>
                <p className="text-sm text-muted-foreground font-light">
                  {selectedBook.author === "Nicholas Buonaugurio" 
                    ? "Explore the journey of awakening to your union with God."
                    : "For the mockup, only Living From Union content is available."}
                </p>
              </div>

              <div className="space-y-2">
                {bookData.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => goToChapter(index)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-border/50 shadow-sm hover:border-primary/30 transition-colors text-left"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
                        Chapter {chapter.id}
                      </span>
                      <span className="text-foreground font-serif">
                        {chapter.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chapter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`space-y-6 ${readerVisible ? 'pt-20' : ''}`}
            >
              <div className="mb-10 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2 block">
                  Chapter {bookData[currentChapterIndex!].id}
                </span>
                <div className="w-12 h-px bg-primary/30 mx-auto my-4" />
              </div>

              <div className="prose prose-stone text-foreground/85 leading-loose text-base font-serif">
                {bookData[currentChapterIndex!].paragraphs.map((p, i) => (
                  <p 
                    key={i} 
                    className={`mb-6 transition-colors duration-500 rounded-lg ${readerVisible && currentChunkIndex === i ? 'text-primary bg-primary/10 p-2 -mx-2' : ''}`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Navigation controls at bottom */}
              <div className="flex items-center justify-between pt-8 mt-12 border-t border-border/50">
                <button
                  onClick={prevChapter}
                  disabled={currentChapterIndex === 0}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    currentChapterIndex === 0 ? 'text-muted-foreground/50 cursor-not-allowed' : 'text-primary hover:text-primary/80'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                
                <button
                  onClick={nextChapter}
                  disabled={currentChapterIndex === bookData.length - 1}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    currentChapterIndex === bookData.length - 1 ? 'text-muted-foreground/50 cursor-not-allowed' : 'text-primary hover:text-primary/80'
                  }`}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}