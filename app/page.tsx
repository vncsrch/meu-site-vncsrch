"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bot, ChevronDown, ChevronsRight, Globe, LayoutDashboard, Workflow } from "lucide-react";

import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { WordRotate } from "@/components/ui/word-rotate";

/* ---------- EDITE AQUI: textos e contatos ---------- */
const SITE = {
  name: "VNCSRCH",
  email: "set.cabecas@gmail.com",
  whatsapp: "https://wa.me/5563992169999",
  message: "Olá! Vim pelo site VNCSRCH e quero conversar sobre um projeto.",
};

const MANIFESTO =
  "Eu transformo ideias em sites rápidos e tarefas repetitivas em automações que funcionam sozinhas, para você focar no que realmente importa.";

const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe, title: "Sites e landing pages", text: "Páginas rápidas, responsivas e pensadas para gerar contatos, do site institucional à página de vendas." },
  { icon: LayoutDashboard, title: "Sistemas e painéis", text: "Telas sob medida para controlar clientes, pedidos ou estoque, sem depender de planilhas soltas." },
  { icon: Workflow, title: "Automação de processos", text: "Relatórios, avisos, cobranças e cadastros que acontecem sozinhos, ligando as ferramentas que você já usa." },
  { icon: Bot, title: "IA aplicada ao negócio", text: "Atendimento, textos e análises com inteligência artificial, só onde ela economiza tempo de verdade." },
];

const PROJECTS = [
  { title: "Projeto de exemplo 1", text: "Landing page para [segmento do cliente], com foco em gerar contatos.", tags: ["Site", "Next.js"], cmd: "$ deploy landing --prod", mock: "landing" },
  { title: "Projeto de exemplo 2", text: "Automação de [processo] para [tipo de negócio].", tags: ["Automação", "Integrações"], cmd: "$ run automacao --watch", mock: "flow" },
  { title: "Projeto de exemplo 3", text: "Painel interno para [tipo de negócio].", tags: ["Sistema", "React"], cmd: "$ build painel --final", mock: "panel" },
  { title: "Projeto de exemplo 4", text: "Atendimento automático com IA para [tipo de negócio].", tags: ["IA", "Atendimento"], cmd: "$ start assistente --ia", mock: "chat" },
];

const STEPS = [
  { title: "Conversa inicial", text: "Entendo o seu objetivo, o público e o prazo." },
  { title: "Proposta e protótipo", text: "Você vê como vai ficar e aprova antes de eu construir." },
  { title: "Construção", text: "Desenvolvo com entregas parciais para você acompanhar." },
  { title: "Publicação e ajustes", text: "Coloco no ar, testo no celular e no computador e ajusto o que for preciso." },
];

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Inteligência artificial", "Automação de processos", "Integrações", "SEO", "Acessibilidade"];
/* --------------------------------------------------- */

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789<>/{}[]=+*#$%".split("");
const SCRAMBLE = "0123456789ABCDEF#$%&*+=<>".split("");
const rndSafe = () => SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
const rnd = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });


/* Progresso (0 a 1) de um elemento atravessando a tela durante a rolagem */
function useViewProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return [ref, p] as const;
}

