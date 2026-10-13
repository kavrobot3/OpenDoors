import { TopologyNode } from '../types';

export const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 1,
    title: 'Default Coaching Pipeline',
    tag: 'High Burnout',
    tagClass: 'bg-[#ffdad6] text-[#93000a]',
    shortDesc: 'IIT-JEE / NEET singular focus • 2.4% acceptance funnel',
    fullDesc: 'The traditional coaching track costs ₹4–8 Lakhs upfront across residential batches. While prestigious, it forces high cognitive narrowing and leads to massive drop-year anxiety when sub-2% selection ratios occur.',
    exitMetric: '2.4% Core Seat Funnel',
    prerequisites: ['Class 12 PCM/PCB with 75%+ aggregate', 'Intensive 10-14hr daily problem drills', 'Entrance cutoff clearance'],
    risks: 'High emotional burnout, private deemed university predatory backup traps charging ₹20L+ donations.'
  },
  {
    id: 2,
    title: 'Actuarial Science & Quantitative Risk',
    tag: 'Math Heavy',
    tagClass: 'bg-[#ffdbcf] text-[#2b160f]',
    shortDesc: 'IAI / IFoA certification paths alongside B.Stat or B.Sc.',
    fullDesc: 'A direct mathematical vector bypassing traditional engineering rat-races. Prepares students for financial mathematics, predictive risk modeling, and pension calculation with recognized certifications from Institute of Actuaries of India or UK IFoA.',
    exitMetric: '₹14L–₹22L Median 3-Yr Exit',
    prerequisites: ['High fluency in calculus and statistics', 'ACET (Actuarial Common Entrance Test)', 'Simultaneous Bachelor enrollment (B.Sc Math/Stat/Econ)'],
    risks: 'Rigorous 13-paper examination ladder requiring dedicated study alongside employment.'
  },
  {
    id: 3,
    title: 'Lateral Diploma to Degree (Polytechnic)',
    tag: 'Zero Debt',
    tagClass: 'bg-[#ece0d6] text-[#4a3229]',
    shortDesc: 'Direct 2nd year B.Tech entry with hands-on lab credentials',
    fullDesc: 'State board polytechnic diploma after Class 10/12 followed by Lateral Entry Entrance Test (LEET) directly into Year 2 of Government Engineering Colleges. Zero student loans, heavy hands-on machining and CAD fabrication experience.',
    exitMetric: 'Zero Student Debt / Direct Year 2 Admit',
    prerequisites: ['3-Year State Board Technical Diploma', 'State LEET merit ranking', 'Minimum 60% diploma marks'],
    risks: 'Lower initial brand visibility than Tier-1 institutes, though completely mitigated after 2 years of work experience.'
  },
  {
    id: 4,
    title: 'Funded European Degrees (DAAD / TUM / Scandinavia)',
    tag: '€0 Tuition',
    tagClass: 'bg-[#ffdbce] text-[#2b160f]',
    shortDesc: 'English-taught Bachelor programs in Germany & Scandinavia',
    fullDesc: 'Public universities in Germany and Scandinavia offer world-class engineering, computing, and natural science education with €0 base tuition fees for both domestic and international undergraduates.',
    exitMetric: 'Global Degree / 18-Mo Post-Study Job Seeker Visa',
    prerequisites: ['13-year education equivalency (Studienkolleg or 1 year Indian Bachelor / JEE Adv qualification)', 'Goethe B2/C1 or IELTS 6.5+ for English tracks', 'Mandatory blocked bank account (€992/mo) for living expenses'],
    risks: 'Tight rental housing markets in Munich, Berlin, and Aachen. Bureaucratic visa appointment waitlists.'
  },
  {
    id: 5,
    title: 'Research Academies (IISc, IISER, NISER)',
    tag: 'IAT / Stipend',
    tagClass: 'bg-[#ffd9df] text-[#370b18]',
    shortDesc: 'Funded stipend programs for core science & biotechnology',
    fullDesc: 'Autonomous apex institutes funded directly by the Ministry of Education and Department of Atomic Energy. Focuses on pure physics, molecular biology, pure mathematics, and earth sciences with INSPIRE/KVPY fellowship stipends.',
    exitMetric: 'Direct PhD Admissions at Max Planck, MIT, Cambridge',
    prerequisites: ['IISER Aptitude Test (IAT) or NEST (for NISER/UM-DAE CEBS)', 'Strong conceptual understanding across all 4 subjects (PCMB)', 'JEE Advanced high rank cutoff for IISc BS'],
    risks: 'Not geared toward traditional IT corporate placements on Day-Zero; designed for pure research, R&D labs, and academic science.'
  }
];
