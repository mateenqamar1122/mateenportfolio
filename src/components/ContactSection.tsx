import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Award, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from "./Icons";
import AnimatedSection from "./AnimatedSection";
import { ContactModal } from "./ContactModal";

const timeline = [
  {
    year: "Mid 2025",
    title: "Lead Full Stack Developer",
    org: "Freelance & Agency Projects",
    desc: "Leading end-to-end development of scalable SaaS platforms and enterprise solutions for global clients.",
    icon: Rocket,
    active: true,
  },
  {
    year: "Early 2025",
    title: "Full Stack Web Developer",
    org: "Remote Projects",
    desc: "Built AI-powered web apps, marketplace platforms, and team management tools with modern tech stacks.",
    icon: Briefcase,
    active: false,
  },
  {
    year: "Mid 2024",
    title: "Frontend & Backend Developer",
    org: "Freelance",
    desc: "Developed e-commerce solutions, dashboards, and RESTful APIs with React, Node.js, and databases.",
    icon: Award,
    active: false,
  },
  {
    year: "Early 2024",
    title: "Started Professional Development",
    org: "Self-taught & Projects",
    desc: "Began professional journey building modern React applications and diving deep into full stack technologies.",
    icon: GraduationCap,
    active: false,
  },
];

const services = [
  { title: "Web Applications", desc: "Full stack apps with React, Node & databases" },
  { title: "E-Commerce", desc: "Custom stores with payments & admin panels" },
  { title: "SaaS Products", desc: "Scalable platforms with auth & dashboards" },
  { title: "API Development", desc: "RESTful & real-time backend services" },
];

const socials = [
  { icon: Github, href: "https://github.com/mateenqamar1122", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mateenqamar", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter" },
];

const ExperienceSection = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <p className="text-body text-xs uppercase tracking-[0.3em] mb-4">My Journey</p>
            <h2 className="heading-section">experience</h2>
          </div>
          <p className="text-body max-w-sm md:text-right">
            A timeline of growth, learning, and building products that make a difference.
          </p>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto mb-24">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    item.active
                      ? "bg-primary border-primary"
                      : "bg-secondary border-border"
                  }`}
                >
                  <item.icon size={18} className={item.active ? "text-primary-foreground" : "text-muted-foreground"} />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <span className="text-primary text-xs font-mono font-bold tracking-wider">{item.year}</span>
                <h4 className="text-foreground font-semibold text-lg mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.title}
                </h4>
                <p className="text-primary/70 text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.org}
                </p>
                <p className="text-body text-sm">{item.desc}</p>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <AnimatedSection delay={0.2} className="mb-24">
        <h3 className="text-foreground text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
          What I Build
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
             <motion.div
               key={service.title}
               initial={{ opacity: 0, y: 12 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
               style={{ willChange: "transform, opacity" }}
              whileHover={{ y: -6, borderColor: "hsl(72 80% 62%)" }}
              className="border border-border rounded-2xl p-6 group cursor-default transition-colors duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-primary mb-4 group-hover:scale-150 transition-transform duration-300" />
              <h4 className="text-foreground font-semibold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                {service.title}
              </h4>
              <p className="text-body text-xs">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA + Socials */}
      <AnimatedSection delay={0.3}>
        <div className="accent-card rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-primary-foreground text-3xl md:text-4xl font-black italic mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Let's Work Together
            </h3>
            <p className="text-primary-foreground/70 text-sm max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
              Open for freelance projects, collaborations, and full-time opportunities. Let's build something remarkable.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ContactModal>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary-foreground text-primary font-semibold text-sm flex items-center gap-2 transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Get In Touch <ArrowUpRight size={16} />
              </motion.button>
            </ContactModal>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="social-icon !w-9 !h-9"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer nav */}
      <AnimatedSection delay={0.4} className="mt-12">
        <div className="flex flex-col items-center gap-6">
          <nav className="flex gap-8 md:gap-12">
            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="nav-link text-xs md:text-sm">About</a>
            <a href="#works" onClick={(e) => handleScroll(e, 'works')} className="nav-link text-xs md:text-sm">Works</a>
            <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="nav-link text-xs md:text-sm">Skills</a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-link text-xs md:text-sm">Contact</a>
          </nav>
        </div>
      </AnimatedSection>

      {/* Big text */}
      <AnimatedSection delay={0.5} className="mt-8 overflow-hidden">
        <h2 className="heading-massive text-center !text-[8rem] md:!text-[14rem] opacity-40">
          Live To Code
        </h2>
      </AnimatedSection>
    </section>
  );
};

export default ExperienceSection;
