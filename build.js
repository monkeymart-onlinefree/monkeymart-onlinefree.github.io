'use strict';
/* CalcPro static site generator — creates one page per calculator. */
const fs=require('fs'),path=require('path');
const {calculators}=require('./app.js');
const OUT=path.join(__dirname,'calculators');
fs.mkdirSync(OUT,{recursive:true});
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const words=s=>s.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;

const catIntro={
 Finance:'Money decisions are easier when the numbers are in front of you. This finance tool turns a few simple inputs into a figure you can compare, budget around, or take to a bank or adviser with more confidence.',
 Health:'Health and fitness figures are much more useful when they are calculated consistently rather than guessed. This tool applies a widely used formula so you can track the same measure over time and see real change.',
 Math:'Mathematics problems become far quicker when the arithmetic is automated. This tool applies the standard method step by step, so you can focus on understanding the result instead of chasing calculation slips.',
 Geometry:'Geometry work depends on getting the dimensions and the formula right. This tool applies the standard geometric relationship to your measurements and returns the area, length, volume or angle you need.',
 Conversion:'Unit conversion should never be the reason a project goes wrong. This converter applies the exact internationally agreed factor, so your figure stays accurate whether you are cooking, travelling, studying or building.',
 Science:'Physics and engineering problems rely on clean, consistent units. This tool applies the standard scientific relationship to your inputs and returns a result you can check against your own working.',
 'Time & Date':'Working out dates by hand is slow and easy to get wrong, especially across months and leap years. This tool handles the calendar logic for you and returns an exact answer in a second.',
 Education:'Grades and study targets are far less stressful when you can see the actual numbers. This tool does the marking arithmetic for you so you know exactly where you stand and what is still needed.',
 Construction:'Ordering materials without a proper estimate wastes money and time. This tool converts your measurements into a quantity or cost you can take straight to a supplier, with sensible allowance for real-world waste.',
 Everyday:'Small everyday calculations add up over a year. This tool takes the guesswork out of a routine decision and gives you a clear number in seconds, on any device, with nothing to install.'
};
const catUses={
 Finance:['Compare two offers before you commit','Sanity-check a quote from a lender or seller','Build a realistic monthly budget','Plan ahead for a large purchase'],
 Health:['Track a measure consistently over weeks or months','Set a realistic, specific target','Prepare questions for a doctor or coach','Compare your figure against general guidance'],
 Math:['Check homework or exam practice answers','Speed up repetitive classroom calculations','Verify a spreadsheet formula','Learn the method by seeing worked values'],
 Geometry:['Estimate materials for a shape or surface','Check coursework and technical drawings','Plan a layout before you cut or build','Confirm a dimension before ordering'],
 Conversion:['Follow a recipe or manual written in other units','Compare product specifications fairly','Travel and shop without unit confusion','Convert study or lab data consistently'],
 Science:['Check laboratory or coursework results','Estimate a value before running an experiment','Verify an engineering calculation','Understand how the variables relate'],
 'Time & Date':['Plan deadlines, leave and project timelines','Count down to an event accurately','Work out contract or notice periods','Handle leap years without errors'],
 Education:['Know the score you still need to pass','Track your average across a term','Plan revision priorities realistically','Check a teacher-reported grade'],
 Construction:['Estimate materials before you order','Compare supplier quotes on the same basis','Reduce over-ordering and waste','Budget a renovation room by room'],
 Everyday:['Avoid overpaying on a routine purchase','Split costs fairly with other people','Compare options quickly in a shop','Plan running costs over a month or year']
};
const accuracy={
 Finance:'Results are indicative. Real products include fees, taxes, insurance and compounding rules that vary by lender and country, so treat the output as a planning figure rather than a formal quotation.',
 Health:'Results are general estimates based on population formulas. They do not account for medical conditions, medication, body composition or pregnancy, so discuss anything important with a qualified health professional.',
 Construction:'Material estimates should be checked against supplier coverage figures and site conditions. Wastage, cuts, joints and surface texture all change real consumption.',
 Education:'Grading rules differ between institutions. Check weightings, rounding rules and pass marks in your course handbook before relying on the figure.'
};
const fallbackAcc='Results are calculated exactly from the values you enter, so the accuracy of the output depends on the accuracy and units of your inputs. Double-check your figures before relying on the result for anything important.';

