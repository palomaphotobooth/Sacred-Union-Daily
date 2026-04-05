import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Home, Waves, Library, MapPin, Sparkles } from "lucide-react";

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Hide nav on onboarding
  if (location === "/onboarding") {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full glass-panel border-t border-border/50 px-2 py-3 flex justify-around items-center z-50">
        <NavItem href="/" icon={<Home className="w-5 h-5" />} label="Today" active={location === "/"} />
        <NavItem href="/bible" icon={<BookOpen className="w-5 h-5" />} label="Word" active={location === "/bible"} />
        <NavItem href="/books" icon={<Library className="w-5 h-5" />} label="Books" active={location === "/books"} />
        <NavItem href="/union" icon={<Waves className="w-5 h-5" />} label="Union" active={location === "/union"} />
        <NavItem href="/coach" icon={<Sparkles className="w-5 h-5" />} label="Coach" active={location === "/coach"} />
        <NavItem href="/church" icon={<MapPin className="w-5 h-5" />} label="Church" active={location === "/church"} />
      </nav>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href}>
      <a className={`flex flex-col items-center gap-1 transition-all duration-300 w-10 sm:w-12 ${active ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"}`}>
        <div className={active ? "drop-shadow-sm" : ""}>{icon}</div>
        <span className="text-[9px] font-medium tracking-wide">{label}</span>
      </a>
    </Link>
  );
}