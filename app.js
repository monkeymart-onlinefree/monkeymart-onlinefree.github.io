
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const input = $("#urlInput");
const analyzeBtn = $("#analyzeBtn");
const msg = $("#message");
const empty = $("#emptyState");
const panel = $("#resultPanel");
const state = $("#statePill");

const configuredBase = String(window.CLIPGRAB_CONFIG?.API_URL || "")
  .trim()
  .replace(/\/+$/, "");

let API_BASE = null;

function showMsg(text, type="") {
  msg.hidden = !text;
  msg.className = "message" + (type ? " " + type : "");
  msg.textContent = text;
}

function esc(v="") {
  return String(v).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function fmtTime(sec) {
  if (!sec) return "--:--";
  sec = Math.floor(sec);
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
  return (h ? h + ":" : "") +
         (h ? String(m).padStart(2,"0") : m) +
         ":" + String(s).padStart(2,"0");
}

function fmtBytes(n) {
  if (!n) return "—";
  const u = ["B","KB","MB","GB"];
  let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i ? 1 : 0)} ${u[i]}`;
}

function platform(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./,"").toLowerCase();
    if (h.includes("youtube") || h === "youtu.be") return "YouTube";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("facebook") || h === "fb.watch") return "Facebook";
    if (h === "x.com" || h.includes("twitter")) return "X / Twitter";
    if (h.includes("vimeo")) return "Vimeo";
    return h;
  } catch {
    return "Video";
  }
}

async function parseJsonResponse(r) {
  const text = await r.text();
  if (!text) throw new Error(`Server returned an empty response (${r.status}).`);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      text.toLowerCase().includes("<html")
        ? "The configured URL is not the ClipGrab backend API."
        : text.slice(0, 240)
    );
  }

  if (!r.ok) throw new Error(data.error || `Request failed (${r.status}).`);
  return data;
}

async function probe(base) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const r = await fetch(`${base}/api/health`, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!r.ok) return false;
    const data = await r.json();
    return data?.ok === true;
  } catch {
    return false;
  }
}

async function discoverBackend(force=false) {
  if (API_BASE !== null && !force) return API_BASE;

  const candidates = [];

  // GitHub Pages uses the configured Render URL.
  if (configuredBase && !configuredBase.includes("YOUR-RENDER-SERVICE")) {
    candidates.push(configuredBase);
  }

  // Same origin is useful when frontend is served by Flask locally.
  if (location.protocol === "http:" || location.protocol === "https:") {
    candidates.push("");
  }

  // Local development fallbacks.
  candidates.push("http://127.0.0.1:8080", "http://localhost:8080");

  for (const base of [...new Set(candidates)]) {
    if (await probe(base)) {
      API_BASE = base;
      state.textContent = base ? "Backend online" : "Local backend online";
      return API_BASE;
    }
  }

  API_BASE = null;
  state.textContent = "Backend offline";
  return null;
}

async function analyze() {
  const url = input.value.trim();

  if (!url) return showMsg("Paste a valid video URL first.", "error");
  try { new URL(url); }
  catch { return showMsg("That URL does not look valid.", "error"); }

  analyzeBtn.classList.add("loading");
  analyzeBtn.querySelector("span").textContent = "Analyzing";
  state.textContent = "Connecting…";
  showMsg("");

  try {
    const base = await discoverBackend(true);

    if (base === null) {
      if (!configuredBase || configuredBase.includes("YOUR-RENDER-SERVICE")) {
        throw new Error("Backend URL is not configured yet. Add your Render URL in config.js.");
      }
      throw new Error("Backend is currently unreachable. Check your Render service.");
    }

    const r = await fetch(`${base}/api/info`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({url})
    });

    const data = await parseJsonResponse(r);
    render(data, url);
    showMsg("Video info loaded. Choose a format below.", "ok");
    state.textContent = "Formats ready";
  } catch (e) {
    showMsg(e.message || "Could not analyze this URL.", "error");
    state.textContent = "Check backend";
  } finally {
    analyzeBtn.classList.remove("loading");
    analyzeBtn.querySelector("span").textContent = "Analyze";
  }
}

function render(data, url) {
  empty.hidden = true;
  panel.hidden = false;

  $("#videoTitle").textContent = data.title || "Untitled video";
  $("#uploader").textContent = data.uploader || data.channel || "Unknown uploader";
  $("#platformTag").textContent = data.extractor || platform(url);
  $("#duration").textContent = fmtTime(data.duration);

  $("#thumb").innerHTML = data.thumbnail
    ? `<img src="${esc(data.thumbnail)}" alt="">`
    : "<span>▶</span>";

  $("#videoFormats").innerHTML =
    (data.video_formats || []).map(f => row(f,url,"video")).join("") ||
    `<div class="format-row"><span class="quality">No video options</span><span class="fmt">—</span><span class="size">—</span><span></span></div>`;

  $("#audioFormats").innerHTML =
    (data.audio_formats || []).map(f => row(f,url,"audio")).join("") ||
    `<div class="format-row"><span class="quality">No audio options</span><span class="fmt">—</span><span class="size">—</span><span></span></div>`;

  $$(".dlbtn").forEach(b => b.addEventListener("click", download));
}

function row(f, url, type) {
  const quality = esc(f.quality || f.label || "Best");
  const badge = f.recommended ? `<small>BEST</small>` : "";

  return `<div class="format-row">
    <span class="quality">${quality}${badge}</span>
    <span class="fmt">${esc((f.ext || type).toUpperCase())}${f.note ? ` · ${esc(f.note)}` : ""}</span>
    <span class="size">${fmtBytes(f.filesize)}</span>
    <button class="dlbtn"
      data-url="${esc(url)}"
      data-id="${esc(f.format_id || "best")}"
      data-type="${type}"
      data-quality="${esc(f.quality || "")}">
      Download
    </button>
  </div>`;
}

async function download(e) {
  const b = e.currentTarget;
  b.classList.add("processing");
  b.textContent = "Preparing…";

  try {
    const base = await discoverBackend(true);
    if (base === null) throw new Error("Backend is offline.");

    const q = new URLSearchParams({
      url: b.dataset.url,
      format_id: b.dataset.id,
      type: b.dataset.type,
      quality: b.dataset.quality
    });

    // Navigate directly to the backend download URL.
    // This avoids buffering the entire media file in frontend JavaScript.
    window.location.href = `${base}/api/download?${q.toString()}`;
    showMsg("Your download is being prepared by the server.", "ok");
  } catch (err) {
    showMsg(err.message || "Download failed.", "error");
  } finally {
    setTimeout(() => {
      b.classList.remove("processing");
      b.textContent = "Download";
    }, 1800);
  }
}

analyzeBtn.addEventListener("click", analyze);
input.addEventListener("keydown", e => { if (e.key === "Enter") analyze(); });

$("#clearBtn").addEventListener("click", () => {
  input.value = "";
  panel.hidden = true;
  empty.hidden = false;
  showMsg("");
  state.textContent = "Waiting for URL";
  input.focus();
});

$("#pasteBtn").addEventListener("click", async () => {
  try {
    input.value = await navigator.clipboard.readText();
    showMsg("Link pasted.", "ok");
  } catch {
    showMsg("Clipboard permission was blocked. Paste manually.", "error");
  }
});

$("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $("#themeBtn").textContent =
    document.body.classList.contains("dark") ? "☀" : "☾";
});

$$(".tab").forEach(t => t.addEventListener("click", () => {
  $$(".tab").forEach(x => x.classList.toggle("active", x === t));
  $("#videoTab").classList.toggle("active", t.dataset.tab === "video");
  $("#audioTab").classList.toggle("active", t.dataset.tab === "audio");
}));

window.addEventListener("DOMContentLoaded", async () => {
  const base = await discoverBackend(true);

  if (base !== null) {
    showMsg("", "");
  } else if (!configuredBase || configuredBase.includes("YOUR-RENDER-SERVICE")) {
    showMsg("GitHub Pages frontend is ready. Add your Render backend URL in config.js before publishing.", "error");
  } else {
    showMsg("The configured backend could not be reached. Check your Render deployment.", "error");
  }
});
