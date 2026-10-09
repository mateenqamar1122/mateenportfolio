import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useState, useEffect } from "react";

const projects = [
  {
    year: "01",
    title: "HoloPakistan",
    description: "World's first negative bidding platform for rides & rooms. Set what you want to pay for a ride or a stay, and let captains and hosts bid down to your offer.",
    featured: true,
    link: "https://holopakistan.com",
  },
  {
    year: "02",
    title: "Noodost",
    description: "Premium noodles for tiny adventurers and family-sized appetites. Three flavor worlds, real ingredients, zero boring bits.",
    featured: true,
    link: "https://noodost.com",
  },
  {
    year: "03",
    title: "Spikelance",
    description: "A full stack product for the Agency and businness owners to manage their projects, clients, team collaborations, Payments and much more services in all in one platform. This product is designed for the the Freelance and service based bussiness ",
    featured: false,
    link: "https://spikelance.vercel.app",
  },
  {
    year: "04",
    title: "TeamFLow",
    description: "Build an full Stack team and workload managment web app using the React, Supabase etc ",
    featured: false,
    link: "https://teamflow-advanced.vercel.app/",
  },
  {
    year: "05",
    title: "Gloventra",
    description: "Built an full stack ecommerce Web App with proper authentication system, Admins Dashboard, Seller/Buyer Roles, courses sections and many other functionalities.",
    featured: true,
    link: "https://gloventra-silk.vercel.app/",
  },
  {
    year: "06",
    title: "VirtueWear",
    description: "An Tryon Ecommerce platofrm where user can test the product on their image and then decide to add to cart or not ",
    featured: false,
    link: "https://tryonshop.vercel.app/",
  },
];

const WorksSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="works" className="min-h-screen px-6 md:px-12 lg:px-20 py-24 relative">
      <AnimatePresence>
        {hoveredProject !== null && projects[hoveredProject]?.link && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl border border-border hidden md:block bg-background"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              width: 320,
              height: 200,
            }}
          >
            <div className="w-[1280px] h-[800px] origin-top-left scale-[0.25] pointer-events-none">
              <iframe 
                src={projects[hoveredProject].link} 
                className="w-full h-full border-0 pointer-events-none"
                tabIndex={-1}
                title={`${projects[hoveredProject].title} Preview`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedSection className="text-center mb-16">
        <h2 className="heading-section mb-6">works</h2>
        <p className="text-body max-w-md mx-auto mb-6">
          Browse through diverse projects showcasing a blend of modern tech stacks, scalable architecture, and captivating user experiences
        </p>
        <a href="#" className="discover-btn inline-flex items-center gap-2">
          View All <ArrowUpRight size={16} />
        </a>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            initial={{ opacity: 0, x: index % 2 === 0 ? -12 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-8 border-t ${
              project.featured ? "accent-card px-6 -mx-6 border-transparent" : "border-border"
            }`}
          >
            <span className={`text-sm font-mono shrink-0 w-16 ${project.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {project.year}
            </span>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-1 ${project.featured ? "text-primary-foreground" : "text-foreground"}`} style={{ fontFamily: 'var(--font-body)' }}>
                {project.title}
              </h3>
              <p className={`text-sm leading-relaxed ${project.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {project.description}
              </p>
            </div>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={`discover-btn shrink-0 ${project.featured ? "!border-primary-foreground/30 !text-primary-foreground hover:!bg-primary-foreground/10" : ""}`}>
                Discover
              </a>
            ) : (
              <button className={`discover-btn shrink-0 ${project.featured ? "!border-primary-foreground/30 !text-primary-foreground hover:!bg-primary-foreground/10" : ""}`}>
                Discover
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
