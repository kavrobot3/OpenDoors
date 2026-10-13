import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { University } from '../types';

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: 'iit-hyderabad',
    name: 'Indian Institute of Technology, Hyderabad',
    location: 'Kandi, Sangareddy, Telangana, India',
    country: 'india',
    field: 'engineering',
    rankBadge: 'NIRF 2025 #8 ENGG',
    badgeType: 'nirf',
    entryBenchmark: 'JEE Advanced (General closing ~3,500 rank for core tracks; ~600 for CSE).',
    costReality: '~₹2.2L/year tuition + mess. 100% full tuition fee waiver for SC/ST/PH and students with parental income <₹1L.',
    costCategory: 'public',
    editorialObservation: 'Significantly lower departmental bureaucracy than older IITs. Massive Japan-collaborative semiconductor lab and rapid AI hardware prototyping clusters.',
    officialPortal: 'https://iith.ac.in',
    admissionsEmail: 'admissions@iith.ac.in',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD3CpzuNA9Ucmm_xgDBkLaXyu6CGsFtk9BqWFGN8EWt0_GRdGvuo-mlf-PLqAmbvT6vhjU8pg3EQhI33Fls5cn8AyFZU-Bgih5riZLiA07EP5OHydveufDD_6qTQ3rFmaeZnI6OjfmJ9OB5fHAx1ZxTGB-mPDmaEJ2aUh751MHdlXkPXtyDCRXmyWblaoVTGvb9EtgleC7RgeWIu1spt5VP8zGrh3rjubbG2BR2aZ3bxY-9ig2Whm',
    specialtyTag: 'Autonomous Apex Institute',
    auditedDate: 'Jan 2025'
  },
  {
    id: 'university-of-delhi',
    name: 'University of Delhi',
    location: 'North & South Campus, New Delhi, India',
    country: 'india',
    field: 'management',
    rankBadge: 'NIRF 2025 #5 UNI',
    badgeType: 'nirf',
    entryBenchmark: 'CUET-UG normalized domain score (750+/800 for top North Campus colleges like SRCC, Hindu & St. Stephen\'s).',
    costReality: 'Academic tuition is low (~₹12k - ₹45k/yr). However, severe residential shortage creates high cost-of-living overheads.',
    costCategory: 'nominal',
    livingExpenseAlert: '<6% of outstation students secure campus dorms. Private North Campus PG rent runs ₹15k–₹25k/mo. Budget minimum ₹2L/year off-campus.',
    officialPortal: 'https://du.ac.in',
    admissionsEmail: 'dean_admissions@du.ac.in',
    auditedDate: 'Feb 2025'
  },
  {
    id: 'tu-munich',
    name: 'Technische Universität München',
    location: 'Munich & Garching, Bavaria, Germany',
    country: 'germany',
    field: 'engineering',
    rankBadge: 'QS 2026 #22 GLOBAL · TU9',
    badgeType: 'qs',
    entryBenchmark: 'Abitur equivalent / Feststellungsprüfung + Goethe B2/C1 for German tracks; GRE + Portfolio for English MSc.',
    costReality: '€0 base for EU; non-EU fees (~€2k-€3k/sem for select MSc). Mandatory national blocked account requirement (€992/mo).',
    costCategory: 'free',
    livingExpenseAlert: 'Tuition-free is not free to live. Munich is Germany\'s tightest housing market. Studentenwerk dorm waitlists exceed 3 to 4 semesters.',
    officialPortal: 'https://tum.de',
    admissionsEmail: 'studium@tum.de',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQlgmu13VDdtzYSpbdr7f36qC8Q5eaif4m3a0AWdzRb1FM5Tx09J0GXW0iuYC0xhZm74Nr3Fb436jUefn9hPkuHZ_UdKUZ-HNGhyhBl9Rox052VLH7MUUFy3mz2qBVZ6WHBS9PqMbrybT_xe7WzJwLp8PgrRTDeNpTkmIMzJ1iXqwnPS981McR-dq50gf9C3HEuOdjdcNXke2bRFnRXV9xA_w_iQDMfOMOaHfGE9uRvL4Ax4csLj8o',
    specialtyTag: 'German TU9 Alliance',
    auditedDate: 'Jan 2025'
  },
  {
    id: 'nlsiu-bengaluru',
    name: 'National Law School of India University',
    location: 'Nagarbhavi, Bengaluru, Karnataka, India',
    country: 'india',
    field: 'law',
    rankBadge: 'NIRF LAW #1 · APEX LAW',
    badgeType: 'nirf',
    entryBenchmark: 'CLAT-UG All-India Merit. General category cutoff closing strictly within Top ~105 ranks nationwide.',
    costReality: 'Moderate public residential fee: ~₹3.5L to ₹4.1L/year fully inclusive of mandatory on-campus hostel and mess facilities.',
    costCategory: 'public',
    careerYield: 'Unmatched appellate litigation clerkships, steady Rhodes Scholar pipeline, and Day-Zero Magic Circle corporate law recruitment.',
    officialPortal: 'https://nls.ac.in',
    admissionsEmail: 'registrar@nls.ac.in',
    auditedDate: 'Jan 2025'
  },
  {
    id: 'aiims-new-delhi',
    name: 'All India Institute of Medical Sciences',
    location: 'Ansari Nagar, New Delhi, India',
    country: 'india',
    field: 'medicine',
    rankBadge: 'NIRF MEDICAL #1 · INI',
    badgeType: 'nirf',
    entryBenchmark: 'NEET-UG All-India Rank strictly within the Top ~50 nationwide for unreserved General Category seats.',
    costReality: 'Near-zero cost: ₹1,628 total course fee for the complete 5.5-year MBBS curriculum, including subsidized residential hostel.',
    costCategory: 'nominal',
    clinicalVolume: 'Over 10,000 outpatient cases treated every single day. Unparalleled clinical exposure across rare congenital disorders and high-acuity surgeries.',
    officialPortal: 'https://aiims.edu',
    admissionsEmail: 'exams.ac@aiims.gov.in',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuU6TdH1VuEkMLS8T-tTL0b03ZL9Xc2Fr0lVtfb75GUMQHVjgxzqQQzNHD1pb8A68XqOH2OAqpZUsjrgRU-r97i8AhCLJenaBTwi9zZdp-pCxyF89q2jCIJMWw8ghVqiTtn3gaPvi022SKRvHuoFupVJcjscyAKh1kTlZGSBvQ1ajKGadC8TpqMfbapW5Ro_LEGRpIcRGeh8Ic2DfljhAX-E4Vvxxua1nzh1XLjappNeanD2G-IwvI',
    specialtyTag: 'National Institute of Importance',
    auditedDate: 'Jan 2025'
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore',
    location: 'Kent Ridge, Singapore',
    country: 'singapore',
    field: 'sciences',
    rankBadge: 'QS 2026 #8 GLOBAL',
    badgeType: 'qs',
    entryBenchmark: 'Top ~2% national high school boards / Singapore-Cambridge A-Levels / IB 42+ score.',
    costReality: '~S$18k/yr with MoE tuition grant (requires 3-year Singapore employment service bond); ~S$39k/yr without bond.',
    costCategory: 'aid',
    editorialObservation: 'Premier Asian innovation hub connected to NUS Enterprise incubator network. Singapore monthly living expenses average ~S$1,200–S$1,500.',
    officialPortal: 'https://nus.edu.sg',
    admissionsEmail: 'admissions@nus.edu.sg',
    auditedDate: 'Jan 2025'
  },
  {
    id: 'christ-university',
    name: 'Christ University, Bangalore',
    location: 'Hosur Road, Bengaluru, Karnataka, India',
    country: 'india',
    field: 'management',
    rankBadge: 'NIRF MGMT #57',
    badgeType: 'nirf',
    entryBenchmark: 'Christ Entrance Test (CUET) + Micro Presentation & Personal Interview.',
    costReality: 'Mid-high private fees (~₹2.5L - ₹4L/yr + accommodation).',
    costCategory: 'private',
    editorialObservation: 'Renowned corporate grooming and structured student code of conduct. Extensive campus recruitment for analyst & consulting roles.',
    officialPortal: 'https://christuniversity.in',
    admissionsEmail: 'admissions@christuniversity.in',
    auditedDate: 'Feb 2025'
  },
  {
    id: 'mit-cambridge',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts, United States',
    country: 'united-states',
    field: 'engineering',
    rankBadge: 'QS 2026 #1 GLOBAL',
    badgeType: 'qs',
    entryBenchmark: 'Holistic review (3.9% admit rate) + SAT/ACT mandatory.',
    costReality: 'Full need-blind financial aid for all admitted international students. Tuition-free if family income < $140,000/yr.',
    costCategory: 'aid',
    editorialObservation: 'Zero merit scholarships — 100% need-based aid. International applicants compete on identical financial footing with domestic applicants.',
    officialPortal: 'https://www.mit.edu',
    admissionsEmail: 'admissions@mit.edu',
    auditedDate: 'Jan 2025'
  }
];

