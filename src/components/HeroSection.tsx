import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from "./Icons";
import developerImg from "@/assets/developer-portrait.svg";
import logoIcon from "@/assets/logo-icon.svg";

const DownloadResumeButton = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    const link = document.createElement("a");
    link.href = "/Abdul_Mateen_Resume.pdf";
    link.download = "Abdul_Mateen_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const isSmall = size === "sm";

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden flex items-center gap-1.5 rounded-full border border-white/30 text-white font-medium transition-all duration-300 ${
        isSmall ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs"
      } ${downloaded ? "bg-white border-white text-primary-foreground" : "hover:bg-white hover:border-white hover:text-primary-foreground"}`}
    >
      <AnimatePresence mode="wait">
        {downloaded ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1.5"
          >
            <Check size={isSmall ? 12 : 14} /> Downloaded
          </motion.span>
        ) : (
          <motion.span
            key="download"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1.5"
          >
            <motion.span
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Download size={isSmall ? 12 : 14} />
            </motion.span>
            Resume
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const HeroSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-[100dvh] flex flex-col">
      {/* Main card area wrapper - relative for portrait positioning */}
      <div className="relative flex-1 mx-3 sm:mx-4 md:mx-8 lg:mx-10 mt-3 sm:mt-4 md:mt-8 lg:mt-10 mb-0">
        {/* Main card background */}
        <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[3rem] bg-primary overflow-hidden">
          
          {/* Background SVG */}
          <img 
            src="/hersection.svg" 
            alt="Background Pattern"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />

          {/* Faded repeated text */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-[0.07] pointer-events-none z-10">
            {[...Array(3)].map((_, i) => (
              <p
                key={i}
                className="text-[3rem] sm:text-[4rem] md:text-[9rem] lg:text-[11rem] font-black uppercase leading-[0.9] tracking-tight whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--primary-foreground))' }}
              >
                ABDUL MATEEN
              </p>
            ))}
          </div>
        </div>

        {/* Content layer - text elements */}
        <div className="relative z-20 flex flex-col h-full px-5 sm:px-6 md:px-8 lg:px-20 pt-5 md:pt-10">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[11rem] font-black uppercase leading-[0.85] tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--primary-foreground))' }}
          >
            ABDUL MATEEN
          </motion.h1>

          {/* Bottom content */}
          <div className="flex-1 flex items-end min-h-0">
            <div className="w-full flex flex-col md:flex-row items-end justify-between gap-2 md:gap-4">
              {/* Left col - visible on md+ */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="hidden md:flex flex-col gap-4 max-w-[200px] lg:max-w-[240px] pb-4"
              >
                <p className="text-xs lg:text-sm leading-relaxed text-white">
                  What makes my development unique is the combination of technical expertise and a passion for clean, scalable architecture
                </p>
                <div className="flex gap-2 items-center">
                  <a href="https://github.com/mateenqamar1122" target="_blank" rel="noopener noreferrer" className="social-icon !w-8 !h-8"><Github size={14} /></a>
                  <a href="https://linkedin.com/in/mateenqamar" target="_blank" rel="noopener noreferrer" className="social-icon !w-8 !h-8"><Linkedin size={14} /></a>
                  <a href="#" className="social-icon !w-8 !h-8"><Twitter size={14} /></a>
                  <DownloadResumeButton />
                </div>
              </motion.div>

              {/* Mobile layout: three columns */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:hidden flex items-end w-full"
              >
                {/* Left text + socials */}
                <div className="flex-1 min-w-0 pb-2 pr-2 z-20">
                  <p className="text-[9px] sm:text-[10px] leading-relaxed text-white mb-2">
                    Technical expertise with a passion for clean, scalable architecture
                  </p>
                  <div className="flex gap-1.5 items-center flex-wrap">
                    <a href="https://github.com/mateenqamar1122" target="_blank" rel="noopener noreferrer" className="social-icon !w-6 !h-6"><Github size={10} /></a>
                    <a href="https://linkedin.com/in/mateenqamar" target="_blank" rel="noopener noreferrer" className="social-icon !w-6 !h-6"><Linkedin size={10} /></a>
                    <a href="#" className="social-icon !w-6 !h-6"><Twitter size={10} /></a>
                  </div>
                  <div className="mt-1.5">
                    <DownloadResumeButton size="sm" />
                  </div>
                </div>

                {/* Spacer for image area on mobile */}
                <div className="flex-shrink-0 w-[130px] sm:w-[150px]" />

                {/* Right text */}
                <div className="flex-1 min-w-0 pb-2 pl-2 z-20">
                  <p className="text-[9px] sm:text-[10px] leading-relaxed text-right text-white">
                    Each line of code tells a story, building bridges between ideas and reality
                  </p>
                </div>
              </motion.div>

              {/* Spacer for image area on desktop */}
              <div className="hidden md:block flex-shrink-0 w-[200px] lg:w-[280px] xl:w-[350px]" />

              {/* Right col - visible on md+ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="hidden md:flex flex-col items-end gap-4 max-w-[220px] lg:max-w-[260px] pb-4"
              >
                <p className="text-xs lg:text-sm leading-relaxed text-right text-white">
                  Immerse yourself in a world where each line of code tells a story, building the bridges between ideas and digital reality
                </p>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="scroll-indicator !w-8 !h-8">
                  <ChevronDown size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Portrait image - absolutely positioned, allowed to overflow below the card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, x: '-58%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 z-20 pointer-events-none"
        >
          {/* Logo loader shown until image loads */}
          <AnimatePresence>
            {!imgLoaded && (
              <motion.div
                key="loader"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.img
                  src={logoIcon}
                  alt="Loading"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 md:w-24 md:h-24"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={developerImg}
            alt="Developer portrait"
            onLoad={() => setImgLoaded(true)}
            className={`h-[35vh] sm:h-[40vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] w-auto object-contain object-bottom transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      </div>

      {/* Bottom nav */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex-shrink-0 flex justify-center gap-6 sm:gap-8 md:gap-12 py-3 md:py-4"
      >
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="nav-link text-xs md:text-sm">About</a>
        <a href="#works" onClick={(e) => handleScroll(e, 'works')} className="nav-link text-xs md:text-sm">Works</a>
        <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="nav-link text-xs md:text-sm">Skills</a>
        <Link to="/projects" className="nav-link text-xs md:text-sm">Projects</Link>
        <Link to="/blog" className="nav-link text-xs md:text-sm">Blog</Link>
        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-link text-xs md:text-sm">Contact</a>
      </motion.nav>
    </section>
  );
};

export default HeroSection;
