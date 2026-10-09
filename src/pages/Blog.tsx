import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogPosts";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const Blog = () => {
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
          <h1 className="heading-section mb-4">blog</h1>
          <p className="text-body max-w-lg">
            Thoughts on web development, architecture decisions, and lessons from building real products.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-0"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              whileHover={{ x: 4 }}
              className={`group cursor-pointer ${
                post.featured
                  ? "accent-card px-6 -mx-6 border-transparent"
                  : "border-t border-border"
              }`}
            >
              <Link
                to={`/blog/${post.id}`}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-8"
              >
                <div className="flex items-center gap-3 shrink-0 w-full md:w-36">
                  <span
                    className={`text-xs font-mono ${
                      post.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {post.date}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      post.featured
                        ? "border-primary-foreground/20 text-primary-foreground/70"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h2
                    className={`text-lg font-semibold mb-1 group-hover:underline underline-offset-4 ${
                      post.featured ? "text-primary-foreground" : "text-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed ${
                      post.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`flex items-center gap-1 text-xs ${
                      post.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    <Clock size={12} /> {post.readTime}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      post.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default Blog;
