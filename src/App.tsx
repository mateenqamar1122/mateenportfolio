import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// 5 horizontal strips for a staggered wipe
const STRIPS = [0, 1, 2, 3, 4];

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {/* Staggered strips overlay */}
        <div className="fixed inset-0 z-[60] pointer-events-none flex flex-col">
          {STRIPS.map((i) => (
            <motion.div
              key={i}
              className="flex-1"
              style={{ background: "hsl(var(--primary))" }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              exit={{ scaleX: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
              // Alternate origin for a zigzag feel
              {...(i % 2 === 0
                ? { style: { background: "hsl(var(--primary))", transformOrigin: "left" } }
                : { style: { background: "hsl(var(--primary))", transformOrigin: "right" } }
              )}
            />
          ))}
        </div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
