import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://sgwqciihmrkxvmrczmhh.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnd3FjaWlobXJreHZtcmN6bWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3ODc3NTQsImV4cCI6MjEwNzM2Mzc1NH0.vZalXWhIEo3DDgIgiFdMNipC48-WTfWJdcWl0WZV8Uw';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

function cleanVal(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str.toLowerCase() === 'null' || str.toLowerCase() === 'none' || str.toLowerCase() === 'n/a' || str === '') {
    return '';
  }
  return str;
}

function mapRow(row, index) {
  const name = cleanVal(row.name) || 'Not found';
  const rawCountry = cleanVal(row.country);
  const country = rawCountry || 'Not found';
  const stateProvince = cleanVal(row['state-province'] || row.state_province || '');

  let location = 'Not found';
  if (stateProvince && rawCountry) {
    location = `${stateProvince}, ${rawCountry}`;
  } else if (stateProvince) {
    location = stateProvince;
  } else if (rawCountry) {
    location = rawCountry;
  }

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

  const contact = cleanVal(row.contact) || 'Not found';
  const rank = cleanVal(row.rank) || 'Not found';
  const entry = cleanVal(row.entry) || 'Not found';
  const costShape = cleanVal(row.cost_shape) || 'Not found';
  const provider = cleanVal(row._provider);
  const modelUsed = cleanVal(row._model_used);
  const isAiEstimate = Boolean(provider || modelUsed || row.is_ai_estimate ||
    entry.toLowerCase().includes('ai estimate') ||
    costShape.toLowerCase().includes('ai estimate'));

  let domainsList = [];
  if (Array.isArray(row.domains)) {
    domainsList = row.domains.map(cleanVal).filter(Boolean);
  } else if (typeof row.domains === 'string' && row.domains.trim()) {
    try {
      const clean = row.domains.replace(/^\{|\}$/g, '');
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed)) domainsList = parsed.map(cleanVal).filter(Boolean);
      else domainsList = [clean];
    } catch {
      domainsList = row.domains.replace(/^\{|\}$/g, '').split(',').map(s => s.replace(/^["']|["']$/g, '').trim()).filter(Boolean);
    }
  }

  return {
    id: row._source_row ? `row-${row._source_row}` : `uni-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`,
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
    domains: domainsList.length > 0 ? domainsList : undefined
  };
}

async function syncAllUniversities() {
  console.log(`[OpenDoors Sync] Connecting to Supabase project at ${SUPABASE_URL}...`);
  const PAGE_SIZE = 1000;
  let allRows = [];
  let page = 0;
  let keepFetching = true;

  const startTime = Date.now();

  while (keepFetching) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    process.stdout.write(`[OpenDoors Sync] Fetching range ${from} - ${to}... `);
    const { data, error } = await client
      .from('universities')
      .select('*')
      .range(from, to);

    if (error) {
      console.error(`\n[OpenDoors Sync] Error fetching range ${from}-${to}:`, error.message);
      break;
    }

    if (data && data.length > 0) {
      allRows.push(...data);
      console.log(`Received ${data.length} records (Total so far: ${allRows.length})`);
      if (data.length < PAGE_SIZE) {
        keepFetching = false;
      } else {
        page++;
      }
    } else {
      console.log('No more records.');
      keepFetching = false;
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n========================================`);
  console.log(`[OpenDoors Sync] Sync complete in ${durationSec}s!`);
  console.log(`[OpenDoors Sync] Total universities fetched: ${allRows.length}`);
  console.log(`========================================\n`);

  if (allRows.length > 0) {
    const mapped = allRows.map((r, i) => mapRow(r, i));

    // Save to public/data/universities.json so the web app can instantly load and cache it
    const publicDataDir = path.resolve(__dirname, '../public/data');
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }
    const publicFilePath = path.join(publicDataDir, 'universities.json');
    fs.writeFileSync(publicFilePath, JSON.stringify(mapped));
    console.log(`[OpenDoors Sync] Saved ${mapped.length} universities to: ${publicFilePath} (${(fs.statSync(publicFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);

    // Also write sync metadata
    fs.writeFileSync(
      path.join(publicDataDir, 'sync-meta.json'),
      JSON.stringify({
        lastSync: new Date().toISOString(),
        totalCount: mapped.length,
        source: SUPABASE_URL
      }, null, 2)
    );
  }
}

syncAllUniversities().catch(err => {
  console.error('[OpenDoors Sync] Fatal error during sync:', err);
  process.exit(1);
});
