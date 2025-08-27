"use client"

import React, { useMemo, useState } from "react";
// import { motion } from "framer-motion";
import { FramerWrapper } from "@/components/FramerWrapper"
import {
  Search,
  Globe2,
  GraduationCap,
  Briefcase,
  MapPin,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Mail,
  Phone,
  ArrowRight,
  Building2,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Color palette from user's earlier preference
const COLORS = {
  primary: "#4f257b", // deep purple
  accent: "#f68c21", // orange
  highlight: "#b11f3b", // crimson
  slate: "#0f172a", // slate-900
  soft: "#f8fafc", // slate-50
};

// Mock university/program catalog
const SCHOOLS = [
  {
    id: 1,
    name: "University of Westbridge",
    country: "United Kingdom",
    city: "London",
    degrees: ["BSc", "MSc", "PhD"],
    faculties: ["Engineering", "Business", "Computer Science"],
    tuition: { BSc: "£14,500–£20,000", MSc: "£16,000–£24,000", PhD: "£13,500–£18,000" },
    deposit: "£3,000",
    intakes: ["January 2026", "May 2026", "September 2026"],
  },
  {
    id: 2,
    name: "Maple State University",
    country: "Canada",
    city: "Toronto",
    degrees: ["BSc", "MSc"],
    faculties: ["Health Sciences", "Business"],
    tuition: { BSc: "CAD 18,000–25,000", MSc: "CAD 20,000–28,000" },
    deposit: "CAD 2,500",
    intakes: ["January 2026", "September 2026"],
  },
  {
    id: 3,
    name: "Atlantic Tech Institute",
    country: "United States",
    city: "Boston",
    degrees: ["BSc", "MSc"],
    faculties: ["Computer Science", "Engineering"],
    tuition: { BSc: "$22,000–$35,000", MSc: "$24,000–$40,000" },
    deposit: "$2,000",
    intakes: ["January 2026", "August 2026"],
  },
  {
    id: 4,
    name: "Emerald Isles University",
    country: "Ireland",
    city: "Dublin",
    degrees: ["BSc", "MSc"],
    faculties: ["Business", "Data Science"],
    tuition: { BSc: "€12,500–€19,000", MSc: "€14,000–€22,000" },
    deposit: "€1,500",
    intakes: ["September 2026"],
  },
  {
    id: 5,
    name: "Bavaria University of Applied Sciences",
    country: "Germany",
    city: "Munich",
    degrees: ["BSc", "MSc", "PhD"],
    faculties: ["Engineering", "AI", "Robotics"],
    tuition: { BSc: "€0–€3,000 (public)", MSc: "€0–€3,000 (public)", PhD: "Funded/€0–€3,000" },
    deposit: "—",
    intakes: ["April 2026", "October 2026"],
  },
  {
    id: 6,
    name: "Vienna International University",
    country: "Austria",
    city: "Vienna",
    degrees: ["BSc", "MSc", "PhD"],
    faculties: ["Music", "Economics", "Engineering"],
    tuition: { BSc: "€1,450–€3,000", MSc: "€1,450–€3,500", PhD: "€1,450–€2,500" },
    deposit: "€1,000",
    intakes: ["March 2026", "October 2026"],
  },
  {
    id: 7,
    name: "Pacific Northwest College",
    country: "United States",
    city: "Seattle",
    degrees: ["BSc"],
    faculties: ["Design", "Computer Science"],
    tuition: { BSc: "$18,000–$28,000" },
    deposit: "$1,500",
    intakes: ["January 2026", "August 2026"],
  },
  {
    id: 8,
    name: "Rhine Valley University",
    country: "Germany",
    city: "Frankfurt",
    degrees: ["MSc", "PhD"],
    faculties: ["Finance", "AI"],
    tuition: { MSc: "€0–€2,500 (public)", PhD: "Funded/€0–€2,500" },
    deposit: "—",
    intakes: ["April 2026", "October 2026"],
  },
  {
    id: 9,
    name: "St. Andrews College of Dublin",
    country: "Ireland",
    city: "Dublin",
    degrees: ["BSc"],
    faculties: ["Nursing", "Business"],
    tuition: { BSc: "€10,000–€16,000" },
    deposit: "€1,000",
    intakes: ["September 2026"],
  },
  {
    id: 10,
    name: "Northern Lights Polytechnic",
    country: "Canada",
    city: "Vancouver",
    degrees: ["BSc", "MSc"],
    faculties: ["Engineering", "Cybersecurity"],
    tuition: { BSc: "CAD 16,000–22,000", MSc: "CAD 20,000–30,000" },
    deposit: "CAD 2,000",
    intakes: ["January 2026", "May 2026", "September 2026"],
  },
  {
    id: 11,
    name: "New England Graduate School",
    country: "United States",
    city: "New York",
    degrees: ["MSc", "PhD"],
    faculties: ["Data Science", "Public Health"],
    tuition: { MSc: "$28,000–$42,000", PhD: "Funded/$0–$5,000" },
    deposit: "$2,000",
    intakes: ["January 2026", "August 2026"],
  },
  {
    id: 12,
    name: "Royal Midlands University",
    country: "United Kingdom",
    city: "Birmingham",
    degrees: ["BSc", "MSc"],
    faculties: ["Accounting", "Marketing", "Law"],
    tuition: { BSc: "£12,500–£18,500", MSc: "£14,000–£22,000" },
    deposit: "£2,000",
    intakes: ["January 2026", "September 2026"],
  },
];

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Ireland",
  "Germany",
  "Austria",
];

