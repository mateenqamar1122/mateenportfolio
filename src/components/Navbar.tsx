import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between"
      style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}
    >
      <Link to="/" className="flex items-center gap-2 group">
        {!isHome && (
          <ArrowLeft size={16} className="text-primary transition-transform group-hover:-translate-x-1" />
        )}
        <span
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "hsl(var(--primary))" }}
        >
          AM
        </span>
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        {isHome ? (
          <>
            <a href="#about" className="nav-link text-xs md:text-sm">About</a>
            <a href="#works" className="nav-link text-xs md:text-sm">Works</a>
            <a href="#skills" className="nav-link text-xs md:text-sm">Skills</a>
            <a href="#contact" className="nav-link text-xs md:text-sm">Contact</a>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link text-xs md:text-sm">Home</Link>
            <Link to="/projects" className="nav-link text-xs md:text-sm">Projects</Link>
            <Link to="/blog" className="nav-link text-xs md:text-sm">Blog</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
