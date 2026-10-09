import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Rocket, ShieldCheck, MonitorSmartphone, CloudCog } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Startup Tech Consultation",
    desc: "From MVP planning to tech stack selection, I help startups architect scalable, future-proof foundations to accelerate time-to-market.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Launch Security Audits",
    desc: "Comprehensive security testing, vulnerability scanning, and DevSecOps integration to ensure your product is bulletproof before going live.",
  },
  {
    icon: MonitorSmartphone,
    title: "Full-Stack Development",
    desc: "End-to-end development of modern, responsive, and high-performance web applications using React, Next.js, Node.js, and scalable databases.",
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps Architecture",
    desc: "Automated CI/CD pipelines, containerization with Docker & Kubernetes, and highly available infrastructure on AWS, Azure, or GCP.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-20 py-24 relative">
      {/* Background Separator/Gradient */}
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none -z-10 clip-path-slant"></div>

      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-body)' }}>What I Do</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight uppercase" style={{ fontFamily: "var(--font-display)" }}>
              Specialized <br /><span className="text-primary">Services</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
            Delivering modern, enterprise-grade solutions tailored for the current market—from robust security to seamless cloud deployments.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, i) => (
          <AnimatedSection key={service.title} delay={i * 0.1}>
            <div className="group bg-card/60 backdrop-blur-md border border-border/60 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-card hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden h-full flex flex-col justify-between">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-primary/20 blur-[50px] rounded-full pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                  <service.icon size={28} className="text-foreground/70 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {service.desc}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
