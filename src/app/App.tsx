import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  ChevronDown,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Award,
  Users,
  TrendingUp,
  Home,
  Building2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8d5a3";

/* ── helpers ── */
const fmtPrice = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`;

/* ── data ── */
const LISTINGS = [
  {
    id: 1,
    title: "The Obsidian Penthouse",
    location: "Manhattan, New York",
    price: 18_500_000,
    beds: 5,
    baths: 6,
    sqft: 8_200,
    tag: "Featured",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Villa Aurum",
    location: "Beverly Hills, CA",
    price: 32_000_000,
    beds: 8,
    baths: 10,
    sqft: 14_500,
    tag: "Private",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Château Noir",
    location: "Miami Beach, FL",
    price: 9_750_000,
    beds: 6,
    baths: 7,
    sqft: 7_800,
    tag: "New",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "The Gold Reserve",
    location: "Aspen, Colorado",
    price: 24_900_000,
    beds: 7,
    baths: 8,
    sqft: 11_200,
    tag: "Private",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Palazzo Del Cielo",
    location: "Malibu, California",
    price: 41_000_000,
    beds: 10,
    baths: 12,
    sqft: 18_000,
    tag: "Featured",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Noir Tower Suite",
    location: "Chicago, Illinois",
    price: 7_200_000,
    beds: 4,
    baths: 5,
    sqft: 5_400,
    tag: "New",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&auto=format",
  },
];

const NEIGHBORHOODS = [
  {
    name: "Manhattan",
    state: "New York",
    listings: 42,
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=800&fit=crop&auto=format",
  },
  {
    name: "Beverly Hills",
    state: "California",
    listings: 31,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format",
  },
  {
    name: "Miami Beach",
    state: "Florida",
    listings: 28,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&auto=format",
  },
  {
    name: "Aspen",
    state: "Colorado",
    listings: 17,
    img: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=800&fit=crop&auto=format",
  },
];

const AGENTS = [
  {
    name: "Victoria Ashford",
    title: "Principal Broker",
    sales: "$2.4B",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Marcus Delacroix",
    title: "Senior Partner",
    sales: "$1.8B",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format",
  },
  {
    name: "Isabelle Chen",
    title: "Luxury Specialist",
    sales: "$960M",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&auto=format",
  },
];

const TESTIMONIALS = [
  {
    text: "YAYO did not merely sell our home — they orchestrated a transaction that exceeded our highest expectations. The discretion and care shown throughout was unmatched.",
    author: "Jonathan & Claire W.",
    role: "Sold at $28.5M, Manhattan",
    stars: 5,
  },
  {
    text: "Victoria's market intelligence is extraordinary. She identified a property before it ever listed and secured it for us at an exceptional price. YAYO is simply in a class of its own.",
    author: "Reginald Osei",
    role: "Acquired $19M, Beverly Hills",
    stars: 5,
  },
  {
    text: "The private client program gave us access to homes we didn't know existed. Flawless from first call to closing.",
    author: "Sophia M.",
    role: "Portfolio Client",
    stars: 5,
  },
];

/* ── small reusables ── */
function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent ${className}`}
    />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="w-8 h-px bg-[#c9a84c]" />
      <span
        className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {children}
      </span>
    </motion.div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D rotating cube logo mark ── */
