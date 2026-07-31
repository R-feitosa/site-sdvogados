import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const VISIBLE_COUNT = 3;

export default function BlogSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE_COUNT < blogPosts.length;

  const handlePrev = useCallback(() => {
    if (!canPrev) return;
    setDirection(-1);
    setStartIndex((i) => i - 1);
  }, [canPrev]);

  const handleNext = useCallback(() => {
    if (!canNext) return;
    setDirection(1);
    setStartIndex((i) => i + 1);
  }, [canNext]);

  const visiblePosts = blogPosts.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <section id="novidades" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, hsl(0 10% 5%), hsl(0 40% 10%), hsl(0 10% 6%))' }}>
      {/* Decorative background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 right-[10%] w-[700px] h-[700px] rounded-full opacity-60" style={{ background: 'radial-gradient(circle, hsl(0 60% 22% / 0.5) 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, hsl(350 50% 18% / 0.4) 0%, transparent 60%)' }} />
        <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, hsl(20 40% 30% / 0.3) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(0 50% 30% / 0.3) 50%, transparent 90%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(0 30% 25% / 0.2) 50%, transparent 90%)' }} />
      </div>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light text-white leading-tight"
          >
            Fique por dentro das <span className="font-semibold">Novidades</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:border-white/40"
              aria-label="Notícia anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 hover:border-white/40"
              aria-label="Próxima notícia"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Blog Carousel */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            {visiblePosts.map((post) => (
              <motion.article
                key={post.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="group bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Card Image */}
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      {post.category}
                    </span>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: blogPosts.length - VISIBLE_COUNT + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > startIndex ? 1 : -1); setStartIndex(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${i === startIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Ir para página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