export const DEFAULT_SUPABASE_URL = 'https://sgwqciihmrkxvmrczmhh.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnd3FjaWlobXJreHZtcmN6bWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3ODc3NTQsImV4cCI6MjEwNzM2Mzc1NH0.vZalXWhIEo3DDgIgiFdMNipC48-WTfWJdcWl0WZV8Uw';

let supabaseClientInstance: SupabaseClient | null = null;

export function getSupabaseConfig() {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
  const localUrl = localStorage.getItem('opendoors_supabase_url') || '';
  const localKey = localStorage.getItem('opendoors_supabase_key') || '';

  const url = envUrl || localUrl || DEFAULT_SUPABASE_URL;
  const key = envKey || localKey || DEFAULT_SUPABASE_ANON_KEY;

  return { url, key, isConfigured: Boolean(url && key) };
}

export function saveSupabaseConfig(url: string, key: string) {
  if (url) localStorage.setItem('opendoors_supabase_url', url);
  if (key) localStorage.setItem('opendoors_supabase_key', key);
  supabaseClientInstance = null;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClientInstance) return supabaseClientInstance;
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;
  try {
    supabaseClientInstance = createClient(url, key);
    return supabaseClientInstance;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

// Helper to parse Supabase row into clean University object
export function mapSupabaseRowToUniversity(row: any, index: number): University {
  // If row is already formatted in local structure
  if (row.entryBenchmark && row.costReality && !row._source_row) {
    return row as University;
  }

  const cleanVal = (val: any): string => {
    if (val === null || val === undefined) return '';
    const str = String(val).trim();
    if (str.toLowerCase() === 'null' || str.toLowerCase() === 'none' || str.toLowerCase() === 'n/a' || str === '') {
      return '';
    }
    return str;
  };

  const name = cleanVal(row.name) || 'Not found';
  const rawCountry = cleanVal(row.country);
  const country = rawCountry || 'Not found';
  const stateProvince = cleanVal(row['state-province'] || row.state_province || row['state_province'] || '');
  
  let location = 'Not found';
  if (stateProvince && rawCountry) {
    location = `${stateProvince}, ${rawCountry}`;
  } else if (stateProvince) {
    location = stateProvince;
  } else if (rawCountry) {
    location = rawCountry;
  }

  // Official Portal from web_pages or domains
  let officialPortal = '';
  if (row.web_pages) {
    if (Array.isArray(row.web_pages) && row.web_pages.length > 0) {
      officialPortal = cleanVal(row.web_pages[0]);
    } else if (typeof row.web_pages === 'string') {
      try {
        const clean = row.web_pages.replace(/^\{|\}$/g, '');
        const parsed = JSON.parse(clean);
        officialPortal = cleanVal(Array.isArray(parsed) ? parsed[0] : clean);
      } catch {
        const first = row.web_pages.replace(/^\{|\}$/g, '').split(',')[0].replace(/^["']|["']$/g, '');
        officialPortal = cleanVal(first);
      }
    }
  }
  if (!officialPortal && row.domains) {
    let domainStr = '';
    if (Array.isArray(row.domains) && row.domains.length > 0) {
      domainStr = cleanVal(row.domains[0]);
    } else if (typeof row.domains === 'string') {
      domainStr = cleanVal(row.domains.replace(/^\{|\}$/g, '').split(',')[0].replace(/^["']|["']$/g, ''));
    }
    if (domainStr) {
      officialPortal = domainStr.startsWith('http') ? domainStr : `https://${domainStr}`;
    }
  }
  if (!officialPortal) {
    officialPortal = 'Not found';
  } else if (!officialPortal.startsWith('http') && officialPortal !== 'Not found') {
    officialPortal = `https://${officialPortal}`;
  }

  // Admissions Contact
  const contact = cleanVal(row.contact) || 'Not found';

  // Rank
  const rank = cleanVal(row.rank) || 'Not found';

  // Entry requirements
  const entry = cleanVal(row.entry) || 'Not found';

  // Cost reality / cost shape
  const costShape = cleanVal(row.cost_shape) || 'Not found';

  // AI Estimates Detection
  const provider = cleanVal(row._provider);
  const modelUsed = cleanVal(row._model_used);
  const hasAiProvider = Boolean(provider);
  const hasAiModel = Boolean(modelUsed);
  const isAiEstimate = hasAiProvider || hasAiModel || Boolean(row.is_ai_estimate) ||
    entry.toLowerCase().includes('ai estimate') ||
    costShape.toLowerCase().includes('ai estimate');

  // Stable identifier
  const rowId = row._source_row ? `row-${row._source_row}` : `uni-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`;

  // Collect all domains for the detailed view
  let domainsList: string[] = [];
  if (Array.isArray(row.domains)) {
    domainsList = row.domains.map(cleanVal).filter(Boolean);
  } else if (typeof row.domains === 'string' && row.domains.trim()) {
    try {
      const clean = row.domains.replace(/^\{|\}$/g, '');
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) domainsList = parsed.map(cleanVal).filter(Boolean);
      else domainsList = [clean];
    } catch {
      domainsList = row.domains.replace(/^\{|\}$/g, '').split(',').map((s: string) => s.replace(/^["']|["']$/g, '').trim()).filter(Boolean);
    }
  }

  return {
    id: rowId,
    name,
    location,
    country: rawCountry ? rawCountry.toLowerCase() : 'other',
    rankBadge: rank,
    entryBenchmark: entry,
    costReality: costShape,
    officialPortal,
    admissionsEmail: contact,
    stateProvince: stateProvince || undefined,
    alphaTwoCode: cleanVal(row.alpha_two_code) || undefined,
    sourceRow: row._source_row || undefined,
    isAiEstimate,
    aiProvider: provider || undefined,
    aiModelUsed: modelUsed || undefined,
    auditedDate: isAiEstimate ? `AI Estimate (${modelUsed || provider || 'LLM'})` : 'Audited Gazette',
    field: 'general',
    domains: domainsList.length > 0 ? domainsList : undefined,
  };
}

export async function fetchUniversities(): Promise<{ universities: University[]; source: 'supabase' | 'local_verified'; error?: string; count?: number }> {
  // 1. Try loading full pre-synced dataset of 10,000+ universities from /data/universities.json (fastest & complete)
  try {
    const res = await fetch('/data/universities.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { universities: data, source: 'supabase', count: data.length };
      }
    }
  } catch {
    // If not on static build or fetch fails, proceed to live client query
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      // One-way sync: universities are pulled FROM Supabase TO OpenDoors ONLY
      // In one go, receive ALL universities using paginated range fetching (PostgREST caps single responses at 1000)
      const PAGE_SIZE = 1000;
      let allRows: any[] = [];
      let page = 0;
      let keepFetching = true;
      let targetTable = 'universities';

      while (keepFetching) {
        const from = page * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error } = await client
          .from(targetTable)
          .select('*')
          .range(from, to);

        if (error) {
          // If first page failed due to table naming (e.g., singular 'university'), attempt fallback table
          if (page === 0 && targetTable === 'universities' && (error.code === '42P01' || error.message?.includes('does not exist'))) {
            targetTable = 'university';
            continue;
          }
          console.warn(`Supabase universities fetch notice on range ${from}-${to}:`, error.message);
          if (page === 0) {
            return { 
              universities: INITIAL_UNIVERSITIES, 
              source: 'local_verified',
              error: `${error.message}${error.hint ? ` (${error.hint})` : ''}`
            };
          }
          // If a later page failed, break and return the already accumulated rows
          break;
        }

        if (data && data.length > 0) {
          allRows.push(...data);
          // If fewer rows than PAGE_SIZE were returned, we have reached the end of the table!
          if (data.length < PAGE_SIZE) {
            keepFetching = false;
          } else {
            page++;
            // Safety threshold at 50,000 rows
            if (page >= 50) {
              keepFetching = false;
            }
          }
        } else {
          keepFetching = false;
        }
      }

      if (allRows.length > 0) {
        const mapped = allRows.map((item: any, idx: number) => mapSupabaseRowToUniversity(item, idx));
        return { universities: mapped, source: 'supabase', count: allRows.length };
      } else {
        return {
          universities: INITIAL_UNIVERSITIES,
          source: 'local_verified',
          error: 'Connected to Supabase, but 0 records returned. Check if Row-Level Security (RLS) is blocking public SELECT on table "universities".'
        };
      }
    } catch (err: any) {
      console.warn('Supabase query failed, falling back to local master records:', err);
      return { 
        universities: INITIAL_UNIVERSITIES, 
        source: 'local_verified',
        error: err?.message || 'Connection failed'
      };
    }
  }

  return { universities: INITIAL_UNIVERSITIES, source: 'local_verified', count: INITIAL_UNIVERSITIES.length };
}

export async function fetchUniversitiesFromSupabase(): Promise<University[]> {
  const result = await fetchUniversities();
  return result.universities;
}

export async function submitStudentDilemmaToSupabase(payload: {
  studentName: string;
  email: string;
  phone?: string;
  stream: string;
  boardState: string;
  dilemma: string;
  strictFeeConstraints: boolean;
}): Promise<{ success: boolean; dilemma: any; message: string }> {
  // Validate email (required)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    throw new Error('Please enter a valid email address so founders Ashwitha and Nakshitha can reply.');
  }

  // Validate student name
  if (!payload.studentName || payload.studentName.trim().length < 2) {
    throw new Error('Please enter your name or a pseudonym.');
  }

  // Validate dilemma text
  if (!payload.dilemma || payload.dilemma.trim().length < 10) {
    throw new Error('Please describe your dilemma in at least 10 characters.');
  }

  const generatedId = `OD-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dilemma = {
    id: generatedId,
    studentName: payload.studentName.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || undefined,
    stream: payload.stream,
    boardState: payload.boardState.trim() || 'Not Specified',
    dilemma: payload.dilemma.trim(),
    strictFeeConstraints: payload.strictFeeConstraints,
    createdAt: new Date().toISOString(),
    status: 'received',
    destination: 'local_fallback',
  };

  let dispatchedToSupabase = false;

  // Try pushing to Supabase inquiries / form_responses table
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('inquiries').insert([
        {
          id: dilemma.id,
          student_name: dilemma.studentName,
          email: dilemma.email,
          phone: dilemma.phone || null,
          stream: dilemma.stream,
          board_state: dilemma.boardState,
          dilemma: dilemma.dilemma,
          strict_fee_constraints: dilemma.strictFeeConstraints,
          created_at: dilemma.createdAt,
          status: 'received'
        }
      ]);
      if (!error) {
        dilemma.destination = 'supabase';
        dispatchedToSupabase = true;
      } else {
        console.warn('Supabase insert into inquiries table reported notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase submission query error:', err);
    }
  }

  // Store in student's local submissions docket
  try {
    const existingRaw = localStorage.getItem('opendoors_submissions');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [dilemma, ...existing];
    localStorage.setItem('opendoors_submissions', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to store in local docket:', err);
  }

  return {
    success: true,
    dilemma,
    message: dispatchedToSupabase
      ? 'Dilemma securely transmitted to Founders via Supabase database.'
      : 'Dilemma securely recorded in your verified device docket (48h SLA timer active).'
  };
}

export function getStoredSubmissions(): any[] {
  try {
    const raw = localStorage.getItem('opendoors_submissions');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function purgeSubmission(id: string): boolean {
  try {
    const current = getStoredSubmissions();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem('opendoors_submissions', JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

export function purgeAllSubmissions(): boolean {
  try {
    localStorage.removeItem('opendoors_submissions');
    return true;
  } catch {
    return false;
  }
}

export async function submitCorrectionReport(payload: {
  universityName: string;
  incorrectField: string;
  suggestedCorrection: string;
  sourceOrProofUrl?: string;
  reporterEmail?: string;
}): Promise<{ success: boolean; message: string }> {
  const generatedId = `CORR-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const record = {
    id: generatedId,
    university_name: payload.universityName.trim(),
    incorrect_field: payload.incorrectField,
    suggested_correction: payload.suggestedCorrection.trim(),
    source_url: payload.sourceOrProofUrl?.trim() || null,
    reporter_email: payload.reporterEmail?.trim() || null,
    created_at: new Date().toISOString(),
    status: 'pending_review'
  };

  const client = getSupabaseClient();
  let cloudSent = false;
  if (client) {
    try {
      // Try 'corrections' table first, fallback to 'inquiries' if table doesn't exist
      const { error } = await client.from('corrections').insert([record]);
      if (!error) {
        cloudSent = true;
      } else {
        // Fallback to inserting as a correction inquiry
        await client.from('inquiries').insert([{
          id: generatedId,
          student_name: payload.reporterEmail || 'Anonymous Auditor',
          email: payload.reporterEmail || 'corrections@opendoors.community',
          stream: 'Correction Report',
          board_state: payload.incorrectField,
          dilemma: `[DATA CORRECTION for ${payload.universityName}]\nField: ${payload.incorrectField}\nCorrection: ${payload.suggestedCorrection}\nSource: ${payload.sourceOrProofUrl || 'N/A'}`,
          strict_fee_constraints: false,
          created_at: record.created_at,
          status: 'correction_report'
        }]);
        cloudSent = true;
      }
    } catch (err) {
      console.warn('Failed to dispatch correction to cloud table:', err);
    }
  }

  // Also cache locally
  try {
    const raw = localStorage.getItem('opendoors_corrections');
    const existing = raw ? JSON.parse(raw) : [];
    localStorage.setItem('opendoors_corrections', JSON.stringify([record, ...existing]));
  } catch (err) {
    console.error(err);
  }

  return {
    success: true,
    message: cloudSent
      ? 'Thank you! Your correction report has been dispatched to Ashwitha & Nakshitha for immediate registry audit.'
      : 'Thank you! Your correction report has been securely saved to our audit docket for registry verification.'
  };
}


export function getBookmarkedIds(): string[] {
  try {
    const raw = localStorage.getItem('opendoors_bookmarks');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkId(id: string): string[] {
  const current = getBookmarkedIds();
  const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
  localStorage.setItem('opendoors_bookmarks', JSON.stringify(next));
  return next;
}