function guide(c){
  const f=c.fields,names=f.map(x=>x[1].toLowerCase());
  const intro=catIntro[c.category]||catIntro.Everyday;
  const uses=(catUses[c.category]||catUses.Everyday).map(u=>`<li>${esc(u)}</li>`).join('');
  const acc=accuracy[c.category]||fallbackAcc;
  return `
<h3>What is the ${esc(c.title)}?</h3>
<p>The ${esc(c.title)} is a free online tool that helps you ${esc(c.description.replace(/\.$/,'').toLowerCase())} without doing the arithmetic yourself. ${esc(intro)} It sits in the ${esc(c.category)} section of CalcPro alongside related tools, and like every calculator on the site it is completely free, needs no sign-up, and runs entirely in your browser — your numbers are never uploaded anywhere.</p>
<h3>What it is used for</h3>
<p>People reach for this calculator whenever they need a dependable answer quickly rather than an approximation. Typical situations include:</p>
<ul>${uses}</ul>
<h3>How to use it step by step</h3>
<p>Using the tool takes only a few seconds. ${f.map((x,i)=>`In field ${i+1}, enter the ${esc(x[1].toLowerCase())}${x[2]==='number'?' as a number':x[2]==='date'?' using the date picker':''}.`).join(' ')} When every field is filled in, press <strong>Calculate</strong>. The result appears immediately below the form, together with a short explanation of what the figure represents. If you want to try another scenario, change one value and calculate again — comparing two or three variations is usually more informative than a single run. You can copy the result, or copy a link to this page, using the buttons that appear beneath the answer.</p>
<h3>The formula behind the result</h3>
<p>${esc(c.formula)} Knowing the method matters, because it tells you which input has the biggest effect on the answer. If a result looks surprising, change one value at a time and watch how the output moves; that usually reveals whether the input, the unit, or your expectation was the problem.</p>
<h3>Worked example</h3>
<p>${esc(c.example)} Starting with round, familiar numbers is the fastest way to confirm you have entered everything in the right place before moving on to your real figures.</p>
<h3>Tips and common mistakes</h3>
<p>${esc(c.tips)} The most frequent errors are mixing units — such as entering centimetres where metres are expected — and typing a percentage as a decimal or the other way around. Enter values exactly as the labels describe them, keep every measurement in one system, and check the result against a rough mental estimate. If the two are far apart, the input is usually the cause.</p>
<h3>Accuracy and limitations</h3>
<p>${esc(acc)} CalcPro provides these tools for information and planning, and they are not a substitute for professional advice where money, health, safety or legal matters are involved.</p>`;
}

