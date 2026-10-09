import { ArrowUpRight, Code2, Layers, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import logoIcon from "@/assets/logo-icon.svg";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Technologies", value: "15+" },
  { label: "Happy Clients", value: "10+" },
];

const philosophyCards = [
  { icon: Code2, title: "Clean Code", desc: "Writing readable, maintainable code that scales" },
  { icon: Layers, title: "Full Stack", desc: "End-to-end solutions from database to pixel" },
  { icon: Sparkles, title: "Creative UI", desc: "Crafting interfaces that delight and engage" },
  { icon: Zap, title: "Performance", desc: "Optimized builds for lightning-fast experiences" },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen px-6 md:px-12 lg:px-20 py-24">
      {/* Header row */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <AnimatedSection className="flex-1">
          <h2 className="heading-section">about</h2>
        </AnimatedSection>

        <AnimatedSection className="flex-1 flex flex-col gap-6 pt-4" delay={0.2}>
          <a href="#contact" className="discover-btn self-end flex items-center gap-2">
            Learn More <ArrowUpRight size={16} />
          </a>
          <p className="text-body max-w-md">
            Welcome to my world of digital craftsmanship. I am a passionate full-stack developer dedicated to building seamless web experiences. With a keen eye for detail and a love for elegant code.
          </p>
        </AnimatedSection>
      </div>

      {/* Stats marquee */}
      <AnimatedSection className="mt-20" delay={0.25}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="border border-border rounded-2xl p-6 md:p-8 text-center group hover:bg-primary hover:border-primary transition-all duration-500"
            >
              <p
                className="text-4xl md:text-5xl font-black text-primary group-hover:text-primary-foreground transition-colors duration-500"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </p>
              <p className="text-body mt-2 text-xs md:text-sm group-hover:text-primary-foreground/70 transition-colors duration-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Spinning logo + philosophy cards */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mt-20">
        <AnimatedSection className="flex justify-center flex-shrink-0" delay={0.3}>
          <div className="gear-circle w-64 h-64 md:w-80 md:h-80 relative">
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 400 400">
              <defs>
                <path id="circlePath" d="M200,200 m-150,0 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" />
              </defs>
              <text className="fill-primary text-sm uppercase tracking-[0.5em]" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fill: 'hsl(72, 80%, 62%)' }}>
                <textPath href="#circlePath">
                  MY STACK · MY STACK · MY STACK · MY STACK · 
                </textPath>
              </text>
            </svg>
            <img src={logoIcon} alt="Logo icon" className="w-32 md:w-44 relative z-10" />
          </div>
        </AnimatedSection>

        <AnimatedSection className="flex-1 w-full" delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -3 }}
                style={{ willChange: "transform, opacity" }}
                className="bg-card border border-border rounded-2xl p-5 md:p-6 group hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <card.icon size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {card.title}
                </h4>
                <p className="text-body text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Scrolling text band */}
      <AnimatedSection className="mt-20 overflow-hidden" delay={0.5}>
        <div className="relative py-6 border-t border-b border-border">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(2)].map((_, j) => (
              <span key={j} className="flex gap-8">
                {["React", "TypeScript", "Node.js", "Tailwind", "Next.js", "PostgreSQL", "Framer Motion", "Figma"].map((tech) => (
                  <span
                    key={`${j}-${tech}`}
                    className="text-2xl md:text-4xl font-black uppercase tracking-tight opacity-20"
                    style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--primary))' }}
                  >
                    {tech}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;
