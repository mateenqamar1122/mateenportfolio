import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <main className="bg-background min-h-screen">
        <Navbar />
        <section className="px-6 md:px-12 lg:px-20 pt-28 pb-24 text-center">
          <h1 className="heading-section mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </section>
      </main>
    );
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      <article className="px-6 md:px-12 lg:px-20 pt-28 pb-24">
        {/* Back button */}
        <motion.button
          onClick={() => navigate("/blog")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={12} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto prose-custom"
        >
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trimStart();

            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            if (trimmed.startsWith("```")) {
              return null; // handled by code block logic below
            }

            if (trimmed.startsWith("- **")) {
              const match = trimmed.match(/- \*\*(.+?)\*\*\s*[—–-]\s*(.+)/);
              if (match) {
                return (
                  <p key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-2">
                    <span className="font-semibold text-foreground">{match[1]}</span>
                    <span className="text-muted-foreground"> — {match[2]}</span>
                  </p>
                );
              }
            }

            if (trimmed.startsWith("- ")) {
              return (
                <p key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-2">
                  • {trimmed.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "$1")}
                </p>
              );
            }

            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <p key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-2">
                  {trimmed.replace(/\*\*(.+?)\*\*/g, "$1")}
                </p>
              );
            }

            if (trimmed === "") return <div key={i} className="h-2" />;

            return (
              <p key={i} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
                {trimmed.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`(.+?)`/g, "$1")}
              </p>
            );
          })}

          {/* Render code blocks */}
          {post.content.split("```").map((block, i) => {
            if (i % 2 === 1) {
              const lines = block.split("\n");
              const lang = lines[0]?.trim() || "";
              const code = lines.slice(1).join("\n").trim();
              return (
                <div key={`code-${i}`} className="my-6 rounded-xl bg-card border border-border overflow-hidden">
                  {lang && (
                    <div className="px-4 py-2 border-b border-border">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{lang}</span>
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-xs md:text-sm font-mono text-foreground/80 leading-relaxed whitespace-pre">
                      {code}
                    </code>
                  </pre>
                </div>
              );
            }
            return null;
          })}
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto mt-20 pt-12 border-t border-border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Related Posts
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group p-5 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:bg-card"
                >
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {related.category}
                  </span>
                  <h4 className="text-sm font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </main>
  );
};

export default BlogPost;
