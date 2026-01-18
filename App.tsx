import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Portfolio from "@/pages/Portfolio";
import Alerts from "@/pages/Alerts";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import NotFound from "@/pages/not-found";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/hooks/use-theme";
import { Badge } from "@/components/ui/badge"

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/checkout-success" component={CheckoutSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tier = searchParams.get("tier") || "Pro";

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="echo-swap-theme">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full bg-black overflow-hidden">
              <AppSidebar />
              <div className="flex flex-col flex-1 min-w-0">
                <header className="flex items-center justify-between p-4 border-b border-purple-900/20 bg-black/50 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" className="text-cyan-400 hover:bg-cyan-500/10" />
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
                      Your Tier: {tier}
                    </Badge>
                  </div>
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
