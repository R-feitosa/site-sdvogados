import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="px-4 py-8 lg:py-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src="https://www.youtube.com/embed/GCKD_hfs6qM"
            title="Rfeitosa Advogados"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