function CubeMark({ size = 32 }: { size?: number }) {
  const s = size;
  const f = s * 0.35;
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,2 30,10 30,22 16,30 2,22 2,10"
        stroke={GOLD}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <polygon
        points="16,2 30,10 16,18 2,10"
        fill={GOLD}
        opacity="0.15"
      />
      <polygon
        points="16,18 30,10 30,22 16,30"
        fill={GOLD}
        opacity="0.25"
      />
      <polygon
        points="16,18 2,10 2,22 16,30"
        fill={GOLD}
        opacity="0.12"
      />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill={GOLD}
        fontSize={f}
        fontWeight="700"
        fontFamily="Montserrat, sans-serif"
        letterSpacing="-0.5"
      >
        Y
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Properties", "Neighborhoods", "Private", "Agents", "Journal", "Contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#c9a84c]/15"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <CubeMark size={34} />
            <div className="flex flex-col leading-none">
              <span
                className="text-[#c9a84c] text-xl font-semibold tracking-[0.25em]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                YAYO
              </span>
              <span
                className="text-[#8a8070] text-[8px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Realtor
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-[#f5f0e8]/70 hover:text-[#c9a84c] text-xs tracking-[0.2em] uppercase transition-colors duration-300 font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("private")}
              className="ml-4 px-5 py-2 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Private Access
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#c9a84c]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-center items-center gap-8 md:hidden"
      >
        {links.map((l, i) => (
          <motion.button
            key={l}
            initial={{ opacity: 0, x: 30 }}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => scrollTo(l)}
            className="text-[#f5f0e8] text-2xl tracking-[0.25em] uppercase hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {l}
          </motion.button>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => scrollTo("private")}
          className="mt-4 px-8 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-[0.2em] uppercase"
        >
          Private Access
        </motion.button>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Subtle slow zoom
      gsap.to(imgRef.current, {
        scale: 1.08,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      {/* Bg image */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=1200&fit=crop&auto=format"
          alt="Luxury estate exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/10 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionLabel>Est. 2008 · New York</SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] font-light text-[#f5f0e8] leading-[0.9] mb-8"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Where Luxury
          <br />
          <em className="italic text-[#c9a84c]">Finds Its</em>
          <br />
          True Address
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#8a8070] text-base md:text-lg max-w-md mb-10 leading-relaxed font-light"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Curating the world's most exceptional residences for those who expect nothing less than extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 bg-[#c9a84c] text-[#080808] font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#e8d5a3] transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Explore Properties
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("private")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-medium text-sm tracking-[0.15em] uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <Lock size={14} />
            Private Listings
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-20 flex flex-wrap gap-12"
        >
          {[
            { val: "$14.2B", label: "Total Sales Volume" },
            { val: "320+", label: "Off-Market Listings" },
            { val: "18", label: "Years of Excellence" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div
                className="text-[#c9a84c] text-3xl font-light"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                {val}
              </div>
              <div
                className="text-[#8a8070] text-xs tracking-[0.2em] uppercase mt-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#c9a84c]" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   SEARCH
══════════════════════════════════════ */
function SearchSection() {
  const [type, setType] = useState("Buy");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("Any");
  const [beds, setBeds] = useState("Any");

  return (
    <section id="search" className="bg-[#0a0a0a] py-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative -mt-12 z-20 bg-[#0f0f0f] border border-[#c9a84c]/20 p-6 md:p-10"
          style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,168,76,0.1)" }}
        >
          {/* Type tabs */}
          <div className="flex gap-0 mb-8 border-b border-[#c9a84c]/15">
            {["Buy", "Rent", "Private"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 border-b-2 -mb-px ${
                  type === t
                    ? "border-[#c9a84c] text-[#c9a84c]"
                    : "border-transparent text-[#8a8070] hover:text-[#f5f0e8]"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t === "Private" && <Lock size={10} className="inline mr-1.5 mb-0.5" />}
                {t}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-1">
              <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                Location
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c]" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, neighborhood, ZIP…"
                  className="w-full bg-[#151515] border border-[#c9a84c]/15 pl-9 pr-4 py-3 text-[#f5f0e8] text-sm placeholder:text-[#444] focus:border-[#c9a84c]/50 outline-none transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                Price Range
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#151515] border border-[#c9a84c]/15 px-4 py-3 text-[#f5f0e8] text-sm focus:border-[#c9a84c]/50 outline-none transition-colors appearance-none cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {["Any", "$1M – $5M", "$5M – $15M", "$15M – $30M", "$30M+"].map((p) => (
                  <option key={p} value={p} className="bg-[#0f0f0f]">{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                Bedrooms
              </label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-[#151515] border border-[#c9a84c]/15 px-4 py-3 text-[#f5f0e8] text-sm focus:border-[#c9a84c]/50 outline-none transition-colors appearance-none cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {["Any", "2+", "3+", "4+", "5+", "6+"].map((b) => (
                  <option key={b} value={b} className="bg-[#0f0f0f]">{b}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#c9a84c] text-[#080808] font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#e8d5a3] transition-all duration-300 group">
                <Search size={15} />
                Search
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="text-[#8a8070] text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>Popular:</span>
            {["Manhattan Penthouses", "Malibu Oceanfront", "Aspen Ski-in/Ski-out", "Miami Waterfront"].map((t) => (
              <button
                key={t}
                className="text-[#c9a84c]/70 text-xs hover:text-[#c9a84c] transition-colors underline underline-offset-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FEATURED LISTINGS
══════════════════════════════════════ */
function ListingCard({ listing, index }: { listing: typeof LISTINGS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative overflow-hidden bg-[#0f0f0f] border border-[#c9a84c]/10 hover:border-[#c9a84c]/35 transition-all duration-500 cursor-pointer"
      style={{ boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)" }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">
        <motion.img
          src={listing.img}
          alt={listing.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium ${
              listing.tag === "Private"
                ? "bg-[#080808]/90 text-[#c9a84c] border border-[#c9a84c]/40"
                : listing.tag === "Featured"
                ? "bg-[#c9a84c] text-[#080808]"
                : "bg-[#f5f0e8] text-[#080808]"
            }`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {listing.tag === "Private" && <Lock size={8} className="inline mr-1" />}
            {listing.tag}
          </span>
        </div>

        {/* Price overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 right-4"
        >
          <span
            className="text-[#c9a84c] text-xl font-light"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {fmtPrice(listing.price)}
          </span>
        </motion.div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-[#f5f0e8] text-lg font-light leading-tight"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {listing.title}
          </h3>
          <span
            className="text-[#c9a84c] text-xl font-light ml-4 whitespace-nowrap"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {fmtPrice(listing.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={11} className="text-[#c9a84c]" />
          <span className="text-[#8a8070] text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {listing.location}
          </span>
        </div>

        <GoldLine className="mb-4 opacity-30" />

        <div className="flex items-center gap-5">
          {[
            { icon: <Bed size={12} />, val: listing.beds, label: "Beds" },
            { icon: <Bath size={12} />, val: listing.baths, label: "Baths" },
            { icon: <Square size={12} />, val: `${listing.sqft.toLocaleString()}`, label: "sq ft" },
          ].map(({ icon, val, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[#8a8070]">
              <span className="text-[#c9a84c]">{icon}</span>
              <span className="text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
                {val}
              </span>
              <span className="text-[10px] opacity-60" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <motion.button
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          className="mt-5 w-full py-2.5 border border-[#c9a84c]/40 text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300 font-medium"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          View Details →
        </motion.button>
      </div>
    </motion.div>
  );
}

function FeaturedListings() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Featured", "Private", "New"];

  const filtered = filter === "All" ? LISTINGS : LISTINGS.filter((l) => l.tag === filter);

  return (
    <section id="properties" className="py-28 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel>Curated Portfolio</SectionLabel>
            <FadeUp>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8] leading-[1.05]"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Exceptional
                <br />
                <em className="italic text-[#c9a84c]">Residences</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.15}>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    filter === f
                      ? "bg-[#c9a84c] text-[#080808]"
                      : "border border-[#c9a84c]/25 text-[#8a8070] hover:border-[#c9a84c]/60 hover:text-[#c9a84c]"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div className="mt-14 text-center">
            <button className="group inline-flex items-center gap-3 px-10 py-4 border border-[#c9a84c]/40 text-[#c9a84c] text-sm tracking-[0.2em] uppercase hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              View All Properties
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   NEIGHBORHOODS
══════════════════════════════════════ */
function Neighborhoods() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="neighborhoods" ref={containerRef} className="bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-10">
        <SectionLabel>Prime Locations</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <FadeUp>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Prestige
              <br />
              <em className="italic text-[#c9a84c]">Neighborhoods</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-[#8a8070] max-w-xs text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              From Manhattan penthouses to Malibu oceanfront estates — we command the finest addresses in America.
            </p>
          </FadeUp>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-5 px-6 md:px-12 pb-20 w-max">
        {NEIGHBORHOODS.map((n, i) => (
          <motion.div
            key={n.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative group cursor-pointer overflow-hidden flex-shrink-0 bg-[#1a1a1a]"
            style={{ width: "min(380px, 85vw)", height: 520 }}
          >
            <motion.img
              src={n.img}
              alt={n.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div
                className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {n.listings} listings available
              </div>
              <h3
                className="text-[#f5f0e8] text-3xl font-light"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                {n.name}
              </h3>
              <p className="text-[#8a8070] text-sm mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {n.state}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="h-px bg-[#c9a84c] mt-4"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STATS / MARQUEE STRIP
══════════════════════════════════════ */
function StatsStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const items = [
    "$14.2B Total Volume",
    "320+ Off-Market",
    "18 Years Excellence",
    "12 Global Markets",
    "98% Client Retention",
    "Award-Winning Service",
  ];

  return (
    <div className="bg-[#c9a84c] py-4 overflow-hidden">
      <div className="flex">
        <div className="marquee-track flex whitespace-nowrap gap-12 will-change-transform">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-[#080808] text-xs tracking-[0.3em] uppercase font-semibold flex-shrink-0"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ◆ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PRIVATE CLIENT SECTION
══════════════════════════════════════ */
function PrivateSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="private" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#060606]">
      {/* Bg */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=900&fit=crop&auto=format"
          alt="Exclusive estate"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/80 to-[#060606]/50" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#c9a84c]/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#c9a84c]/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#c9a84c]/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#c9a84c]/30" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel>Exclusive Access</SectionLabel>
            <FadeUp>
              <h2
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#f5f0e8] leading-[1.05] mb-6"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                The Private
                <br />
                <em className="italic text-[#c9a84c]">Client Circle</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[#8a8070] text-base leading-relaxed mb-8 max-w-md" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                An invitation-only tier of service reserved for our most discerning clients. Access off-market properties, early previews, and a dedicated portfolio concierge — before anything reaches the open market.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-5">
                {[
                  { icon: <Lock size={16} />, text: "Off-market listings, never publicly advertised" },
                  { icon: <Eye size={16} />, text: "First access to pre-market estate releases" },
                  { icon: <Users size={16} />, text: "Dedicated white-glove concierge service" },
                  { icon: <Globe size={16} />, text: "International portfolio management" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0 text-[#c9a84c]">
                      {icon}
                    </div>
                    <p className="text-[#8a8070] text-sm leading-relaxed pt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — login / request form */}
          <FadeUp delay={0.3}>
            <div
              className="bg-[#0d0d0d]/95 border border-[#c9a84c]/20 p-8 md:p-10"
              style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,168,76,0.08)" }}
            >
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
                      <Lock size={14} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <div className="text-[#f5f0e8] text-sm font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Private Client Portal
                      </div>
                      <div className="text-[#8a8070] text-[10px] tracking-[0.2em]" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Members only
                      </div>
                    </div>
                  </div>

                  <GoldLine className="mb-8 opacity-30" />

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#111] border border-[#c9a84c]/15 px-4 py-3 text-[#f5f0e8] text-sm placeholder:text-[#333] focus:border-[#c9a84c]/50 outline-none transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Access Code
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#111] border border-[#c9a84c]/15 px-4 py-3 pr-12 text-[#f5f0e8] text-sm placeholder:text-[#333] focus:border-[#c9a84c]/50 outline-none transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        />
                        <button
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8070] hover:text-[#c9a84c] transition-colors"
                        >
                          {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="mt-7 w-full py-3.5 bg-[#c9a84c] text-[#080808] font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#e8d5a3] transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Access Portal
                  </button>

                  <div className="mt-5 text-center">
                    <button className="text-[#c9a84c]/60 text-xs hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Request private membership →
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto border border-[#c9a84c] flex items-center justify-center mb-6"
                  >
                    <Award size={28} className="text-[#c9a84c]" />
                  </motion.div>
                  <h3 className="text-[#f5f0e8] text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif" }}>
                    Welcome Back
                  </h3>
                  <p className="text-[#8a8070] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Your private portfolio is being prepared. A concierge will contact you within 2 hours.
                  </p>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   AGENTS
══════════════════════════════════════ */
function AgentsSection() {
  return (
    <section id="agents" className="py-28 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel>Our Team</SectionLabel>
            <FadeUp>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                The Minds
                <br />
                <em className="italic text-[#c9a84c]">Behind YAYO</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.15}>
            <p className="text-[#8a8070] max-w-xs text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Decades of combined expertise, an unrivaled network, and an unwavering commitment to your success.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <FadeUp key={agent.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden border border-[#c9a84c]/10 hover:border-[#c9a84c]/35 transition-all duration-500 bg-[#0f0f0f] cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden bg-[#1a1a1a]">
                  <motion.img
                    src={agent.img}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6">
                  <h3
                    className="text-[#f5f0e8] text-xl font-light"
                    style={{ fontFamily: "'Cormorant', serif" }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-[#8a8070] text-xs tracking-[0.15em] uppercase mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {agent.title}
                  </p>
                  <GoldLine className="my-4 opacity-30" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#c9a84c] text-lg font-light" style={{ fontFamily: "'Cormorant', serif" }}>
                        {agent.sales}
                      </div>
                      <div className="text-[#8a8070] text-[10px] tracking-[0.2em]" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Total Sales
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[Phone, Mail, Linkedin].map((Icon, idx) => (
                        <button
                          key={idx}
                          className="w-8 h-8 border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                        >
                          <Icon size={12} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* large bg text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(10rem,25vw,20rem)] font-light text-[#c9a84c]/[0.025] leading-none"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          YAYO
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionLabel>Client Stories</SectionLabel>
          <FadeUp>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Voices of
              <em className="italic text-[#c9a84c]"> Excellence</em>
            </h2>
          </FadeUp>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              {Array.from({ length: TESTIMONIALS[active].stars }).map((_, i) => (
                <Star key={i} size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
              ))}
            </div>

            <p
              className="text-[#f5f0e8]/85 text-xl md:text-2xl font-light leading-relaxed italic mb-8"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              "{TESTIMONIALS[active].text}"
            </p>

            <GoldLine className="w-16 mx-auto mb-6 opacity-60" />

            <div
              className="text-[#f5f0e8] text-sm font-medium tracking-[0.1em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {TESTIMONIALS[active].author}
            </div>
            <div
              className="text-[#8a8070] text-xs tracking-[0.2em] mt-1"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {TESTIMONIALS[active].role}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 border border-[#c9a84c]/25 flex items-center justify-center text-[#8a8070] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 transition-all duration-300 ${
                    i === active ? "bg-[#c9a84c] w-6" : "bg-[#c9a84c]/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 border border-[#c9a84c]/25 flex items-center justify-center text-[#8a8070] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   JOURNAL / BLOG
══════════════════════════════════════ */
const POSTS = [
  {
    cat: "Market Insights",
    title: "The Ultra-Luxury Market Q2 2026: A Record-Breaking Quarter",
    date: "June 18, 2026",
    img: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop&auto=format",
    read: "6 min",
  },
  {
    cat: "Architecture",
    title: "Invisible Luxury: How the World's Top Architects Design for Silence",
    date: "June 10, 2026",
    img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=600&h=400&fit=crop&auto=format",
    read: "8 min",
  },
  {
    cat: "Investment",
    title: "Trophy Assets: Why the Super-Rich Never Stop Buying Real Estate",
    date: "May 29, 2026",
    img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&h=400&fit=crop&auto=format",
    read: "5 min",
  },
];

function Journal() {
  return (
    <section id="journal" className="py-28 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <FadeUp>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                The YAYO
                <br />
                <em className="italic text-[#c9a84c]">Journal</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.15}>
            <button className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:text-[#e8d5a3] transition-colors flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              All Articles <ArrowRight size={12} />
            </button>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <FadeUp key={post.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-5 bg-[#1a1a1a]">
                  <motion.img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div
                  className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {post.cat} · {post.read} read
                </div>
                <h3
                  className="text-[#f5f0e8] text-lg font-light leading-snug group-hover:text-[#e8d5a3] transition-colors mb-3"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {post.title}
                </h3>
                <div className="text-[#8a8070] text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {post.date}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SERVICES
══════════════════════════════════════ */
function Services() {
  const services = [
    {
      icon: <Home size={22} />,
      title: "Residential Sales",
      desc: "Masterfully negotiated transactions for private residences of every scale, from city apartments to oceanfront estates.",
    },
    {
      icon: <Building2 size={22} />,
      title: "Commercial Portfolio",
      desc: "Strategic acquisition and disposition of commercial assets — hotels, mixed-use towers, and trophy office buildings.",
    },
    {
      icon: <Globe size={22} />,
      title: "International Markets",
      desc: "A global network spanning 12 countries, connecting buyers and sellers across the world's most coveted addresses.",
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Investment Advisory",
      desc: "Data-driven portfolio strategy, asset allocation, and ROI optimization for real estate investors at every level.",
    },
    {
      icon: <Award size={22} />,
      title: "Estate Management",
      desc: "Comprehensive property management and white-glove maintenance for your portfolio, wherever in the world it resides.",
    },
    {
      icon: <Users size={22} />,
      title: "Private Relocation",
      desc: "Seamless relocation services for executives, families, and diplomats — from city search to move-in day.",
    },
  ];

  return (
    <section className="py-28 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionLabel>What We Offer</SectionLabel>
          <FadeUp>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8]"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              A Full Spectrum of
              <br />
              <em className="italic text-[#c9a84c]">Expertise</em>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a84c]/10">
          {services.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "#0d0d0d" }}
                className="group p-8 md:p-10 bg-[#0a0a0a] transition-colors duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 border border-[#c9a84c]/20 group-hover:border-[#c9a84c]/60 flex items-center justify-center text-[#c9a84c] mb-6 transition-all duration-300">
                  {svc.icon}
                </div>
                <h3
                  className="text-[#f5f0e8] text-xl font-light mb-3"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-[#8a8070] text-sm leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {svc.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#c9a84c]/0 group-hover:text-[#c9a84c] transition-colors duration-300 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", budget: "Under $5M" });
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="contact" className="py-28 bg-[#080808] relative overflow-hidden">
      {/* decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c9a84c]/3 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionLabel>Get In Touch</SectionLabel>
            <FadeUp>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] font-light text-[#f5f0e8] leading-[1.05] mb-6"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Begin Your
                <br />
                <em className="italic text-[#c9a84c]">Journey</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[#8a8070] text-base leading-relaxed mb-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Our advisors are available to discuss your requirements in complete confidence. There is no obligation — only an opportunity.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-6">
                {[
                  { icon: <Phone size={16} />, label: "Direct Line", val: "+1 (212) 999-0000" },
                  { icon: <Mail size={16} />, label: "Email", val: "private@yayorealtor.com" },
                  { icon: <MapPin size={16} />, label: "Flagship Office", val: "432 Park Avenue, New York, NY 10022" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 text-[#c9a84c]">
                      {icon}
                    </div>
                    <div>
                      <div className="text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {label}
                      </div>
                      <div className="text-[#f5f0e8] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Social */}
            <FadeUp delay={0.25}>
              <div className="flex gap-3 mt-10">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <FadeUp delay={0.3}>
            {!sent ? (
              <div
                className="bg-[#0f0f0f] border border-[#c9a84c]/15 p-8 md:p-10"
                style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.06)" }}
              >
                <h3 className="text-[#f5f0e8] text-xl font-light mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
                  Request a Consultation
                </h3>
                <GoldLine className="mb-8 opacity-20" />

                <div className="space-y-5">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                    { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                    { key: "phone", label: "Phone Number", placeholder: "+1 (000) 000-0000", type: "tel" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={(form as any)[key]}
                        onChange={(e) => update(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-[#111] border border-[#c9a84c]/12 px-4 py-3 text-[#f5f0e8] text-sm placeholder:text-[#333] focus:border-[#c9a84c]/45 outline-none transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                      Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full bg-[#111] border border-[#c9a84c]/12 px-4 py-3 text-[#f5f0e8] text-sm focus:border-[#c9a84c]/45 outline-none transition-colors appearance-none"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {["Under $5M", "$5M – $15M", "$15M – $30M", "$30M+", "Portfolio"].map((b) => (
                        <option key={b} value={b} className="bg-[#0f0f0f]">{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#8a8070] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your requirements…"
                      className="w-full bg-[#111] border border-[#c9a84c]/12 px-4 py-3 text-[#f5f0e8] text-sm placeholder:text-[#333] focus:border-[#c9a84c]/45 outline-none transition-colors resize-none"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSent(true)}
                  className="mt-7 w-full py-3.5 bg-[#c9a84c] text-[#080808] font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#e8d5a3] transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Send Request
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0f0f0f] border border-[#c9a84c]/20 p-10 text-center"
              >
                <div className="w-16 h-16 mx-auto border border-[#c9a84c] flex items-center justify-center mb-6">
                  <Award size={28} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-[#f5f0e8] text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif" }}>
                  Message Received
                </h3>
                <p className="text-[#8a8070] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  A senior advisor will reach out within 24 hours to schedule your private consultation. We look forward to exceeding your expectations.
                </p>
              </motion.div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-[#c9a84c]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <CubeMark size={30} />
              <div>
                <div className="text-[#c9a84c] text-lg font-semibold tracking-[0.25em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>YAYO</div>
                <div className="text-[#8a8070] text-[8px] tracking-[0.4em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Realtor</div>
              </div>
            </div>
            <p className="text-[#8a8070] text-xs leading-relaxed mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The world's most distinguished real estate firm, serving an exclusive clientele since 2008.
            </p>
            <div className="flex gap-2">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} className="w-8 h-8 border border-[#c9a84c]/15 flex items-center justify-center text-[#8a8070] hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-300">
                  <Icon size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Company</div>
            {["About YAYO", "Our Team", "Careers", "Press & Media", "Sustainability"].map((l) => (
              <div key={l} className="mb-2.5">
                <button className="text-[#8a8070] text-xs hover:text-[#f5f0e8] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l}</button>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <div className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Services</div>
            {["Buy Property", "Sell Property", "Rent", "Private Listings", "Investment", "Estate Management"].map((l) => (
              <div key={l} className="mb-2.5">
                <button className="text-[#8a8070] text-xs hover:text-[#f5f0e8] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l}</button>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Contact</div>
            <div className="space-y-3">
              {[
                "432 Park Avenue",
                "New York, NY 10022",
                "+1 (212) 999-0000",
                "private@yayorealtor.com",
              ].map((t) => (
                <div key={t} className="text-[#8a8070] text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        <GoldLine className="opacity-20 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#8a8070] text-[10px] tracking-[0.2em]" style={{ fontFamily: "'DM Mono', monospace" }}>
            © 2026 YAYO Realtor. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <button key={l} className="text-[#8a8070] text-[10px] tracking-[0.15em] hover:text-[#c9a84c] transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   APP
══════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    // Smooth scroll
    document.documentElement.style.scrollBehavior = "smooth";
    // Hide scrollbar but keep scroll
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #080808; }
      ::-webkit-scrollbar-thumb { background: #c9a84c33; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #c9a84c66; }
      * { scrollbar-width: thin; scrollbar-color: #c9a84c33 #080808; }
    `;
    document.head.appendChild(style);

    // GSAP reveal for section headings
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-[#080808] text-[#f5f0e8] overflow-x-hidden">
      <Navbar />
      <Hero />
      <SearchSection />
      <StatsStrip />
      <FeaturedListings />
      <Neighborhoods />
      <PrivateSection />
      <Services />
      <AgentsSection />
      <Testimonials />
      <Journal />
      <Contact />
      <Footer />
    </div>
  );
}
