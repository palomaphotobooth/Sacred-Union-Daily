import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, BookOpen, Volume2, SquarePlay, Pause } from "lucide-react";
import { useSpeech } from "../hooks/use-speech";

// Mock data for Strong's Concordance
const strongsData = {
  "abide": {
    word: "abide",
    strongs: "G3306",
    greek: "μένω",
    transliteration: "menō",
    pronunciation: "men'-o",
    definition: "to stay, abide, remain. In reference to state or condition: to remain as one, not to become another or different.",
    usage: "To remain in union, dwelling in continuous communion."
  },
  "love": {
    word: "love",
    strongs: "G26",
    greek: "ἀγάπη",
    transliteration: "agapē",
    pronunciation: "ag-ah'-pay",
    definition: "affection, good will, love, benevolence. The divine nature of God.",
    usage: "Unconditional, self-giving love. The very essence of the Trinity."
  },
  "Spirit": {
    word: "Spirit",
    strongs: "G4151",
    greek: "πνεῦμα",
    transliteration: "pneuma",
    pronunciation: "pnyoo'-mah",
    definition: "a movement of air (a gentle blast), the wind, hence the wind itself or breath.",
    usage: "The Holy Spirit, the third person of the Trinity, the breath of God within."
  },
  "truth": {
    word: "truth",
    strongs: "G225",
    greek: "ἀλήθεια",
    transliteration: "alētheia",
    pronunciation: "al-ay'-thi-a",
    definition: "objectively, what is true in any matter under consideration. In reality, in fact, certainly.",
    usage: "The reality of our union with Christ, unhidden and unveiled."
  }
};

const BIBLE_VERSIONS = ["ESV", "KJV", "NKJV", "NIV", "AMP", "NASB", "NLT", "MSG", "TPT"];
const BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// Text chunks for the reader
const bibleChunks = [
  "If you love me, you will keep my commandments.",
  "And I will ask the Father, and he will give you another Helper, to be with you forever,",
  "even the Spirit of truth, whom the world cannot receive, because it neither sees him nor knows him. You know him, for he dwells with you and will be in you.",
  "I will not leave you as orphans; I will come to you.",
  "Yet a little while and the world will see me no more, but you will see me. Because I live, you also will live.",
  "In that day you will know that I am in my Father, and you in me, and I in you.",
  "Abide in me, and I in you. As the branch cannot bear fruit by itself, unless it abides in the vine, neither can you, unless you abide in me."
];