const DEGREES = ["BSc", "MSc", "PhD"] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-slate-700 border-slate-200 bg-white">
      {children}
    </span>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4 lg:p-6 bg-white shadow-sm border border-slate-200 flex items-center gap-4">
      <div className="rounded-xl p-3" style={{ background: COLORS.soft }}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-slate-500 text-sm">{label}</div>
        <div className="text-xl lg:text-2xl font-semibold" style={{ color: COLORS.slate }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function StudyAbroadTalentPlacement() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string | "">("");
  const [degree, setDegree] = useState<string | "">("");
  const [faculty, setFaculty] = useState("");

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const matchesQuery = query
        ? [s.name, s.city, s.country, ...s.faculties].join(" ").toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesCountry = country ? s.country === country : true;
      const matchesDegree = degree ? s.degrees.includes(degree as any) : true;
      const matchesFaculty = faculty ? s.faculties.join(" ").toLowerCase().includes(faculty.toLowerCase()) : true;
      return matchesQuery && matchesCountry && matchesDegree && matchesFaculty;
    });
  }, [query, country, degree, faculty]);

  const countryChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    COUNTRIES.forEach((c) => (counts[c] = 0));
    filtered.forEach((s) => (counts[s.country] = (counts[s.country] || 0) + 1));
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const degreeChartData = useMemo(() => {
    const counts: Record<string, number> = { BSc: 0, MSc: 0, PhD: 0 };
    filtered.forEach((s) => {
      DEGREES.forEach((d) => {
        if (s.degrees.includes(d as any)) counts[d] += 1;
      });
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  function handleApply(school: (typeof SCHOOLS)[number]) {
    const chosen = degree && school.tuition[degree as keyof typeof school.tuition]
      ? `${degree} — ${school.tuition[degree as keyof typeof school.tuition]}`
      : Object.entries(school.tuition)[0]?.join(": ");
    alert(`Application started for ${school.name}\nProgram: ${chosen || "(select program on next step)"}`);
  }

  function handleTalentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const name = form.get("name");
    const email = form.get("email");
    const track = form.get("track");
    alert(`Thanks ${name}! Our placement team will contact you at ${email} about ${track}.`);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(180deg, ${COLORS.soft} 0%, #ffffff 100%)` }}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: COLORS.primary }}>
              G
            </div>
            <div>
              <div className="font-semibold" style={{ color: COLORS.slate }}>GlobalPath</div>
              <div className="text-xs text-slate-500">Study Abroad & Talent Placement</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#programs" className="hover:text-slate-900">Programs</a>
            <a href="#placement" className="hover:text-slate-900">Talent Placement</a>
            <a href="#insights" className="hover:text-slate-900">Insights</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          <a href="#apply" className="px-4 py-2 rounded-xl text-white font-medium" style={{ background: COLORS.accent }}>
            Get Counseling
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <FramerWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight" style={{ color: COLORS.slate }}>
              Study Abroad, then <span style={{ color: COLORS.primary }}>Launch Your Career</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Explore programs across the UK, US, Canada, Ireland, Germany & Austria. Secure admission, and get matched to
              internships & graduate roles through our <span className="font-semibold">Talent Placement</span> network.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge><Globe2 className="w-3.5 h-3.5 mr-1" /> 6 Countries</Badge>
              <Badge><GraduationCap className="w-3.5 h-3.5 mr-1" /> BSc · MSc · PhD</Badge>
              <Badge><TrendingUp className="w-3.5 h-3.5 mr-1" /> Career Fast-Track</Badge>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="#programs" className="px-5 py-3 rounded-xl text-white font-medium flex items-center gap-2" style={{ background: COLORS.primary }}>
                Browse Programs <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#placement" className="px-5 py-3 rounded-xl font-medium border border-slate-300">
                Talent Placement
              </a>
            </div>
          </FramerWrapper>

          <FramerWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative rounded-3xl p-1 bg-white shadow-lg border border-slate-200">
              <div className="rounded-2xl p-6 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.highlight} 100%)` }}>
                <div className="text-white/90 text-sm">Smart Search</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-white/80 text-xs">Keyword</span>
                    <div className="mt-1 flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                      <Search className="w-4 h-4 text-white/80" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="University, city, faculty…"
                        className="bg-transparent outline-none placeholder:text-white/70 text-white w-full"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-white/80 text-xs">Country</span>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1 w-full bg-white text-slate-800 rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="">Any</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-white/80 text-xs">Degree</span>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="mt-1 w-full bg-white text-slate-800 rounded-xl px-3 py-2 outline-none"
                    >
                      <option value="">Any</option>
                      {DEGREES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-white/80 text-xs">Faculty</span>
                    <input
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      placeholder="e.g., Computer Science"
                      className="mt-1 w-full bg-white rounded-xl px-3 py-2 outline-none"
                    />
                  </label>
                </div>
                <div className="mt-4 text-xs text-white/80">
                  Tip: combine country + degree + faculty to get laser‑focused matches.
                </div>
              </div>
            </div>
          </FramerWrapper>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" id="insights">
        <Stat icon={Globe2} label="Partner Countries" value="6" />
        <Stat icon={BookOpen} label="Programs Catalog" value={`${SCHOOLS.length}+`} />
        <Stat icon={Briefcase} label="Placement Partners" value="120+" />
        <Stat icon={CheckCircle2} label="Visa Success" value="98%*" />
      </section>

      {/* Programs */}
      <section id="programs" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.slate }}>
            Explore Programs
          </h2>
          <span className="text-sm text-slate-500">Showing {filtered.length} of {SCHOOLS.length}</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <FramerWrapper key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${COLORS.soft}, #ffffff)` }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                  <Badge><MapPin className="w-3.5 h-3.5 mr-1" />{s.city}</Badge>
                </div>
                <div className="text-sm text-slate-600 mt-1">{s.country}</div>
              </div>
              <div className="p-5 space-y-3 flex-1">
                <div className="flex flex-wrap gap-2">
                  {s.degrees.map((d) => (
                    <span key={d} className="text-xs px-2 py-1 rounded-full border border-slate-200">{d}</span>
                  ))}
                </div>
                <div>
                  <div className="text-xs text-slate-500">Faculties</div>
                  <div className="text-sm">{s.faculties.join(", ")}</div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {Object.entries(s.tuition).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-slate-500">Tuition ({k}):</span>
                      <span className="font-medium">{v as string}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Deposit:</span>
                    <span className="font-medium">{s.deposit}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500">Intakes:</span>
                    <div className="text-right">
                      {s.intakes.map((i) => (
                        <div key={i}>{i}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 flex items-center gap-3 mt-auto">
                <button onClick={() => handleApply(s)} className="px-4 py-2 rounded-xl text-white font-medium flex items-center gap-2" style={{ background: COLORS.primary }}>
                  <GraduationCap className="w-4 h-4" /> Apply
                </button>
                <a href="#placement" className="px-4 py-2 rounded-xl font-medium border border-slate-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Placement
                </a>
              </div>
            </FramerWrapper>
          ))}
        </div>
      </section>

      {/* Insights / Charts */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4" />
              <div className="font-semibold">Programs by Country</div>
            </div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={countryChartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <div className="font-semibold">Degree Availability</div>
            </div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={degreeChartData} dataKey="value" nameKey="name" outerRadius={100}>
                    {degreeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Placement */}
      <section id="placement" className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl overflow-hidden border border-slate-200">
          <div className="p-6 lg:p-10 text-white" style={{ backgroundImage: `linear-gradient(120deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            <h2 className="text-2xl lg:text-3xl font-bold">Talent Placement Program</h2>
            <p className="mt-2 text-white/90 max-w-3xl">
              From day one, gain access to career coaching, resume clinics, interview prep, and guaranteed interview
              pipelines with partner companies. Intern during studies and convert to full‑time after graduation.
            </p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[{
                title: "Internships (6–12 months)",
                desc: "Paid placements with SMEs and scale‑ups in tech, finance, and healthcare.",
                icon: Briefcase,
              }, {
                title: "Graduate Roles",
                desc: "Curated graduate schemes and junior roles with relocation support.",
                icon: TrendingUp,
              }, {
                title: "Career Coaching",
                desc: "Portfolio building, mock interviews, and visa guidance for post‑study work.",
                icon: CheckCircle2,
              }].map((f, i) => (
                <div key={i} className="rounded-2xl bg-white text-slate-800 p-5">
                  <f.icon className="w-6 h-6" />
                  <div className="font-semibold mt-2">{f.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 lg:p-10 grid lg:grid-cols-2 gap-8">
            <div>
              <div className="font-semibold text-lg flex items-center gap-2" style={{ color: COLORS.slate }}>
                <Briefcase className="w-5 h-5" /> Partner Companies
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Acme Tech", "Health+", "FinEdge", "DataWorks", "GreenGrid", "BlueSky AI"].map((p) => (
                  <div key={p} className="rounded-xl border border-slate-200 p-3 text-center text-sm">
                    {p}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-slate-600">
                *Placement availability varies by country, visa route and field of study.
              </div>
            </div>
            <div>
              <div className="font-semibold text-lg mb-3" style={{ color: COLORS.slate }}>Join the Placement Pipeline</div>
              <form onSubmit={handleTalentSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs text-slate-600">Full Name</span>
                    <input name="name" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-slate-600">Email</span>
                    <input type="email" name="email" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs text-slate-600">Target Country</span>
                  <select name="country" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none">
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-slate-600">Career Track</span>
                  <select name="track" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none">
                    {["Software Engineering", "Data/AI", "Business/Finance", "Health", "Design"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-slate-600">Portfolio / LinkedIn (optional)</span>
                  <input name="portfolio" placeholder="https://…" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none" />
                </label>
                <button className="w-full px-4 py-3 rounded-xl text-white font-semibold" style={{ background: COLORS.highlight }}>
                  Join Talent Pool
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Apply / Contact */}
      <section id="apply" className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
          <div className="p-6 lg:p-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-2xl font-bold" style={{ color: COLORS.slate }}>Free Counseling & Admissions Support</div>
              <p className="mt-2 text-slate-600">
                Get a personalized shortlist, document checklist, scholarship tips, and a visa-readiness plan. We handle the
                heavy lifting—so you can focus on your future.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[{ icon: Calendar, text: "Intake Planning" }, { icon: BookOpen, text: "SOP & Docs" }, { icon: CheckCircle2, text: "Visa Prep" }].map((i, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <i.icon className="w-4 h-4" /> {i.text}
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); alert(`Thanks ${f.get("fullName")}! We'll reach out at ${f.get("email")}.`); (e.currentTarget as HTMLFormElement).reset(); }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-slate-600">Full Name</span>
                  <input name="fullName" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs text-slate-600">Email</span>
                  <input type="email" name="email" required className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs text-slate-600">Desired Program</span>
                <select name="desiredProgram" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none">
                  {DEGREES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-slate-600">Preferred Country</span>
                <select name="preferredCountry" className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 outline-none">
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <button className="w-full px-4 py-3 rounded-xl text-white font-semibold" style={{ background: COLORS.accent }}>
                Request Free Counseling
              </button>
            </form>
          </div>
          <div className="px-6 lg:px-10 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@globalpath.example</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +234 800 000 0000</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} GlobalPath Education Ltd.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
