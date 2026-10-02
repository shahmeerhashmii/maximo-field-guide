import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const XLSX_PATH = path.resolve(ROOT, '..', 'data', 'Maximo_Glossary_Term_Map.xlsx');
const CONTENT_DOCS = path.join(ROOT, 'src', 'content', 'docs');
const REPORTS_DIR = path.join(ROOT, 'reports');

// Helpers
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function yamlEscape(val: string): string {
  if (!val) return "''";
  // Use block scalar for multiline, quoted for everything else
  if (val.includes('\n')) {
    const indented = val.split('\n').map(l => '  ' + l).join('\n');
    return `|\n${indented}`;
  }
  // Escape single quotes
  const escaped = val.replace(/'/g, "''");
  return `'${escaped}'`;
}

function cleanDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Read a row as a string-keyed object
function rowToObj(row: ExcelJS.Row, headers: string[]): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach((h, i) => {
    const cell = row.getCell(i + 1);
    let val = '';
    if (cell.value !== null && cell.value !== undefined) {
      if (typeof cell.value === 'object' && 'richText' in (cell.value as any)) {
        val = (cell.value as any).richText.map((r: any) => r.text).join('');
      } else {
        val = String(cell.value).trim();
      }
    }
    obj[h] = val;
  });
  return obj;
}

interface TermRecord {
  id: string;
  module: string;
  subarea: string;
  term: string;
  fieldCode: string;
  definition: string;
  whereInMaximo: string;
  riverbendExample: string;
  relatedTerms: string;
  commonMisconception: string;
  difficulty: string;
  versionNote: string;
  verifyIn: string;
  reviewStatus: string;
  reviewer: string;
  reviewerNotes: string;
  pageSlug: string;
}

interface ModuleRecord {
  module: string;
  whatItCovers: string;
}

interface LPRecord {
  path: string;
  step: string;
  term: string;
}