function page(c,all){
  const rel=all.filter(x=>x.category===c.category&&x.id!==c.id).slice(0,6);
  const body=guide(c);
  const faqs=c.faqs.map(q=>{const i=q.indexOf('?');const h=i>-1?q.slice(0,i+1):q;const b=i>-1?q.slice(i+1).trim():'';return{q:h,a:b||'See the guide above for a full explanation.'}});
  const ld={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(x=>({"@type":"Question",name:x.q,acceptedAnswer:{"@type":"Answer",text:x.a}}))};
  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${esc(c.seoTitle)}</title>
<meta name="description" content="${esc(c.seoDescription)}" />
<meta property="og:title" content="${esc(c.title)}" />
<meta property="og:description" content="${esc(c.description)}" />
<link rel="stylesheet" href="../styles.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<header class="site-header"><div class="header-inner">
  <a class="brand" href="../index.html"><span class="brand-mark">🧮</span>CalcPro</a>
  <nav><a href="../index.html">Home</a><a href="../index.html#calculators" class="active">Calculators</a><a href="../index.html#categories">Categories</a><a href="../index.html#about">About</a></nav>
  <div class="header-actions"><button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">🌙</button></div>
</div></header>
<main>
<div class="page-head">
  <div class="breadcrumb"><a href="../index.html">Home</a> › <a href="../index.html#calculators">${esc(c.category)} Calculators</a> › <span>${esc(c.title)}</span></div>
  <span class="kicker">${esc(c.category.toUpperCase())}</span>
  <h1 class="calc-title">${esc(c.title)}</h1>
  <p class="calc-lead">${esc(c.description)}</p>
</div>
<div class="content-grid">
  <div>
    <form class="panel elevated" id="calc-form">
      <h2>${esc(c.title)}</h2>
      ${c.fields.map(f=>`<div class="field"><label for="f-${f[0]}">${esc(f[1])}</label><input id="f-${f[0]}" name="${f[0]}" type="${f[2]}" step="any" required /></div>`).join('\n      ')}
      <div class="form-actions"><button class="primary" type="submit">Calculate</button><button class="ghost" type="button" id="reset">Reset</button></div>
      <div class="error" id="error" role="alert"></div>
      <div class="result" id="result" hidden></div>
    </form>
    <div class="panel"><h3>How to Use</h3><ol class="steps">${c.fields.map(f=>`<li>Enter the ${esc(f[1].toLowerCase())}.</li>`).join('')}<li>Press Calculate to see the result instantly.</li><li>Copy the answer or the page link if you need to share it.</li></ol></div>
    <div class="panel"><h3>Formula</h3><p>${esc(c.formula)}</p><div class="formula-box">${esc(c.title)} = f(${c.fields.map(f=>esc(f[1])).join(', ')})</div></div>
    <article class="panel prose"><h2>Complete guide to the ${esc(c.title)}</h2>${body}</article>
    <div class="panel faq"><h3>Frequently asked questions</h3>${faqs.map(x=>`<details><summary>${esc(x.q)}</summary><p>${esc(x.a)}</p></details>`).join('')}</div>
  </div>
  <aside>
    <div class="side-card"><h3>Related ${esc(c.category)} tools</h3><div class="side-list">${rel.map(r=>`<a href="${r.id}.html">${esc(r.title)}<span>›</span></a>`).join('')||'<p>More tools coming soon.</p>'}</div></div>
    <div class="side-card"><h3>Key features</h3><ul class="checks"><li>Instant, formula-based results</li><li>Clear worked example</li><li>Works offline once loaded</li><li>Mobile and desktop friendly</li><li>Free, with no sign-up</li></ul></div>
    <div class="tip"><h3>💡 Tip</h3><p>${esc(c.tips)}</p></div>
  </aside>
</div>
</main>
<footer class="site-footer">
  <div class="footer-grid">
    <div><a class="brand" href="../index.html"><span class="brand-mark">🧮</span>CalcPro</a><p>Premium-quality calculators for everyday decisions.</p></div>
    <div><h4>Calculators</h4><a href="../index.html#calculators">All calculators</a><a href="../index.html#categories">By category</a><a href="../index.html#popular">Popular tools</a></div>
    <div><h4>Quick links</h4><a href="../index.html">Home</a><a href="../index.html#about">About</a><a href="../sitemap.xml">Sitemap</a></div>
    <div><h4>Legal</h4><a href="../index.html#about">Disclaimer</a><a href="../index.html#about">Privacy</a><a href="../index.html#about">Terms</a></div>
  </div>
  <div class="footer-bottom"><span>© <span id="year"></span> CalcPro. All rights reserved.</span><span>Results are estimates — verify before important decisions.</span></div>
</footer>
<script>
const FIELDS=${JSON.stringify(c.fields)};
const TITLE=${JSON.stringify(c.title)};
const run=${c.run.toString()};
const $=s=>document.querySelector(s);
const fmt=x=>typeof x==='number'?Number(x.toFixed(8)).toLocaleString():x;
$('#calc-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target));
  for(const f of FIELDS){if(f[2]==='number')data[f[0]]=Number(data[f[0]])}
  try{
    const r=run(data);const out=fmt(r.value)+(r.unit||'');
    $('#error').textContent='';$('#result').hidden=false;
    $('#result').innerHTML='<span>Result</span><strong>'+out+'</strong><p>'+(r.detail||'')+'</p>'+
      '<div class="result-actions"><button type="button" class="ghost" id="copy">📋 Copy result</button><button type="button" class="ghost" id="share">🔗 Copy link</button></div>';
    $('#copy').onclick=ev=>{navigator.clipboard&&navigator.clipboard.writeText(TITLE+': '+out);ev.target.textContent='✅ Copied'};
    $('#share').onclick=ev=>{navigator.clipboard&&navigator.clipboard.writeText(location.href);ev.target.textContent='✅ Link copied'};
  }catch(err){$('#result').hidden=true;$('#error').textContent=err.message}
});
$('#reset').onclick=()=>{$('#calc-form').reset();$('#result').hidden=true;$('#error').textContent=''};
(function(){try{const t=localStorage.getItem('calcpro:theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
try{const r=JSON.parse(localStorage.getItem('calcpro:recent')||'[]');const id=${JSON.stringify(c.id)};
localStorage.setItem('calcpro:recent',JSON.stringify([id,...r.filter(x=>x!==id)].slice(0,6)))}catch(e){}})();
$('#theme-toggle').onclick=()=>{const r=document.documentElement,d=r.dataset.theme==='dark';r.dataset.theme=d?'light':'dark';
  $('#theme-toggle').textContent=d?'🌙':'☀️';try{localStorage.setItem('calcpro:theme',r.dataset.theme)}catch(e){}};
$('#year').textContent=new Date().getFullYear();
</script>
</body>
</html>`;
}

let min=Infinity;
for(const c of calculators){
  const html=page(c,calculators);
  const w=words(guide(c));
  if(w<min)min=w;
  fs.writeFileSync(path.join(OUT,c.id+'.html'),html);
}
const urls=['index.html',...calculators.map(c=>'calculators/'+c.id+'.html')];
fs.writeFileSync(path.join(__dirname,'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(__dirname,'calculators.json'),JSON.stringify(calculators.map(c=>({id:c.id,title:c.title,category:c.category,icon:c.icon,description:c.description})),null,1));
console.log(`Generated ${calculators.length} calculator pages + sitemap.xml (minimum guide length: ${min} words)`);
