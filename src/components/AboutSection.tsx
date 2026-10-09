import { ArrowUpRight, Shield, Layers, GitMerge, Zap, Mail } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import logoIcon from "@/assets/logo-icon.svg";

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Full-Stack Apps", value: "20+" },
  { label: "Cloud Deployments", value: "50+" },
  { label: "Uptime SLA", value: "99.9%" },
];

const philosophyCards = [
  { icon: Shield, title: "Security First", desc: "Implementing DevSecOps practices from day one" },
  { icon: Layers, title: "Scalable Architecture", desc: "Designing robust, distributed full-stack systems" },
  { icon: GitMerge, title: "Continuous Delivery", desc: "Automating pipelines for seamless deployments" },
  { icon: Zap, title: "High Performance", desc: "Optimized UIs and APIs for lightning-fast speeds" },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen px-6 md:px-12 lg:px-20 py-24">
      {/* Header row */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <AnimatedSection className="flex-1">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight uppercase" style={{ fontFamily: "var(--font-display)" }}>
            Professional<br /><span className="text-primary">Summary</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="flex-1 flex flex-col gap-6 pt-4 md:pt-6" delay={0.2}>
          <p className="text-body text-base md:text-lg max-w-xl leading-relaxed">
            I specialize in building end-to-end full-stack applications and architecting secure, scalable cloud infrastructure. By bridging the gap between development and operations, I deliver high-performance user interfaces backed by robust CI/CD pipelines and zero-downtime deployments.
          </p>
          <a href="mailto:mateenqammat@gmail.com" className="w-fit flex items-center gap-2 text-sm uppercase tracking-widest font-semibold border-b-2 border-primary pb-1 text-foreground hover:text-primary transition-colors">
            Contact Me <ArrowUpRight size={16} className="text-primary" />
          </a>
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

      {/* Contact Card + Philosophy Cards */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 mt-20">
        
        {/* Professional Contact/Availability Card */}
        <AnimatedSection className="w-full lg:w-1/3 flex flex-col" delay={0.3}>
          <div className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-8 h-full flex flex-col justify-between group hover:border-primary/40 transition-colors duration-500 relative overflow-hidden">
            {/* Subtle glow effect in the background */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Mail className="text-primary" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Let's build together</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                I'm currently open for new opportunities. Whether you need to scale your cloud infrastructure, secure your pipelines, or build a high-performance full-stack application, I'm ready to help.
              </p>
            </div>
            
            <a href="mailto:mateenqammat@gmail.com" className="relative z-10 w-full py-3.5 px-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20">
               Get In Touch <ArrowUpRight size={18} />
            </a>
          </div>
        </AnimatedSection>

        {/* Philosophy Cards */}
        <AnimatedSection className="flex-1 w-full" delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-full">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4 }}
                style={{ willChange: "transform, opacity" }}
                className="bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col justify-center group hover:bg-card/80 hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle corner glow on hover */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 blur-[40px] rounded-full pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"></div>

                <div className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  <card.icon size={20} className="text-foreground/70 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {card.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
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
                {["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "React", "Node.js"].map((tech) => (
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