async function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.error(`ERROR: Cannot find spreadsheet at ${XLSX_PATH}`);
    process.exit(1);
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX_PATH);

  // ---- Read Term Map ----
  const termSheet = wb.getWorksheet('Term Map');
  if (!termSheet) throw new Error('Term Map sheet not found');

  const termHeaders: string[] = [];
  const headerRow = termSheet.getRow(1);
  headerRow.eachCell((cell, col) => {
    termHeaders[col - 1] = String(cell.value || '').trim();
  });

  const terms: TermRecord[] = [];
  for (let r = 2; r <= termSheet.rowCount; r++) {
    const row = termSheet.getRow(r);
    if (!row.getCell(1).value) continue;
    const obj = rowToObj(row, termHeaders);
    terms.push({
      id: obj['ID'] || '',
      module: obj['Module'] || '',
      subarea: obj['Sub-area'] || '',
      term: obj['Term'] || '',
      fieldCode: obj['Field / Code'] || '',
      definition: obj['Plain-English Definition'] || '',
      whereInMaximo: obj['Where in Maximo'] || '',
      riverbendExample: obj['Riverbend Water Example'] || '',
      relatedTerms: obj['Related Terms'] || '',
      commonMisconception: obj['Common Misconception'] || '',
      difficulty: obj['Difficulty'] || '',
      versionNote: obj['Version Note (7.6 / MAS)'] || '',
      verifyIn: obj['Verify In (IBM Docs area)'] || '',
      reviewStatus: obj['Review Status'] || '',
      reviewer: obj['Reviewer'] || '',
      reviewerNotes: obj['Reviewer Notes'] || '',
      pageSlug: obj['Page Slug'] || '',
    });
  }

  // ---- Read Modules ----
  const modSheet = wb.getWorksheet('Modules');
  if (!modSheet) throw new Error('Modules sheet not found');

  const modHeaders: string[] = [];
  const modHeaderRow = modSheet.getRow(1);
  modHeaderRow.eachCell((cell, col) => {
    modHeaders[col - 1] = String(cell.value || '').trim();
  });

  const modules: ModuleRecord[] = [];
  for (let r = 2; r <= modSheet.rowCount; r++) {
    const row = modSheet.getRow(r);
    if (!row.getCell(1).value) continue;
    const obj = rowToObj(row, modHeaders);
    const modName = obj['Module'] || obj[modHeaders[0]] || '';
    const covers = obj['What it covers'] || obj[modHeaders[1]] || '';
    // Skip formula/total rows: real modules start with a two-digit number
    if (modName && /^\d{2}\s/.test(modName)) {
      modules.push({ module: modName, whatItCovers: covers });
    }
  }

  // ---- Read Riverbend Water ----
  const rbSheet = wb.getWorksheet('Riverbend Water');
  if (!rbSheet) throw new Error('Riverbend Water sheet not found');

  const rbTitle = String(rbSheet.getRow(1).getCell(1).value || '').trim();
  const rbSubtitle = String(rbSheet.getRow(2).getCell(1).value || '').trim();
  const rbHeaderRow = rbSheet.getRow(4);
  const rbHeaders: string[] = [];
  rbHeaderRow.eachCell((cell, col) => {
    rbHeaders[col - 1] = String(cell.value || '').trim();
  });

  interface RBRecord { [key: string]: string }
  const rbRecords: RBRecord[] = [];
  for (let r = 5; r <= rbSheet.rowCount; r++) {
    const row = rbSheet.getRow(r);
    if (!row.getCell(1).value && !row.getCell(2).value) continue;
    const obj = rowToObj(row, rbHeaders);
    if (Object.values(obj).some(v => v)) rbRecords.push(obj);
  }

  // ---- Read Learning Paths ----
  const lpSheet = wb.getWorksheet('Learning Paths');
  if (!lpSheet) throw new Error('Learning Paths sheet not found');

  const lpHeaders: string[] = [];
  const lpHeaderRow = lpSheet.getRow(1);
  lpHeaderRow.eachCell((cell, col) => {
    lpHeaders[col - 1] = String(cell.value || '').trim();
  });

  const lpRows: LPRecord[] = [];
  for (let r = 2; r <= lpSheet.rowCount; r++) {
    const row = lpSheet.getRow(r);
    const obj = rowToObj(row, lpHeaders);
    const pathName = obj['Learning Path'] || '';
    const step = obj['Step'] || '';
    const term = obj['Term'] || '';
    if (pathName || step || term) {
      lpRows.push({ path: pathName, step, term });
    }
  }

  // Group LP rows - fill down path name
  let currentPath = '';
  const lpGroups: Map<string, string[]> = new Map();
  for (const row of lpRows) {
    if (row.path) currentPath = row.path;
    if (!currentPath) continue;
    if (!lpGroups.has(currentPath)) lpGroups.set(currentPath, []);
    if (row.term) lpGroups.get(currentPath)!.push(row.term);
  }

  // ---- Read Sources ----
  const srcSheet = wb.getWorksheet('Sources');
  if (!srcSheet) throw new Error('Sources sheet not found');

  const srcHeaders: string[] = [];
  const srcHeaderRow = srcSheet.getRow(1);
  srcHeaderRow.eachCell((cell, col) => {
    srcHeaders[col - 1] = String(cell.value || '').trim();
  });

  interface SrcRecord { source: string; what: string; url: string }
  const srcRecords: SrcRecord[] = [];
  for (let r = 2; r <= srcSheet.rowCount; r++) {
    const row = srcSheet.getRow(r);
    if (!row.getCell(1).value) continue;
    const obj = rowToObj(row, srcHeaders);
    srcRecords.push({
      source: obj['Source'] || obj[srcHeaders[0]] || '',
      what: obj['What it confirms'] || obj[srcHeaders[1]] || '',
      url: obj['URL'] || obj[srcHeaders[2]] || '',
    });
  }

  // ---- Build term lookup maps ----
  // Map from term name -> pageSlug (for related term linking)
  const termByExact: Map<string, string> = new Map();
  const termByCaseInsensitive: Map<string, string> = new Map();
  const termByBeforeParenOrSlash: Map<string, string> = new Map();

  for (const t of terms) {
    if (!t.term) continue;
    const slug = t.pageSlug || slugify(t.term);
    termByExact.set(t.term, slug);
    termByCaseInsensitive.set(t.term.toLowerCase(), slug);
    // Match text before " (" or " /"
    const beforeParen = t.term.split(' (')[0].split(' /')[0].trim();
    if (beforeParen !== t.term) {
      termByBeforeParenOrSlash.set(beforeParen.toLowerCase(), slug);
    }
  }

  function resolveRelatedTerm(name: string): { slug: string | null } {
    const n = name.trim();
    if (termByExact.has(n)) return { slug: termByExact.get(n)! };
    if (termByCaseInsensitive.has(n.toLowerCase())) return { slug: termByCaseInsensitive.get(n.toLowerCase())! };
    if (termByBeforeParenOrSlash.has(n.toLowerCase())) return { slug: termByBeforeParenOrSlash.get(n.toLowerCase())! };
    return { slug: null };
  }

  // ---- Generate term pages ----
  const termsDir = path.join(CONTENT_DOCS, 'terms');
  cleanDir(termsDir);

  const unmatchedRelated: Array<{ termId: string; termName: string; unmatched: string }> = [];
  let termsGenerated = 0;

  // Group terms by module for prev/next navigation
  const termsByModule: Map<string, TermRecord[]> = new Map();
  for (const t of terms) {
    if (!termsByModule.has(t.module)) termsByModule.set(t.module, []);
    termsByModule.get(t.module)!.push(t);
  }

  for (const t of terms) {
    if (!t.term || !t.pageSlug) continue;

    const moduleTerms = termsByModule.get(t.module) || [];
    const idx = moduleTerms.findIndex(x => x.pageSlug === t.pageSlug);
    const prev = idx > 0 ? moduleTerms[idx - 1] : null;
    const next = idx < moduleTerms.length - 1 ? moduleTerms[idx + 1] : null;

    // Resolve related terms
    const relatedList = t.relatedTerms
      ? t.relatedTerms.split(';').map(s => s.trim()).filter(Boolean)
      : [];

    const resolvedRelated: Array<{ label: string; slug: string | null }> = [];
    for (const rel of relatedList) {
      const { slug } = resolveRelatedTerm(rel);
      if (!slug) {
        unmatchedRelated.push({ termId: t.id, termName: t.term, unmatched: rel });
      }
      resolvedRelated.push({ label: rel, slug });
    }

    const relatedFrontmatter = resolvedRelated.length > 0
      ? `relatedTerms:\n${resolvedRelated.map(r => `  - label: ${yamlEscape(r.label)}\n    slug: ${r.slug ? yamlEscape(r.slug) : 'null'}`).join('\n')}`
      : 'relatedTerms: []';

    const modSlug = slugify(t.module);
    const prevFm = prev ? `prev:\n  link: /terms/${prev.pageSlug}\n  label: ${yamlEscape(prev.term)}` : 'prev: false';
    const nextFm = next ? `next:\n  link: /terms/${next.pageSlug}\n  label: ${yamlEscape(next.term)}` : 'next: false';

    const content = `---
title: ${yamlEscape(t.term)}
termId: ${yamlEscape(t.id)}
module: ${yamlEscape(t.module)}
moduleSlug: ${yamlEscape(modSlug)}
subarea: ${yamlEscape(t.subarea)}
fieldCode: ${yamlEscape(t.fieldCode)}
definition: ${yamlEscape(t.definition)}
whereInMaximo: ${yamlEscape(t.whereInMaximo)}
riverbendExample: ${yamlEscape(t.riverbendExample)}
${relatedFrontmatter}
commonMisconception: ${yamlEscape(t.commonMisconception)}
difficulty: ${yamlEscape(t.difficulty)}
versionNote: ${yamlEscape(t.versionNote)}
verifyIn: ${yamlEscape(t.verifyIn)}
reviewStatus: ${yamlEscape(t.reviewStatus)}
reviewer: ${yamlEscape(t.reviewer)}
reviewerNotes: ${yamlEscape(t.reviewerNotes)}
pageSlug: ${yamlEscape(t.pageSlug)}
${prevFm}
${nextFm}
template: doc
---
`;

    const filePath = path.join(termsDir, `${t.pageSlug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
    termsGenerated++;
  }

  // ---- Generate module pages ----
  const modulesDir = path.join(CONTENT_DOCS, 'modules');
  cleanDir(modulesDir);

  let modulesGenerated = 0;
  for (const mod of modules) {
    if (!mod.module) continue;
    const modSlug = slugify(mod.module);
    const modTerms = termsByModule.get(mod.module) || [];
    const beginner = modTerms.filter(t => t.difficulty.toLowerCase() === 'beginner').length;
    const intermediate = modTerms.filter(t => t.difficulty.toLowerCase() === 'intermediate').length;
    const advanced = modTerms.filter(t => t.difficulty.toLowerCase() === 'advanced').length;

    const content = `---
title: ${yamlEscape(mod.module)}
moduleName: ${yamlEscape(mod.module)}
moduleSlug: ${yamlEscape(modSlug)}
whatItCovers: ${yamlEscape(mod.whatItCovers)}
termCount: ${modTerms.length}
beginnerCount: ${beginner}
intermediateCount: ${intermediate}
advancedCount: ${advanced}
template: doc
---
`;
    const filePath = path.join(modulesDir, `${modSlug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
    modulesGenerated++;
  }

  // ---- Generate learning path pages ----
  const pathsDir = path.join(CONTENT_DOCS, 'paths');
  cleanDir(pathsDir);

  let pathsGenerated = 0;
  for (const [lpName, lpTerms] of lpGroups) {
    if (!lpName) continue;
    const lpSlug = slugify(lpName);

    // Resolve each term to its data
    const resolvedSteps: Array<{ step: number; term: string; slug: string | null; definition: string }> = [];
    lpTerms.forEach((termName, i) => {
      const termData = terms.find(t => t.term === termName) || terms.find(t => t.term.toLowerCase() === termName.toLowerCase());
      const { slug } = resolveRelatedTerm(termName);
      resolvedSteps.push({
        step: i + 1,
        term: termName,
        slug,
        definition: termData?.definition || '',
      });
    });

    const stepsFm = resolvedSteps.map(s =>
      `  - step: ${s.step}\n    term: ${yamlEscape(s.term)}\n    slug: ${s.slug ? yamlEscape(s.slug) : 'null'}\n    definition: ${yamlEscape(s.definition)}`
    ).join('\n');

    const content = `---
title: ${yamlEscape(lpName)}
pathName: ${yamlEscape(lpName)}
pathSlug: ${yamlEscape(lpSlug)}
stepCount: ${resolvedSteps.length}
steps:
${stepsFm}
template: doc
---
`;
    const filePath = path.join(pathsDir, `${lpSlug}.md`);
    fs.writeFileSync(filePath, content, 'utf-8');
    pathsGenerated++;
  }

  // ---- Generate riverbend.md ----
  const rbHeaders2 = rbHeaders.filter(Boolean);
  const rbTableHeader = `| ${rbHeaders2.join(' | ')} |\n| ${rbHeaders2.map(() => '---').join(' | ')} |`;
  const rbTableRows = rbRecords.map(rec =>
    `| ${rbHeaders2.map(h => (rec[h] || '').replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`
  ).join('\n');

  const rbContent = `---
title: ${yamlEscape(rbTitle || 'Riverbend Water Authority')}
description: The fictional utility used in every example throughout this guide.
template: doc
---

${rbSubtitle || ''}

Riverbend Water Authority (RWA) is the fictional utility used in every example throughout this guide. Every asset, work order, location and person you see in these pages belongs to RWA. Using one consistent organization means you can follow the same records through every concept, from Foundations to Work Management to Inventory.

## Asset Hierarchy

<div class="rb-tree">
  <div class="rb-node rb-org">
    <span class="rb-label">Organization</span>
    <span class="rb-id">RWA</span>
    <div class="rb-children">
      <div class="rb-node rb-site">
        <span class="rb-label">Site</span>
        <span class="rb-id">TP1</span>
        <div class="rb-children">
          <div class="rb-node rb-loc">
            <span class="rb-label">Location</span>
            <span class="rb-id">TP1-INTAKE</span>
            <div class="rb-children">
              <div class="rb-node rb-loc">
                <span class="rb-label">Location</span>
                <span class="rb-id">TP1-INTAKE-PS</span>
                <div class="rb-children">
                  <div class="rb-node rb-asset">
                    <span class="rb-label">Asset</span>
                    <span class="rb-id">P-101</span>
                    <span class="rb-desc">Intake Pump 101</span>
                    <div class="rb-children">
                      <div class="rb-node rb-asset">
                        <span class="rb-label">Child Asset</span>
                        <span class="rb-id">M-101</span>
                        <span class="rb-desc">Motor for P-101</span>
                      </div>
                      <div class="rb-node rb-asset">
                        <span class="rb-label">Child Asset</span>
                        <span class="rb-id">C-101</span>
                        <span class="rb-desc">Controller for P-101</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Reference Records

${rbTableHeader}
${rbTableRows}
`;

  ensureDir(CONTENT_DOCS);
  fs.writeFileSync(path.join(CONTENT_DOCS, 'riverbend.md'), rbContent, 'utf-8');

  // ---- Generate sources.md ----
  const srcContent = `---
title: Sources
description: The reference materials used to verify terms in this guide.
template: doc
---

The following sources were used to verify the terms and definitions in this guide.

| Source | What it confirms | URL |
| --- | --- | --- |
${srcRecords.map(s => `| ${s.source.replace(/\|/g, '\\|')} | ${s.what.replace(/\|/g, '\\|')} | ${s.url ? `[Link](${s.url})` : ''} |`).join('\n')}
`;

  fs.writeFileSync(path.join(CONTENT_DOCS, 'sources.md'), srcContent, 'utf-8');

  // ---- Write unmatched related terms report ----
  ensureDir(REPORTS_DIR);
  const unmatchedContent = `# Unmatched Related Terms

These related terms could not be matched to a term page. Fix the spreadsheet to resolve these.

| Term ID | Term Name | Unmatched Related Term |
| --- | --- | --- |
${unmatchedRelated.map(u => `| ${u.termId} | ${u.termName.replace(/\|/g, '\\|')} | ${u.unmatched.replace(/\|/g, '\\|')} |`).join('\n')}

Total: ${unmatchedRelated.length} unmatched references.
`;
  fs.writeFileSync(path.join(REPORTS_DIR, 'unmatched-related-terms.md'), unmatchedContent, 'utf-8');

  // ---- Summary ----
  console.log('\n=== Build Content Summary ===');
  console.log(`Terms generated:   ${termsGenerated}`);
  console.log(`Modules generated: ${modulesGenerated}`);
  console.log(`Paths generated:   ${pathsGenerated}`);
  console.log(`Unmatched related terms: ${unmatchedRelated.length}`);
  console.log(`Report: reports/unmatched-related-terms.md`);
  console.log('=============================\n');
}

main().catch(err => {
  console.error('build-content failed:', err);
  process.exit(1);
});
