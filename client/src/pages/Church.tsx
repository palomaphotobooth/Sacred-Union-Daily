import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, ExternalLink, Navigation } from "lucide-react";
import churchImage from "@assets/file_00000000612471fdb772593dee3a2fe0_1775315411240.png";

// Mock data for churches
const mockChurches = [
  {
    id: 1,
    name: "Grace Community Church",
    distance: "1.2 miles",
    address: "123 Grace Ave",
    type: "Non-Denominational",
    rating: 4.8
  },
  {
    id: 2,
    name: "Trinity Fellowship",
    distance: "2.5 miles",
    address: "456 Trinity Blvd",
    type: "Reformed",
    rating: 4.9
  },
  {
    id: 3,
    name: "Awaken Church",
    distance: "3.1 miles",
    address: "789 Awakening Way",
    type: "Charismatic",
    rating: 4.7
  },
  {
    id: 4,
    name: "Christ Church",
    distance: "4.0 miles",
    address: "101 Christ St",
    type: "Anglican",
    rating: 4.6
  }
];

export default function Church() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  const openGoogleMaps = (query: string) => {
    window.open(`https://www.google.com/maps/search/churches+near+me+${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Dynamic Header Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={churchImage} 
          alt="Christ reigning over the earth" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="text-3xl font-serif text-foreground mb-1">Find a Church</h1>
          <p className="text-sm text-muted-foreground font-medium">Gather together in His presence.</p>
        </div>
      </div>

      <main className="px-6 space-y-6 mt-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white border border-border/50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm font-medium"
            placeholder="Search by city or zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute inset-y-2 right-2 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-sm"
          >
            Find
          </button>
        </div>

        {/* Local Results Title */}
        <div className="flex items-center justify-between mt-8">
          <h2 className="text-lg font-serif">Churches Near You</h2>
          <button 
            onClick={() => openGoogleMaps(searchQuery)}
            className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1 hover:underline"
          >
            Open Maps <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            mockChurches.map((church, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={church.id}
                className="bg-white rounded-2xl p-5 border border-border/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-lg leading-tight">{church.name}</h3>
                    <span className="text-xs font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded">
                      {church.distance}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> {church.address}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded-sm">
                      {church.type}
                    </span>
                    <span className="text-[11px] font-medium flex items-center gap-1">
                      ⭐ {church.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <button 
          onClick={() => openGoogleMaps(searchQuery)}
          className="w-full py-4 mt-4 bg-secondary rounded-2xl text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
        >
          <Search className="w-4 h-4" />
          Search Google Maps
        </button>
      </main>
    </div>
  );
}