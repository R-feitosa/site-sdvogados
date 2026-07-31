import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogPostBySlug } from "@/data/blogPosts";
import logoHeader from "@/assets/logo-header.png";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Artigo não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  // Parse markdown-like content (## headings and paragraphs)
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-semibold text-primary mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Rfeitosa Advogados</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Logo-only top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 py-6 lg:py-8 px-8 lg:px-14">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="inline-flex items-center group"
          >
            <img 
              src={logoHeader} 
              alt="Rfeitosa Advogados Associados" 
              className="h-[56px] w-auto transition-all duration-300 group-hover:opacity-80"
            />
          </a>
        </div>

        {/* Hero area with bordô gradient */}
        <div className="relative overflow-hidden pt-24 lg:pt-28" style={{ background: 'linear-gradient(160deg, hsl(0 10% 5%), hsl(0 40% 10%), hsl(0 10% 6%))' }}>
          {/* Decorative light effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-48 right-[10%] w-[700px] h-[700px] rounded-full opacity-60" style={{ background: 'radial-gradient(circle, hsl(0 60% 22% / 0.5) 0%, transparent 65%)' }} />
            <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, hsl(350 50% 18% / 0.4) 0%, transparent 60%)' }} />
          </div>

          {/* Image aligned with header height */}
          <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-8 relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="py-12 px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3 block">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {/* Meta */}
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-primary/20">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Article body */}
              <article className="prose-lg">
                {renderContent(post.content)}
              </article>

              {/* Back link */}
              <div className="mt-16 pt-8 border-t border-primary/20">
                <Link
                  to="/#novidades"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:gap-3 transition-all font-medium hover:opacity-90"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar às novidades
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
