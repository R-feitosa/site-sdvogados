import { AWARDS } from "@/content/site";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";
import Tilt from "@/components/fx/Tilt";

/**
 * Certificações como "credenciais" de vidro: inclinam com o ponteiro e um brilho
 * holográfico percorre a superfície, como num selo de segurança.
 */
export default function Awards() {
  return (
    <section id="reconhecimento" className="relative overflow-hidden py-20 md:py-28" aria-label="Reconhecimento">
      {/* luzes de fundo para o vidro refratar */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(128,0,32,.55),transparent)]" />
        <div className="absolute bottom-[5%] right-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(179,18,58,.35),transparent)]" />
      </div>

      <div className="shell relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <LineReveal
            lines={["Reconhecimento", "e excelência."]}
            className="display text-[clamp(2.6rem,5.6vw,5.4rem)] font-light"
          />
          <FadeIn delay={0.1}>
            <p className="lede max-w-[42ch]">
              Nosso compromisso com a qualidade é reconhecido pelas principais instituições de avaliação.
            </p>
          </FadeIn>
        </div>

        <div role="list" className="mt-14 grid gap-5 md:grid-cols-3">
          {AWARDS.map((a, i) => (
            <FadeIn key={a.id} delay={0.08 * i} className="h-full">
              <div role="listitem" className="h-full">
                <Tilt max={10} className="glass specular group h-full overflow-hidden rounded-[28px]">
                  {/* faixa holográfica */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[3] opacity-0 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 20%, rgba(255,80,130,.35) 36%, rgba(120,200,255,.35) 46%, rgba(255,240,170,.35) 56%, transparent 72%)",
                      backgroundSize: "250% 250%",
                      backgroundPosition: "var(--gx, 50%) var(--gy, 50%)",
                    }}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="m-3 flex h-48 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#800020] to-[#561010] ring-1 ring-white/15 md:h-56">
                      <img
                        src={a.logo}
                        alt={a.title}
                        loading="lazy"
                        className={`object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-transform duration-700 group-hover:scale-[1.06] ${
                          a.wide ? "max-h-20 max-w-[78%]" : "max-h-36"
                        }`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-4 md:p-7 md:pt-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[20px] font-normal">{a.title}</h3>
                        <span className="tabular text-[13px] text-white/50">{a.year}</span>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/65">{a.text}</p>
                    </div>
                  </div>
                </Tilt>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