export default function Bible() {
  const [selectedWord, setSelectedWord] = useState<keyof typeof strongsData | null>(null);
  const [version, setVersion] = useState("ESV");
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState(14);
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [showVersionSelector, setShowVersionSelector] = useState(false);
  
  // Audio Reader State via Custom Hook
  const { isReading, currentChunkIndex, playPause, stop } = useSpeech(bibleChunks);
  const [readerVisible, setReaderVisible] = useState(false);

  useEffect(() => {
    if (isReading) {
      setReaderVisible(true);
    }
  }, [isReading]);

  const toggleReader = () => {
    if (!readerVisible) {
      setReaderVisible(true);
      playPause();
    } else {
      stop();
      setReaderVisible(false);
    }
  };

  const renderVerse = () => {
    return (
      <div className={`text-lg font-serif leading-loose text-foreground/90 pb-20 ${readerVisible ? 'pt-16' : ''}`}>
        <h2 className="text-3xl font-serif text-primary mb-6 text-center">{book} {chapter}</h2>
        
        <p className={`transition-colors duration-500 rounded-lg ${readerVisible && currentChunkIndex === 0 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">15</span>
          "If you <Word highlight="love" /> me, you will keep my commandments. 
        </p>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 1 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">16</span>
          And I will ask the Father, and he will give you another Helper, to be with you forever,
        </p>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 2 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">17</span>
          even the <Word highlight="Spirit" /> of <Word highlight="truth" />, whom the world cannot receive, because it neither sees him nor knows him. You know him, for he dwells with you and will be in you."
        </p>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 3 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">18</span>
          "I will not leave you as orphans; I will come to you.
        </p>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 4 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">19</span>
          Yet a little while and the world will see me no more, but you will see me. Because I live, you also will live.
        </p>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 5 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">20</span>
          In that day you will know that I am in my Father, and you in me, and I in you."
        </p>
        
        <h2 className="text-3xl font-serif text-primary mt-10 mb-6 text-center">{book} {chapter + 1 <= 50 ? chapter + 1 : 1}</h2>
        
        <p className={`transition-colors duration-500 rounded-lg mt-4 ${readerVisible && currentChunkIndex === 6 ? 'bg-primary/10 p-2 -mx-2 text-primary' : ''}`}>
          <span className="font-sans text-xs font-bold mr-3 inline-block -translate-y-1">4</span>
          "<Word highlight="abide" /> in me, and I in you. As the branch cannot bear fruit by itself, unless it abides in the vine, neither can you, unless you abide in me."
        </p>
      </div>
    );
  };

  const Word = ({ highlight }: { highlight: keyof typeof strongsData }) => (
    <span 
      onClick={() => setSelectedWord(highlight)}
      className="inline-block relative cursor-pointer group font-bold border-b border-current border-dashed hover:opacity-70 transition-opacity"
    >
      {highlight}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col h-full relative">
      {/* Header */}
      <header className="pt-12 pb-4 px-4 bg-white/90 backdrop-blur-xl border-b border-border/50 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          {/* Book / Chapter Selector */}
          <button 
            onClick={() => {
              setShowBookSelector(!showBookSelector);
              setShowVersionSelector(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary transition-colors"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <h1 className="text-lg font-serif">{book} {chapter}</h1>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showBookSelector ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex items-center gap-2">
            {/* Audio Reader Toggle */}
            <button 
              onClick={toggleReader}
              className={`p-2.5 rounded-full transition-colors ${readerVisible ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary text-foreground'}`}
            >
              {readerVisible ? <SquarePlay className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Version Selector */}
            <button 
              onClick={() => {
                setShowVersionSelector(!showVersionSelector);
                setShowBookSelector(false);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors"
            >
              {version}
              <ChevronDown className={`w-3 h-3 transition-transform ${showVersionSelector ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Audio Player when active */}
      <AnimatePresence>
        {readerVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-6 right-6 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg z-10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {isReading ? (
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-white/50" />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Audio Bible</p>
                <p className="text-sm font-medium">Reading {book} {chapter} ({version})</p>
              </div>
            </div>
            <button onClick={playPause} className="p-2 rounded-full hover:bg-white/20 transition-colors">
              {isReading ? <Pause className="w-5 h-5 fill-current" /> : <SquarePlay className="w-5 h-5 fill-current" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book & Chapter Dropdown */}
      <AnimatePresence>
        {showBookSelector && (
          <motion.div key="book-selector" className="absolute inset-0 z-30 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookSelector(false)}
              className="fixed inset-0 top-[88px] bg-black/10 backdrop-blur-[2px] pointer-events-auto"
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-[88px] left-4 right-4 bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden flex h-[60vh] pointer-events-auto"
            >
              <div className="w-2/3 border-r border-border/50 overflow-y-auto">
                {BOOKS.map(b => (
                  <button 
                    key={b}
                    onClick={() => setBook(b)}
                    className={`w-full text-left px-6 py-4 text-sm font-serif ${book === b ? 'bg-primary/5 text-primary font-bold border-l-4 border-primary' : 'hover:bg-secondary/50'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <div className="w-1/3 bg-secondary/20 overflow-y-auto grid grid-cols-2 content-start p-2 gap-2">
                {Array.from({length: 50}, (_, i) => i + 1).map(c => (
                  <button
                    key={c}
                    onClick={() => { setChapter(c); setShowBookSelector(false); }}
                    className={`py-3 text-center rounded-xl text-sm font-medium ${chapter === c ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-white hover:shadow-sm border border-transparent'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Version Dropdown */}
      <AnimatePresence>
        {showVersionSelector && (
          <motion.div key="version-selector" className="absolute inset-0 z-30 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVersionSelector(false)}
              className="fixed inset-0 top-[88px] bg-black/10 backdrop-blur-[2px] pointer-events-auto"
            />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-[88px] right-4 w-48 bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden py-2 pointer-events-auto"
            >
              <div className="px-4 py-2 border-b border-border/50 mb-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Translation</span>
              </div>
              {BIBLE_VERSIONS.map(v => (
                <button 
                  key={v}
                  onClick={() => { setVersion(v); setShowVersionSelector(false); }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between ${version === v ? 'text-primary bg-primary/5' : 'hover:bg-secondary/50'}`}
                >
                  {v}
                  {version === v && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bible Text */}
      <main className="flex-1 p-6 overflow-y-auto relative z-0">
        {renderVerse()}
      </main>

      {/* Strong's Modal / Bottom Sheet */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div key="strongs-modal" className="absolute inset-0 z-40 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWord(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-8 pb-24 pointer-events-auto"
            >
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-8" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-serif text-primary">{strongsData[selectedWord].greek}</h2>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {strongsData[selectedWord].strongs}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground uppercase tracking-widest">
                    {strongsData[selectedWord].transliteration} <span className="text-muted-foreground lowercase normal-case tracking-normal font-medium">({strongsData[selectedWord].pronunciation})</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Definition
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-base">
                    {strongsData[selectedWord].definition}
                  </p>
                </div>
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Trinitarian Context</h3>
                  <p className="text-primary/90 leading-relaxed text-base italic font-serif">
                    "{strongsData[selectedWord].usage}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}