/* Chuva de código: reage ao mouse/toque, ao clique e à rolagem; escurece após o início */
function MatrixRain({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0, h = 0, size = 16, raf = 0, last = 0, boost = 0;
    let lastY = window.scrollY;
    let drops: number[] = [];
    let speeds: number[] = [];
    const mouse = { x: -9999, y: -9999 };

    const tick = () => {
      ctx.fillStyle = "rgba(2, 10, 5, 0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${size}px monospace`;
      const mult = 1 + Math.min(boost, 4);
      for (let i = 0; i < drops.length; i++) {
        const x = i * size;
        const y = Math.floor(drops[i]) * size;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const near = dx * dx + dy * dy < 150 * 150;
        ctx.fillStyle = near ? "#eafff0" : "#00ff41";
        ctx.fillText(rnd(), x, y);
        drops[i] += speeds[i] * mult * (near ? 1.8 : 1);
        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20;
      }
      boost *= 0.94;
    };

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = w < 640 ? 14 : 16;
      const cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.6);
      ctx.fillStyle = "#020a05";
      ctx.fillRect(0, 0, w, h);
      if (calm) for (let n = 0; n < 150; n++) tick();
    };

    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const leave = () => { mouse.x = -9999; mouse.y = -9999; };
    const down = (e: PointerEvent) => { move(e); boost += 2.5; };
    const scroll = () => {
      boost += Math.abs(window.scrollY - lastY) / 60;
      lastY = window.scrollY;
      canvas.style.opacity = String(0.5 - 0.24 * Math.min(1, window.scrollY / (h * 0.9)));
    };
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || t - last < 40) return;
      last = t;
      tick();
    };

    let lastW = window.innerWidth, lastH = window.innerHeight;
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      if (nw === lastW && Math.abs(nh - lastH) < 150) return;
      lastW = nw; lastH = nh;
      paint();
    };

    paint();
    window.addEventListener("resize", onResize);
    if (!calm) {
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerdown", down);
      window.addEventListener("scroll", scroll, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [calm]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50" />;
}

/* Conteúdo que sobe e some suavemente conforme a página rola */
function ScrollFade({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
      el.style.opacity = String(1 - p);
      el.style.transform = `translateY(${p * 70}px) scale(${1 - p * 0.05})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

/* Texto que se "decodifica" ao entrar na tela e ao passar o mouse */
function Decode({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const el = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);
  const armed = useRef(true);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame++;
      setOut(text.split("").map((c, i) => (c === " " || i < frame / 2 ? c : rndSafe())).join(""));
      if (frame / 2 >= text.length) {
        window.clearInterval(timer.current);
        setOut(text);
      }
    }, 35);
  }, [text]);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        io.disconnect();
      }
    });
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearInterval(timer.current);
    };
  }, [run]);

  return (
    <span
      ref={el}
      onMouseEnter={() => { if (armed.current) { armed.current = false; run(); } }}
      onMouseLeave={() => { armed.current = true; }}
      className={className}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}

function Heading({ title, text }: { title: string; text: string }) {
  return (
    <BlurFade inView>
      <h2 className="text-3xl font-semibold tracking-tight text-[#e6ffec] [text-shadow:0_0_10px_#000] sm:text-4xl">
        <span aria-hidden className="mr-3 text-[#00ff41]">$</span>
        <Decode text={title} />
      </h2>
      <p className="mt-3 max-w-xl text-[#9fd3b0] [text-shadow:0_0_10px_#000,0_0_4px_#000]">{text}</p>
    </BlurFade>
  );
}

/* Frase que acende palavra por palavra enquanto você rola */
function Manifesto() {
  const [ref, p] = useViewProgress<HTMLParagraphElement>();
  const words = MANIFESTO.split(" ");
  const lit = Math.floor(Math.min(1, p * 1.25) * words.length);
  return (
    <p ref={ref} className="max-w-4xl text-balance text-2xl font-medium leading-snug sm:text-4xl">
      {words.map((word, i) => (
        <span
          key={i}
          className={`transition-colors duration-300 ${i < lit ? "text-[#e6ffec] [text-shadow:0_0_14px_rgba(0,255,65,0.5)]" : "text-[#00ff41]/25"}`}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

/* Terminal que simula uma automação rodando em tempo real, em ciclo contínuo */
const CMD = "$ automatizar relatorio-semanal";
const JOB = [
  { label: "lendo as planilhas de vendas", unit: "linhas", total: 1284 },
  { label: "consolidando os dados", unit: "registros", total: 312 },
  { label: "gerando o relatório", unit: "páginas", total: 8 },
  { label: "enviando por e-mail e WhatsApp", unit: "destinatários", total: 5 },
];
const STEP_TICKS = 30;
const HOLD_TICKS = 40;
const CYCLE = CMD.length + JOB.length * STEP_TICKS + HOLD_TICKS;
const SPIN = ["|", "/", "-", "\\"];

function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(CMD.length + JOB.length * STEP_TICKS + 5);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    let started = false;
    const tick = () => {
      if (document.hidden) return;
      setT((v) => v + 1);
      setClock(new Date().toLocaleTimeString("pt-BR"));
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(id);
        if (!entry.isIntersecting || reduce) return;
        if (!started) {
          started = true;
          setT(0);
        }
        id = window.setInterval(tick, 80);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    setClock(new Date().toLocaleTimeString("pt-BR"));
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const run = Math.floor(t / CYCLE);
  const local = t % CYCLE;
  const typing = local < CMD.length;
  const s = local - CMD.length;
  const stepIdx = typing ? -1 : Math.min(JOB.length, Math.floor(s / STEP_TICKS));
  const prog = stepIdx >= 0 && stepIdx < JOB.length ? (s % STEP_TICKS) / STEP_TICKS : 0;
  const finished = stepIdx === JOB.length;
  const totalOf = (i: number) => JOB[i].total + (i < 2 ? (run * 53) % 40 : 0);
  const elapsed = stepIdx < 0 ? 0 : Math.min(s, JOB.length * STEP_TICKS) * 0.08;

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-[#00ff41]/25 bg-black/85">
      <p className="sr-only">
        Exemplo animado: um relatório semanal é gerado e enviado automaticamente por e-mail e WhatsApp.
      </p>
      <div className="flex items-center gap-2 border-b border-[#00ff41]/15 px-4 py-3" aria-hidden>
        <span className="size-3 rounded-full bg-[#00ff41]/60" />
        <span className="size-3 rounded-full bg-[#00ff41]/30" />
        <span className="size-3 rounded-full bg-[#00ff41]/15" />
        <span className="ml-3 text-xs text-[#5f8f72]">automacao.sh</span>
        <span className="ml-auto text-xs tabular-nums text-[#5f8f72]">demonstração {clock}</span>
      </div>
      <div aria-hidden className="min-h-72 space-y-3 p-5 text-sm sm:text-base">
        <p className="text-[#e6ffec]">
          {CMD.slice(0, typing ? local : CMD.length)}
          {typing && <span className="animate-pulse">_</span>}
        </p>
        {JOB.map((j, i) => {
          if (stepIdx < 0 || i > stepIdx) return null;
          const active = i === stepIdx;
          const p = active ? prog : 1;
          const count = Math.round(totalOf(i) * (1 - (1 - p) ** 2));
          return (
            <div key={j.label} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#00ff41]">
              <span className="w-3 text-center">{active ? SPIN[(t >> 1) % 4] : "✓"}</span>
              <span>{j.label}</span>
              <span className="inline-block h-2 w-24 bg-[#00ff41]/15 sm:w-32">
                <span className="block h-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" style={{ width: `${p * 100}%` }} />
              </span>
              <span className="tabular-nums text-[#9fd3b0]">
                {count.toLocaleString("pt-BR")} {j.unit}
              </span>
            </div>
          );
        })}
        {finished && (
          <p className="pt-1 text-[#e6ffec]">
            &gt; tarefa concluída sem ninguém apertar um botão.
            <span className="ml-1 animate-pulse">_</span>
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#00ff41]/15 px-5 py-2 text-xs text-[#5f8f72]" aria-hidden>
        <span className="flex items-center gap-2">
          <span className={`size-2 rounded-full bg-[#00ff41] ${finished ? "" : "animate-pulse"}`} />
          {finished ? "concluído" : "executando"}
        </span>
        <span className="tabular-nums">
          execução #{run + 1} &gt; {elapsed.toFixed(1).replace(".", ",")}s
        </span>
      </div>
    </div>
  );
}

/* Linha do tempo que se preenche conforme você desce */
function Steps() {
  const [ref, p] = useViewProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="relative mt-10 pl-14">
      <span aria-hidden className="absolute left-5 top-0 h-full w-px bg-[#00ff41]/20" />
      <span
        aria-hidden
        className="absolute left-5 top-0 w-px bg-[#00ff41] shadow-[0_0_8px_#00ff41]"
        style={{ height: `${p * 100}%` }}
      />
      <ol className="space-y-8">
        {STEPS.map((s, i) => {
          const lit = p * (STEPS.length + 0.5) > i;
          return (
            <li key={s.title} className="relative">
              <span
                className={`absolute -left-14 flex size-10 items-center justify-center rounded-md border bg-black text-sm transition-all duration-500 ${
                  lit
                    ? "border-[#00ff41] text-[#00ff41] shadow-[0_0_12px_rgba(0,255,65,0.5)]"
                    : "border-[#00ff41]/20 text-[#00ff41]/40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={`transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-40"}`}>
                <h3 className="text-lg font-medium text-[#e6ffec]">{s.title}</h3>
                <p className="mt-1 max-w-xl text-[#9fd3b0]">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Botão futurista: cantos cortados, borda neon e varredura de luz ---------- */
const CUT = "[clip-path:polygon(14px_0,100%_0,100%_calc(100%_-_14px),calc(100%_-_14px)_100%,0_100%,0_14px)]";
const CUT_IN = "[clip-path:polygon(13px_0,100%_0,100%_calc(100%_-_13px),calc(100%_-_13px)_100%,0_100%,0_13px)]";

function TechButton({
  children,
  onClick,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
}) {
  const primary = variant === "primary";
  const shell = `group inline-block p-px transition-colors duration-300 focus-visible:bg-white focus-visible:outline-none ${CUT} ${
    primary ? "bg-[#00ff41]" : "bg-[#00ff41]/50 hover:bg-[#00ff41]"
  }`;
  const body = (
    <span
      className={`relative flex items-center gap-3 overflow-hidden px-7 py-3.5 text-base font-semibold tracking-wide transition-colors duration-300 ${CUT_IN} ${
        primary
          ? "bg-[#00ff41] text-black group-hover:bg-[#7dffa0]"
          : "bg-[#020a05] text-[#c9f7d3] group-hover:bg-[#04170a] group-hover:text-[#eafff0]"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/40 blur-sm transition-transform duration-700 group-hover:translate-x-[400%] motion-reduce:hidden"
      />
      <span aria-hidden className="opacity-60">&gt;</span>
      <span className="relative">{children}</span>
      <ChevronsRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
  return (
    <span className="inline-block transition [filter:drop-shadow(0_0_0_rgba(0,255,65,0))] focus-within:[filter:drop-shadow(0_0_14px_rgba(0,255,65,0.55))] hover:[filter:drop-shadow(0_0_14px_rgba(0,255,65,0.55))]">
      {href ? (
        <a href={href} className={shell}>{body}</a>
      ) : (
        <button type="button" onClick={onClick} className={shell}>{body}</button>
      )}
    </span>
  );
}

/* ---------- Imagens de exemplo, no estilo do site, animadas uma vez ao aparecer ---------- */
const LADDER = [300, 1100, 1900, 2700, 3300];

function useSteps<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(LADDER.length);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        LADDER.forEach((d, i) => timers.push(window.setTimeout(() => setStep(i + 1), d)));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);
  return [ref, step] as const;
}

function Frame({ children, cmd }: { children: ReactNode; cmd: string }) {
  return (
    <div className="relative flex h-60 shrink-0 flex-col overflow-hidden rounded-md border border-[#00ff41]/25 bg-[#010603]" aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-[#00ff41]/15 px-3 py-2">
        <span className="size-2 rounded-full bg-[#00ff41]/70" />
        <span className="size-2 rounded-full bg-[#00ff41]/35" />
        <span className="size-2 rounded-full bg-[#00ff41]/15" />
        <span className="ml-2 truncate text-[10px] text-[#5f8f72]">{cmd}</span>
      </div>
      <div className="relative flex flex-1 flex-col gap-2 p-3">{children}</div>
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,65,0.06)_0_1px,transparent_1px_3px)]" />
    </div>
  );
}

function Mock({ kind, cmd }: { kind: string; cmd: string }) {
  const [ref, step] = useSteps<HTMLDivElement>();
  const on = step >= 1;
  const done = step >= 4;
  const NODES = ["dados", "regra", "envio"];
  const rise = (show: boolean) =>
    `transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;

  return (
    <div ref={ref}>
      <Frame cmd={cmd}>
        {kind === "landing" && (
          <>
            <div className="h-3 rounded-sm bg-[#00ff41]/80 transition-all duration-700 ease-out" style={{ width: on ? "66%" : "0%" }} />
            <div className="h-2 rounded-sm bg-[#00ff41]/30 transition-all duration-700 ease-out" style={{ width: on ? "50%" : "0%", transitionDelay: "150ms" }} />
            <div
              className={`mt-1 h-5 w-24 bg-[#00ff41] transition-all duration-500 [clip-path:polygon(8px_0,100%_0,100%_calc(100%_-_8px),calc(100%_-_8px)_100%,0_100%,0_8px)] ${on ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
              style={{ transitionDelay: "350ms" }}
            />
            <div className="mt-auto grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-12 rounded-sm border border-[#00ff41]/30 bg-[#00ff41]/10 ${rise(on)}`}
                  style={{ transitionDelay: `${550 + i * 150}ms` }}
                />
              ))}
            </div>
          </>
        )}
        {kind === "flow" && (
          <svg viewBox="0 0 240 100" className="my-auto h-28 w-full">
            {[0, 1].map((i) => (
              <g key={i}>
                <path d={`M${60 + i * 85} 49H${95 + i * 85}`} stroke="#00ff41" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
                <path
                  d={`M${60 + i * 85} 49H${95 + i * 85}`}
                  stroke="#00ff41"
                  strokeWidth="1.5"
                  style={{ strokeDasharray: 35, strokeDashoffset: step >= i + 2 ? 0 : 35, transition: "stroke-dashoffset 700ms ease-out" }}
                />
              </g>
            ))}
            {NODES.map((n, i) => {
              const lit = step >= i + 1;
              return (
                <g key={n}>
                  <rect
                    x={10 + i * 85}
                    y={30}
                    width={50}
                    height={38}
                    rx={3}
                    stroke="#00ff41"
                    style={{ fill: lit ? "rgba(0,255,65,0.25)" : "rgba(0,255,65,0.06)", strokeOpacity: lit ? 1 : 0.4, transition: "all 500ms" }}
                  />
                  <text x={35 + i * 85} y={53} textAnchor="middle" fontSize="9" fill="#00ff41" fontFamily="monospace">
                    {n}
                    {done ? " ✓" : ""}
                  </text>
                </g>
              );
            })}
            <circle
              cx={35}
              cy={49}
              r={3}
              fill="#eafff0"
              style={{
                transform: `translateX(${Math.min(Math.max(step - 1, 0), 2) * 85}px)`,
                opacity: step >= 1 && !done ? 1 : 0,
                transition: "transform 700ms ease-in-out, opacity 400ms",
              }}
            />
          </svg>
        )}
        {kind === "panel" && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {["70%", "45%", "88%"].map((w, i) => (
                <div key={i} className="h-6 rounded-sm border border-[#00ff41]/30 bg-[#00ff41]/10 p-1.5">
                  <div
                    className="h-full rounded-sm bg-[#00ff41]/60 transition-[width] duration-1000 ease-out"
                    style={{ width: on ? w : "0%", transitionDelay: `${i * 150}ms` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-auto flex h-16 items-end gap-1.5">
              {[24, 40, 32, 52, 38, 58, 44].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-[#00ff41]/70 transition-[height] duration-700 ease-out"
                  style={{ height: on ? h : 0, transitionDelay: `${300 + i * 90}ms` }}
                />
              ))}
            </div>
          </>
        )}
        {kind === "chat" && (
          <>
            <div className={`w-3/5 rounded-sm border border-[#00ff41]/30 bg-[#00ff41]/10 p-2 ${rise(step >= 1)}`}>
              <div className="h-1.5 w-full rounded-sm bg-[#00ff41]/40" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-sm bg-[#00ff41]/25" />
            </div>
            <div className="relative h-12">
              <div
                className={`absolute right-0 top-0 flex w-16 items-center justify-center gap-1 rounded-sm border border-[#00ff41]/30 bg-[#00ff41]/10 py-2 transition-opacity duration-300 ${step >= 2 && step < 4 ? "opacity-100" : "opacity-0"}`}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 animate-pulse rounded-full bg-[#00ff41]" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
              <div className={`absolute right-0 top-0 w-1/2 rounded-sm bg-[#00ff41]/80 p-2 ${rise(step >= 4)}`}>
                <div className="h-1.5 w-full rounded-sm bg-black/60" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded-sm bg-black/40" />
              </div>
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-[#00ff41]/20 pt-2">
              <div className="h-4 flex-1 rounded-sm border border-[#00ff41]/30" />
              <div className="size-4 bg-[#00ff41] [clip-path:polygon(4px_0,100%_0,100%_calc(100%_-_4px),calc(100%_-_4px)_100%,0_100%,0_4px)]" />
            </div>
          </>
        )}
      </Frame>
    </div>
  );
}

/* ---------- Gamificação: barra de XP, níveis por seção e conquistas ---------- */
const LEVELS = [
  { id: "inicio", name: "Início", badge: "Sistema iniciado" },
  { id: "servicos", name: "Serviços", badge: "Conhecedor de serviços" },
  { id: "automacao", name: "Automação", badge: "Operador de automação" },
  { id: "projetos", name: "Projetos", badge: "Caçador de projetos" },
  { id: "processo", name: "Processo", badge: "Estrategista" },
  { id: "contato", name: "Contato", badge: "Missão cumprida" },
];

function Hud() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [toast, setToast] = useState({ text: "", show: false });
  const best = useRef(0);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setXp(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
      let cur = 0;
      LEVELS.forEach((l, i) => {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) cur = i;
      });
      setLevel(cur);
      if (cur > best.current) {
        best.current = cur;
        setToast({ text: LEVELS[cur].badge, show: true });
        window.clearTimeout(t);
        t = window.setTimeout(() => setToast((x) => ({ ...x, show: false })), 3500);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div
        role="progressbar"
        aria-label="Progresso da página"
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={100}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-[#00ff41]/20 bg-black/85"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-1.5 text-[11px] tracking-widest text-[#00ff41] sm:text-xs">
          <span>NÍVEL {pad(level + 1)}/{pad(LEVELS.length)} &gt; {LEVELS[level].name.toUpperCase()}</span>
          <span>XP {String(xp).padStart(3, "0")}%</span>
        </div>
        <div className="relative h-1.5 bg-[#00ff41]/15">
          <div className="h-full bg-[#00ff41] shadow-[0_0_10px_#00ff41] transition-[width] duration-150" style={{ width: `${xp}%` }} />
          {LEVELS.slice(1).map((_, i) => (
            <span key={i} className="absolute top-0 h-full w-px bg-black" style={{ left: `${((i + 1) / LEVELS.length) * 100}%` }} />
          ))}
        </div>
      </div>
      <div aria-live="polite" className="pointer-events-none fixed right-4 top-16 z-50">
        <div className={`inline-block p-px bg-[#00ff41] transition duration-500 ${CUT} ${toast.show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <div className={`bg-black/90 px-4 py-2 ${CUT_IN}`}>
            <p className="text-[10px] tracking-widest text-[#5f8f72]">CONQUISTA DESBLOQUEADA</p>
            <p className="text-sm font-semibold text-[#e6ffec]">{toast.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const whats = `${SITE.whatsapp}?text=${encodeURIComponent(SITE.message)}`;

  return (
    <main className="relative min-h-screen bg-[#020a05] pb-10 font-mono text-[#c9f7d3] antialiased selection:bg-[#00ff41] selection:text-black">
      <MatrixRain calm={calm} />
      <Hud />

      <div className="relative z-10">
        {/* Início */}
        <section id="inicio" className="relative flex min-h-[100svh] items-center justify-center px-5">
          <ScrollFade className="mx-auto max-w-4xl text-center">
            <BlurFade delay={0.1}>
              <p className="inline-flex items-center gap-2 rounded-md border border-[#00ff41]/30 bg-black/60 px-4 py-1.5 text-sm text-[#00ff41]">
                <span className="size-2 animate-pulse rounded-full bg-[#00ff41]" aria-hidden />
                Disponível para novos projetos
              </p>
            </BlurFade>
            <BlurFade delay={0.25}>
              <h1 className="mt-8 text-6xl font-bold tracking-tight [text-shadow:0_0_28px_rgba(0,255,65,0.45)] sm:text-8xl md:text-9xl">
                <AuroraText colors={["#00ff41", "#7dffa0", "#00b32c", "#00ff9c"]}>
                  <Decode text={SITE.name} />
                </AuroraText>
              </h1>
            </BlurFade>
            <BlurFade delay={0.4}>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[#c9f7d3] [text-shadow:0_0_10px_#000] sm:text-xl">
                Sites rápidos e automações que eliminam o trabalho repetitivo do seu negócio.
              </p>
              <div className="mt-4 flex items-baseline justify-center gap-2 text-lg text-[#9fd3b0]">
                <span aria-hidden className="text-[#00ff41]">&gt;</span>
                <span>Eu crio</span>
                <WordRotate
                  words={["sites", "landing pages", "sistemas", "automações"]}
                  className="text-lg font-medium text-[#00ff41]"
                />
                <span aria-hidden className="animate-pulse text-[#00ff41]">_</span>
              </div>
            </BlurFade>
            <BlurFade delay={0.55}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <TechButton onClick={() => go("contato")}>Pedir um orçamento</TechButton>
                <TechButton variant="ghost" onClick={() => go("servicos")}>Ver serviços</TechButton>
              </div>
            </BlurFade>
          </ScrollFade>
          <ScrollFade className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-sm text-[#5f8f72]">
            <span>role para explorar</span>
            <ChevronDown className="size-5 animate-bounce text-[#00ff41] motion-reduce:animate-none" aria-hidden />
          </ScrollFade>
        </section>

        {/* Manifesto: acende conforme a rolagem */}
        <section className="mx-auto w-full max-w-5xl px-5 py-24 md:py-32">
          <Manifesto />
        </section>

        {/* Serviços */}
        <section id="servicos" className="mx-auto w-full max-w-5xl scroll-mt-16 px-5 py-14 md:py-20">
          <Heading title="Serviços" text="Sites e automações, do primeiro rascunho até funcionar no dia a dia." />
          <ul className="mt-10 divide-y divide-[#00ff41]/15 border-y border-[#00ff41]/15 bg-black/75">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title}>
                  <BlurFade delay={0.06 * i} inView>
                    <div className="flex gap-5 px-4 py-6 transition hover:bg-[#00ff41]/5">
                      <Icon className="mt-1 size-6 shrink-0 text-[#00ff41]" aria-hidden />
                      <div>
                        <h3 className="text-lg font-medium text-[#e6ffec]">
                          <Decode text={s.title} />
                        </h3>
                        <p className="mt-1 max-w-xl text-[#9fd3b0]">{s.text}</p>
                      </div>
                    </div>
                  </BlurFade>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Automação na prática */}
        <section id="automacao" className="scroll-mt-16 mx-auto w-full max-w-5xl px-5 py-14 md:py-20">
          <Heading title="Automação na prática" text="Um exemplo do que acontece sozinho depois que eu configuro." />
          <BlurFade inView className="mt-10">
            <TerminalDemo />
          </BlurFade>
        </section>

        {/* Projetos */}
        <section id="projetos" className="mx-auto w-full max-w-5xl scroll-mt-16 px-5 py-14 md:py-20">
          <Heading title="Projetos" text="Exemplos do tipo de trabalho que eu entrego." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <BlurFade key={p.title} delay={0.1 * i} inView className="h-full">
                <MagicCard className="h-full rounded-lg border border-[#00ff41]/20 bg-black/70" gradientColor="#073d1a">
                  <div className="flex h-full flex-col p-5">
                    <Mock kind={p.mock} cmd={p.cmd} />
                    <h3 className="mt-5 text-lg font-medium text-[#e6ffec]">{p.title}</h3>
                    <p className="mt-1 text-[#9fd3b0]">{p.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded border border-[#00ff41]/25 px-3 py-1 text-xs text-[#9fe8b4]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Processo */}
        <section id="processo" className="scroll-mt-16 mx-auto w-full max-w-5xl px-5 py-14 md:py-20">
          <Heading title="Como funciona" text="Quatro etapas, sem surpresas no caminho." />
          <Steps />
        </section>

        {/* Ferramentas */}
        <section className="py-12" aria-label="Ferramentas que eu uso">
          <Marquee pauseOnHover className="[--duration:35s]">
            {STACK.map((t) => (
              <span key={t} className="rounded border border-[#00ff41]/25 bg-black/70 px-5 py-2 text-sm text-[#9fe8b4]">
                {t}
              </span>
            ))}
          </Marquee>
        </section>

        {/* Contato */}
        <section id="contato" className="mx-auto w-full max-w-5xl scroll-mt-16 px-5 py-14 md:py-20">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-lg border border-[#00ff41]/25 bg-black/80 p-8 text-center md:p-14">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#e6ffec] sm:text-4xl">
                <Decode text="Vamos tirar a sua ideia do papel?" />
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[#9fd3b0]">
                Conte o que você precisa e eu respondo com um caminho e um prazo.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <TechButton onClick={() => window.open(whats, "_blank", "noopener,noreferrer")}>Chamar no WhatsApp</TechButton>
                <TechButton variant="ghost" href={`mailto:${SITE.email}`}>Enviar e-mail</TechButton>
              </div>
              <BorderBeam size={220} duration={10} colorFrom="#00ff41" colorTo="#00b32c" />
            </div>
          </BlurFade>
          <p className="mt-10 text-center text-sm text-[#5f8f72]">
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
        </section>
      </div>
    </main>
  );
}
