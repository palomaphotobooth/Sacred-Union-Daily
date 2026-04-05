import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileLayout } from "@/components/layout/MobileLayout";

import Home from "@/pages/Home";
import Onboarding from "@/pages/Onboarding";
import Bible from "@/pages/Bible";
import Books from "@/pages/Books";
import Union from "@/pages/Union";
import Church from "@/pages/Church";
import Coach from "@/pages/Coach";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/" component={Home} />
      <Route path="/bible" component={Bible} />
      <Route path="/books" component={Books} />
      <Route path="/union" component={Union} />
      <Route path="/church" component={Church} />
      <Route path="/coach" component={Coach} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MobileLayout>
          <Router />
        </MobileLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;