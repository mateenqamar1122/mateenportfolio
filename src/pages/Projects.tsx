import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const projects = [
  {
    id: 1,
    title: "HoloPakistan",
    category: "Marketplace / Platform",
    description:
      "World's first negative bidding platform for rides & rooms. Set what you want to pay for a ride or a stay, and let captains and hosts bid down to your offer.",
    tech: ["React", "Web Platform", "UI/UX"],
    link: "https://holopakistan.com",
    featured: true,
  },
  {
    id: 2,
    title: "Noodost",
    category: "E-Commerce",
    description:
      "Premium noodles for tiny adventurers and family-sized appetites. Three flavor worlds, real ingredients, zero boring bits.",
    tech: ["E-Commerce", "Web Development", "UI/UX"],
    link: "https://noodost.com",
    featured: true,
  },
  {
    id: 3,
    title: "Spikelance",
    category: "Full Stack SaaS",
    description:
      "A full stack product for Agency and business owners to manage projects, clients, team collaborations, payments and much more — all in one platform.",
    tech: ["React", "Node.js", "Supabase", "Stripe"],
    link: "https://spikelance.vercel.app",
    featured: true,
  },
  {
    id: 4,
    title: "TeamFlow",
    category: "Team Management",
    description:
      "Full stack team and workload management web app with real-time collaboration, task boards, and analytics dashboards.",
    tech: ["React", "Supabase", "Tailwind CSS"],
    link: "https://teamflow-advanced.vercel.app/",
    featured: false,
  },
  {
    id: 5,
    title: "Gloventra",
    category: "E-Commerce",
    description:
      "Full stack ecommerce platform with authentication, admin dashboard, seller/buyer roles, course sections and many other functionalities.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://gloventra-silk.vercel.app/",
    featured: true,
  },
  {
    id: 6,
    title: "VirtueWear",
    category: "AI / E-Commerce",
    description:
      "An AR try-on ecommerce platform where users can test products on their image before deciding to add to cart.",
    tech: ["React", "Python", "TensorFlow", "Tailwind CSS"],
    link: "https://tryonshop.vercel.app/",
    featured: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const Projects = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <section className="px-6 md:px-12 lg:px-20 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h1 className="heading-section mb-4">projects</h1>
          <p className="text-body max-w-lg">
            A collection of products and experiments that reflect my approach to building meaningful digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ y: -4 }}
              className={`group relative block rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)] hover:border-primary/40 ${
                project.featured
                  ? "accent-card md:col-span-2"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-xs font-mono tracking-wider uppercase ${
                    project.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {project.category}
                </span>
                <ArrowUpRight
                  size={18}
                  className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    project.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                />
              </div>

              <h2
                className={`text-2xl md:text-3xl font-bold mb-3 ${
                  project.featured ? "text-primary-foreground" : "text-foreground"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h2>

              <p
                className={`text-sm leading-relaxed mb-6 max-w-xl ${
                  project.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-mono px-3 py-1 rounded-full border ${
                      project.featured
                        ? "border-primary-foreground/20 text-primary-foreground/80"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default Projects;
