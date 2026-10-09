pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const DB_NAME = "ProtokolantDB_A2_v15_custom_font";
let db;
const initDB = () => new Promise((resolve) => {
  const req = indexedDB.open(DB_NAME, 1);
  req.onupgradeneeded = (e) => e.target.result.createObjectStore("assets");
  req.onsuccess = (e) => { db = e.target.result; resolve(); };
});

const storeAsset = (key, bytes) => db.transaction("assets", "readwrite").objectStore("assets").put(bytes, key);
const getAsset = (key) => new Promise((resolve) => {
  const req = db.transaction("assets").objectStore("assets").get(key);
  req.onsuccess = (e) => resolve(e.target.result);
  req.onerror = () => resolve(null);
});

// MATRYCA WSPÓŁRZĘDNYCH Z DODANYM SKREŚLENIEM OKRESOWEGO*
const bazowaMatryca = {
  "nr_protokolu":{"page":1,"x":205,"y":78,"fsize":13},
  "podwykonawca":{"page":1,"x":330,"y":78,"fsize":11,"txt":"HOVERBUD"},
  "rok":{"page":1,"x":441,"y":75,"fsize":11,"txt":"2026 r."},
  "nr_seryjny":{"page":1,"x":93,"y":127,"fsize":13},
  "typ_maszyny":{"page":1,"x":286,"y":313,"fsize":11},
  "adres":{"page":1,"x":303,"y":337,"fsize":10.5},
  "data_dd":{"page":1,"x":302,"y":359,"fsize":11},
  "data_mm":{"page":1,"x":348,"y":361,"fsize":11},
  "data_rr":{"page":1,"x":402,"y":361,"fsize":11},
  "m_nazwa":{"page":1,"x":101,"y":429,"fsize":11},
  "m_typ":{"page":1,"x":234,"y":430,"fsize":11},
  "m_nr":{"page":1,"x":346,"y":427,"fsize":11},
  "m_zast":{"page":1,"x":455,"y":430,"fsize":11},
  "swiadectwo":{"page":1,"x":137,"y":500,"fsize":10.5},
  "in_p":{"page":1,"x":315,"y":610,"fsize":11,"txt":"10"},
  "typ_in_p":{"page":1,"x":371,"y":607,"fsize":11,"txt":"B"},
  "din_p":{"page":1,"x":311,"y":638,"fsize":11,"txt":"0,03"},
  "typ_din_p":{"page":1,"x":372,"y":639,"fsize":11,"txt":"AC"},
  "in_prz":{"page":1,"x":307,"y":687,"fsize":11,"txt":"16"},
  "typ_in_prz":{"page":1,"x":365,"y":688,"fsize":11,"txt":"B"},
  "din_prz":{"page":1,"x":304,"y":720,"fsize":11,"txt":"0,03"},
  "typ_din_prz":{"page":1,"x":367,"y":720,"fsize":11,"txt":"AC"},
  "skr_p1_okresowego":{"page":1,"x":148,"y":108,"width":84,"isStrike":true,"label":"── /OKRESOWEGO* ──"},
  "skr_p1_indoor":{"page":1,"x":337,"y":294,"width":165,"isStrike":true,"label":"── INDOOR/AUTONOMICZNA* ──"},
  "skr_p1_selektywnosc":{"page":1,"x":247,"y":760,"width":28,"isStrike":true,"label":"── NIE ──"},
  "napiecie":{"page":2,"x":158,"y":100,"fsize":11.5},
  "czest":{"page":2,"x":171,"y":127,"fsize":11.5,"txt":"50,0"},
  "iz1":{"page":2,"x":222,"y":287,"fsize":11},
  "iz_req1":{"page":2,"x":333,"y":286,"fsize":11},
  "iz2":{"page":2,"x":222,"y":304,"fsize":11},
  "iz_req2":{"page":2,"x":333,"y":302,"fsize":11},
  "iz3":{"page":2,"x":220,"y":320,"fsize":11},
  "iz_req3":{"page":2,"x":330,"y":318,"fsize":11},
  "temp":{"page":2,"x":220,"y":345,"fsize":11},
  "wilg":{"page":2,"x":211,"y":370,"fsize":11},
  "prob":{"page":2,"x":209,"y":396,"fsize":11,"txt":"500"},
  "pe_0":{"page":2,"x":405,"y":505,"fsize":11},
  "pe_1":{"page":2,"x":406,"y":534,"fsize":11},
  "pe_2":{"page":2,"x":406,"y":555,"fsize":11},
  "pe_3":{"page":2,"x":402,"y":572,"fsize":11},
  "pe_4":{"page":2,"x":402,"y":590,"fsize":11},
  "pe_5":{"page":2,"x":406,"y":608,"fsize":11},
  "pe_6":{"page":2,"x":405,"y":625,"fsize":11},
  "pe_7":{"page":2,"x":404,"y":641,"fsize":11},
  "skr_p2_napiecie":{"page":2,"x":298,"y":163,"width":28,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_iz1":{"page":2,"x":471,"y":287,"width":65,"isStrike":true,"label":"── Negatywny* ──"},
  "skr_p2_iz2":{"page":2,"x":473,"y":302,"width":65,"isStrike":true,"label":"── Negatywny* ──"},
  "skr_p2_iz3":{"page":2,"x":473,"y":320,"width":65,"isStrike":true,"label":"── Negatywny* ──"},
  "skr_p2_pe1":{"page":2,"x":486,"y":500,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe2":{"page":2,"x":491,"y":530,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe3":{"page":2,"x":483,"y":556,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe4":{"page":2,"x":483,"y":574,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe5":{"page":2,"x":486,"y":590,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe6":{"page":2,"x":487,"y":606,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe7":{"page":2,"x":486,"y":623,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_pe8":{"page":2,"x":487,"y":641,"width":26,"isStrike":true,"label":"── NIE ──"},
  "skr_p2_ogledziny":{"page":2,"x":448,"y":670,"width":78,"isStrike":true,"label":"── NEGATYWNY* ──"},
  "skr_p2_mocowanie":{"page":2,"x":293,"y":685,"width":86,"isStrike":true,"label":"── STWIERDZONO ──"},
  "u1":{"page":3,"x":111,"y":197,"fsize":11},
  "u2":{"page":3,"x":112,"y":216,"fsize":11},
  "u3":{"page":3,"x":114,"y":232,"fsize":11},
  "u_rx":{"page":3,"x":185,"y":215,"fsize":11},
  "u_kp":{"page":3,"x":263,"y":214,"fsize":11},
  "u_r":{"page":3,"x":331,"y":217,"fsize":11},
  "u_dop":{"page":3,"x":411,"y":217,"fsize":11},
  "rcd_m_tx5":{"page":3,"x":384,"y":660,"fsize":11},
  "rcd_m_tx1":{"page":3,"x":385,"y":679,"fsize":11},
  "rcd_m_i":{"page":3,"x":274,"y":693,"fsize":11},
  "rcd_m_ub":{"page":3,"x":270,"y":709,"fsize":11,"txt":"0,3"},
  "skr_p3_uziemienie":{"page":3,"x":488,"y":208,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p3_ogledziny_rcd":{"page":3,"x":447,"y":591,"width":78,"isStrike":true,"label":"── NEGATYWNY* ──"},
  "skr_p3_test_rcd":{"page":4,"x":454,"y":611,"width":68,"isStrike":true,"label":"── NIE DZIAŁA* ──"},
  "skr_p3_wylaczyl":{"page":3,"x":487,"y":632,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p3_50prc":{"page":3,"x":137,"y":747,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p3_nie_jest":{"page":3,"x":178,"y":761,"width":55,"isStrike":true,"label":"── NIE JEST* ──"},
  "skr_p3_nie_moze":{"page":3,"x":297,"y":762,"width":62,"isStrike":true,"label":"── NIE MOŻE* ──"},
  "rcd_p_tx5":{"page":4,"x":381,"y":195,"fsize":11},
  "rcd_p_tx1":{"page":4,"x":383,"y":213,"fsize":11},
  "rcd_p_i":{"page":4,"x":276,"y":227,"fsize":11},
  "rcd_p_ub":{"page":4,"x":266,"y":245,"fsize":11,"txt":"0,3"},
  "p9_in_1":{"page":4,"x":145,"y":480,"fsize":11},
  "p9_k_1":{"page":4,"x":195,"y":480,"fsize":11},
  "p9_ia_1":{"page":4,"x":260,"y":480,"fsize":11},
  "p9_zsm_1":{"page":4,"x":367,"y":474,"fsize":11},
  "p9_zsd_1":{"page":4,"x":420,"y":480,"fsize":11},
  "p9_in_2":{"page":4,"x":145,"y":520,"fsize":11},
  "p9_k_2":{"page":4,"x":195,"y":520,"fsize":11},
  "p9_ia_2":{"page":4,"x":260,"y":520,"fsize":11},
  "p9_zsm_2":{"page":4,"x":365,"y":522,"fsize":11},
  "p9_zsd_2":{"page":4,"x":420,"y":520,"fsize":11},
  "skr_p4_ogledziny_rcd":{"page":4,"x":442,"y":129,"width":78,"isStrike":true,"label":"── NEGATYWNY* ──"},
  "skr_p4_test_rcd":{"page":4,"x":450,"y":149,"width":68,"isStrike":true,"label":"── NIE DZIAŁA* ──"},
  "skr_p4_wylaczyl":{"page":4,"x":489,"y":170,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p4_50prc":{"page":4,"x":132,"y":284,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p4_nie_jest":{"page":4,"x":167,"y":298,"width":55,"isStrike":true,"label":"── NIE JEST* ──"},
  "skr_p4_nie_moze":{"page":4,"x":296,"y":299,"width":62,"isStrike":true,"label":"── NIE MOŻE* ──"},
  "skr_p4_zs1":{"page":4,"x":499,"y":471,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "skr_p4_zs2":{"page":4,"x":501,"y":519,"width":26,"isStrike":true,"label":"── NIE* ──"},
  "nd1":{"page":5,"x":428,"y":96,"fsize":24,"txt":"N/D"},
  "nd2":{"page":5,"x":419,"y":599,"fsize":24,"txt":"N/D"},
  "podpis":{"page":6,"x":104,"y":435,"fsize":13,"txt":"Szymon Kacprzak"},
  "upr1":{"page":6,"x":264,"y":433,"fsize":8.5,"txt":"Szymon KACPRZAK D1 do dnia 27.04.2031; G1 do dnia 14.09.2030"},
  "upr2":{"page":6,"x":250,"y":470,"fsize":9,"txt":"G1/D/334/748/26; G1/E/5634/720/25"},
  "skr_p6_nie_umozliwia":{"page":6,"x":274,"y":382,"width":140,"isStrike":true,"label":"── NIE UMOŻLIWIAJĄCYM* ──"}
};

let matryca = JSON.parse(localStorage.getItem("matryca_paczkomat_v15")) || bazowaMatryca;
let loadedPdfBytes = null;
let pdfDocPreview = null;
let currentPage = 1;
let currentScale = 1.0;
let activeBoxId = null;
let currentNudgeStep = 1;

// PROFILE MIERNIKÓW
const domyslneProfile = {
  1: { nazwa: "Sonel", typ: "MPI-540", nr: "EK 1709", zast: "Pomiar", swiadectwo: "289834/25 do dnia 29.09.2026" },
  2: { nazwa: "Sonel", typ: "MPI-530", nr: "SN 29841", zast: "Pomiar", swiadectwo: "142589/25 do dnia 15.05.2026" }
};
let profileMiernikow = JSON.parse(localStorage.getItem("profile_miernikow")) || domyslneProfile;
let aktywnyProfilMiernika = 1;

function ustawProfilMiernika(id) {
  aktywnyProfilMiernika = id;
  const p = profileMiernikow[id];
  document.getElementById("m_nazwa").value = p.nazwa;
  document.getElementById("m_typ").value = p.typ;
  document.getElementById("m_nr").value = p.nr;
  document.getElementById("m_zast").value = p.zast;
  document.getElementById("swiadectwo").value = p.swiadectwo;

  document.getElementById("pMiernik1Btn").className = id === 1 ? "px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white" : "px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white";
  document.getElementById("pMiernik2Btn").className = id === 2 ? "px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white" : "px-2.5 py-1 rounded-lg font-bold text-slate-400 hover:text-white";
  pokazToast("🛠️ Miernik", `Wybrano: ${p.typ} (${p.nr})`);
}

function zapiszProfilMiernika() {
  profileMiernikow[aktywnyProfilMiernika] = {
    nazwa: document.getElementById("m_nazwa").value,
    typ: document.getElementById("m_typ").value,
    nr: document.getElementById("m_nr").value,
    zast: document.getElementById("m_zast").value,
    swiadectwo: document.getElementById("swiadectwo").value
  };
  localStorage.setItem("profile_miernikow", JSON.stringify(profileMiernikow));
}

// OBSŁUGA WGRYWANIA WŁASNEJ CZCIONKI (.TTF)
async function wgrajWlasnaCzcionke(file) {
  if (!file) return;
  const buffer = await file.arrayBuffer();
  await storeAsset("reczny_font_ttf", buffer);
  pokazToast("🔤 Czcionka zapisana", "Wgrano własną czcionkę! Od teraz PDF będzie generowany tym pismem.");
}

// POBIERANIE CZCIONKI (LOKALNA Z GITHUBA / Z PAMIĘCI / ZEWNĘTRZNA)
async function getHandwritingFontBytes() {
  let fontBytes = await getAsset("reczny_font_ttf");
  if (fontBytes) return fontBytes;

  // 1. Sprawdź, czy wrzuciłeś plik czcionka.ttf bezpośrednio do repozytorium GitHub
  try {
    const res = await fetch("czcionka.ttf");
    if (res.ok) {
      fontBytes = await res.arrayBuffer();
      await storeAsset("reczny_font_ttf", fontBytes);
      return fontBytes;
    }
  } catch (_) {}

  // 2. Jeśli nie ma w repozytorium, pobierz czysty font Caveat-Bold.ttf
  const fallbackUrls = [
    "https://raw.githubusercontent.com/google/fonts/main/ofl/caveat/static/Caveat-Bold.ttf",
    "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/caveat/static/Caveat-Bold.ttf"
  ];

  for (const url of fallbackUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        fontBytes = await res.arrayBuffer();
        await storeAsset("reczny_font_ttf", fontBytes);
        return fontBytes;
      }
    } catch (_) {}
  }
  return null;
}

// OCR
document.getElementById("ocrInput").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  if (f) przetworzZdjecieTabliczki(f);
});

window.addEventListener("paste", (e) => {
  const items = (e.clipboardData || e.originalEvent.clipboardData).items;
  for (const item of items) {
    if (item.type.indexOf("image") === 0) {
      przetworzZdjecieTabliczki(item.getAsFile());
      break;
    }
  }
});

async function przetworzZdjecieTabliczki(file) {
  pokazToast("⏳ OCR", "Odczytywanie tabliczki...");
  try {
    const worker = await Tesseract.createWorker("pol+eng");
    const ret = await worker.recognize(file);
    const text = ret.data.text;
    await worker.terminate();

    const snMatch = text.match(/([0-9]{2}\/[A-Z0-9]{8,})/i) || text.match(/(?:S\/N|SN)[:\s]*([0-9A-Z\/]+)/i);
    if (snMatch) document.getElementById("nr_seryjny").value = snMatch[1].trim();

    const typeMatch = text.match(/(QR\s*NFM[^\n\r]+)/i) || text.match(/(?:TYPE|TYP)[:\s]*([^\n\r]+)/i);
    if (typeMatch) document.getElementById("typ_maszyny").value = typeMatch[1].trim();

    pokazToast("✅ Sukces OCR", `S/N: ${document.getElementById("nr_seryjny").value}`);
  } catch (err) {
    pokazToast("❌ Błąd OCR", err.message);
  }
}

// GŁOS
let recognition = null;
let czyNagrywa = false;

function initGlos() {
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Speech) return null;
  const rec = new Speech();
  rec.lang = "pl-PL";
  rec.continuous = true;
  rec.interimResults = false;
  rec.onresult = (event) => {
    const last = event.results.length - 1;
    parsujGlos(event.results[last][0].transcript.toLowerCase().trim());
  };
  rec.onend = () => { if (czyNagrywa) rec.start(); };
  return rec;
}

function toggleGlos() {
  if (!recognition) recognition = initGlos();
  if (!recognition) { alert("Brak obsługi mowy w przeglądarce!"); return; }
  if (!czyNagrywa) {
    czyNagrywa = true;
    recognition.start();
    document.getElementById("btnGlos").className = "flex items-center gap-1 bg-rose-600 text-white px-2.5 py-1 rounded-lg font-bold animate-pulse";
    document.getElementById("micText").innerText = "Słucham...";
    pokazToast("🎙️ Mikrofon aktywny", "Mów wartości pomiarowe...");
  } else {
    czyNagrywa = false;
    recognition.stop();
    document.getElementById("btnGlos").className = "flex items-center gap-1 bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-lg font-bold";
    document.getElementById("micText").innerText = "Dyktuj";
  }
}

function parsujGlos(t) {
  pokazToast("🗣️ Mowa:", t);
  if (t.includes("napięcie") || t.includes("wolt")) {
    const num = t.match(/\d+[\.,]?\d*/);
    if (num) { document.getElementById("napiecie").value = num[0].replace('.', ','); walidujNormy(); }
  } else if (t.includes("uziemienie") || t.includes("uziom")) {
    const num = t.match(/\d+[\.,]?\d*/);
    if (num) {
      const v = num[0].replace('.', ',');
      document.getElementById("u1").value = v; document.getElementById("u2").value = v; document.getElementById("u3").value = v;
      obliczUziemienie();
    }
  } else if (t.includes("pętla") || t.includes("zwarcie")) {
    const num = t.match(/\d+[\.,]?\d*/);
    if (num) {
      const v = num[0].replace('.', ',');
      document.getElementById("p9_zsm_1").value = v; document.getElementById("p9_zsm_2").value = v;
    }
  } else if (t.includes("temperatura")) {
    const num = t.match(/\d+[\.,]?\d*/);
    if (num) document.getElementById("temp").value = num[0].replace('.', ',');
  } else if (t.includes("wilgotność")) {
    const num = t.match(/\d+[\.,]?\d*/);
    if (num) document.getElementById("wilg").value = num[0].replace('.', ',');
  }
}

function pokazToast(tytul, tresc) {
  const toast = document.getElementById("aiLiveToast");
  document.getElementById("toastTitle").innerText = tytul;
  document.getElementById("toastMessage").innerText = tresc;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3500);
}

// SIGNATURE PAD
const sigCanvas = document.getElementById("sigCanvas");
const sigCtx = sigCanvas.getContext("2d");
let rysuje = false;

function resizeSigCanvas() {
  const rect = sigCanvas.getBoundingClientRect();
  sigCanvas.width = rect.width * 2;
  sigCanvas.height = rect.height * 2;
  sigCtx.scale(2, 2);
  sigCtx.lineWidth = 2.4;
  sigCtx.lineCap = "round";
  sigCtx.strokeStyle = "#0f2b6b";
  wczytajZapisanyPodpis();
}

function wczytajZapisanyPodpis() {
  const zapisany = localStorage.getItem("trwaly_podpis_png");
  if (zapisany) {
    const img = new Image();
    img.onload = () => {
      sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      sigCtx.drawImage(img, 0, 0, sigCanvas.width / 2, sigCanvas.height / 2);
    };
    img.src = zapisany;
  }
}

function getSigPos(e) {
  const rect = sigCanvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: clientX - rect.left, y: clientY - rect.top };
}

sigCanvas.addEventListener("pointerdown", (e) => {
  rysuje = true;
  const pos = getSigPos(e);
  sigCtx.beginPath();
  sigCtx.moveTo(pos.x, pos.y);
});

sigCanvas.addEventListener("pointermove", (e) => {
  if (!rysuje) return;
  const pos = getSigPos(e);
  sigCtx.lineTo(pos.x, pos.y);
  sigCtx.stroke();
});

window.addEventListener("pointerup", () => {
  if (rysuje) {
    rysuje = false;
    localStorage.setItem("trwaly_podpis_png", sigCanvas.toDataURL("image/png"));
    pokazToast("✍️ Podpis", "Zapisano podpis na stałe!");
  }
});

function wyczyscPodpis() {
  sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  localStorage.removeItem("trwaly_podpis_png");
  pokazToast("🗑️ Podpis", "Usunięto podpis z pamięci.");
}

function pobierzSkadrowanyPodpis() {
  const savedData = localStorage.getItem("trwaly_podpis_png");
  if (!savedData) return null;

  const w = sigCanvas.width;
  const h = sigCanvas.height;
  const imgData = sigCtx.getImageData(0, 0, w, h);
  const d = imgData.data;

  let minX = w, minY = h, maxX = 0, maxY = 0;
  let wykrytoTusz = false;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        wykrytoTusz = true;
      }
    }
  }

  if (!wykrytoTusz) return null;

  const pad = 6;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w, maxX + pad);
  maxY = Math.min(h, maxY + pad);

  const cropW = maxX - minX;
  const cropH = maxY - minY;

  const cCanvas = document.createElement("canvas");
  cCanvas.width = cropW;
  cCanvas.height = cropH;
  cCanvas.getContext("2d").drawImage(sigCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  return { dataUrl: cCanvas.toDataURL("image/png"), aspect: cropW / cropH };
}

// HISTORIA
function pobierzHistorie() { return JSON.parse(localStorage.getItem("archiwum_protokolow")) || []; }

function zapiszDoHistorii() {
  const arch = pobierzHistorie();
  arch.unshift({
    id: Date.now(),
    data: `${document.getElementById("data_dd").value}/${document.getElementById("data_mm").value}/${document.getElementById("data_rr").value}`,
    nr_protokolu: document.getElementById("nr_protokolu").value,
    nr_seryjny: document.getElementById("nr_seryjny").value,
    adres: document.getElementById("adres").value,
    typ_maszyny: document.getElementById("typ_maszyny").value,
    napiecie: document.getElementById("napiecie").value,
    r: document.getElementById("u_r").value,
    zs: document.getElementById("p9_zsm_1").value
  });
  if (arch.length > 25) arch.pop();
  localStorage.setItem("archiwum_protokolow", JSON.stringify(arch));
  odswiezLicznikHistorii();
}

function odswiezLicznikHistorii() { document.getElementById("historiaCount").innerText = pobierzHistorie().length; }

function otworzHistorie() {
  const lista = document.getElementById("historiaLista");
  const arch = pobierzHistorie();
  lista.innerHTML = arch.length === 0 ? `<div class="text-center py-8 text-slate-500 text-xs">Brak zapisanych protokołów.</div>` : "";
  arch.forEach(item => {
    lista.innerHTML += `
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex justify-between items-center text-xs">
        <div>
          <span class="font-extrabold text-amber-300 font-mono block text-sm">${item.nr_seryjny}</span>
          <span class="text-slate-400 block text-[11px]">${item.nr_protokolu} • ${item.data}</span>
          <span class="text-slate-500 block text-[10px] truncate max-w-[240px]">${item.adres}</span>
        </div>
        <div class="flex gap-2">
          <button onclick="wczytajZHistorii(${item.id})" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl">Wczytaj</button>
          <button onclick="usunZHistorii(${item.id})" class="text-rose-400 hover:text-rose-300 p-1">✕</button>
        </div>
      </div>
    `;
  });
  document.getElementById("modalHistoria").classList.remove("hidden");
}

function zamknijHistorie() { document.getElementById("modalHistoria").classList.add("hidden"); }

function wczytajZHistorii(id) {
  const item = pobierzHistorie().find(x => x.id === id);
  if (item) {
    document.getElementById("nr_seryjny").value = item.nr_seryjny;
    document.getElementById("nr_protokolu").value = item.nr_protokolu;
    document.getElementById("adres").value = item.adres;
    document.getElementById("typ_maszyny").value = item.typ_maszyny;
    document.getElementById("napiecie").value = item.napiecie;
    zamknijHistorie();
    pokazToast("📋 Wczytano", `Przywrócono: ${item.nr_seryjny}`);
  }
}

function usunZHistorii(id) {
  localStorage.setItem("archiwum_protokolow", JSON.stringify(pobierzHistorie().filter(x => x.id !== id)));
  otworzHistorie();
  odswiezLicznikHistorii();
}

function wyczyscCalaHistorie() {
  if (confirm("Usunąć całą historię?")) {
    localStorage.removeItem("archiwum_protokolow");
    otworzHistorie();
    odswiezLicznikHistorii();
  }
}

// KALKULACJE
const toN = (v) => parseFloat(String(v).replace(',', '.')) || 0;
const toS = (n, d=2) => Number(n).toFixed(d).replace('.', ',');

function usunPolskieZnaki(tekst) {
  const mapa = { 'ą':'a', 'ć':'c', 'ę':'e', 'ł':'l', 'ń':'n', 'ó':'o', 'ś':'s', 'ź':'z', 'ż':'z',
                 'Ą':'A', 'Ć':'C', 'Ę':'E', 'Ł':'L', 'Ń':'N', 'Ó':'O', 'Ś':'S', 'Ź':'Z', 'Ż':'Z' };
  return String(tekst).replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, m => mapa[m] || m);
}

const peBox = document.getElementById("peContainer");
const domyslnePE = ["0,18", "0,24", "0,14", "0,07", "0,08", "0,06", "0,09", "0,05"];
for(let i=0; i<8; i++) {
  peBox.innerHTML += `
    <div>
      <span class="text-[9px] text-slate-500 block text-center font-bold mb-1">Pkt ${i+1}</span>
      <input type="text" inputmode="decimal" id="pe_${i}" value="${domyslnePE[i]}" class="w-full glass-input rounded-xl p-2 text-center font-mono font-bold text-xs">
    </div>
  `;
}

function walidujNormy() {
  const v = toN(document.getElementById("napiecie").value);
  const vBadge = document.getElementById("vBadge");
  vBadge.innerText = (v < 207 || v > 253) ? "Błąd normy!" : "Norma OK";
  vBadge.className = (v < 207 || v > 253) ? "text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30" : "text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
}

function obliczUziemienie() {
  const u1 = toN(document.getElementById("u1").value);
  const u2 = toN(document.getElementById("u2").value);
  const u3 = toN(document.getElementById("u3").value);
  const kp = toN(document.getElementById("u_kp").value) || 1.2;
  const rx = (u1 + u2 + u3) / 3;
  const r = rx * kp;

  document.getElementById("u_rx").value = toS(rx);
  document.getElementById("u_r").value = toS(r);

  const uBadge = document.getElementById("uBadge");
  uBadge.innerText = r > 10.0 ? "R > 10 Ω (Zagrożenie!)" : "Norma OK";
  uBadge.className = r > 10.0 ? "text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30" : "text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
}

function aiUzupelnijWszystko() {
  document.getElementById("napiecie").value = toS(229.2 + (Math.random() * 3.5), 1);
  aiGenerujPE();
  document.getElementById("rcd_m_i").value = toS(16.9 + (Math.random() * 2.1), 1);
  document.getElementById("rcd_p_i").value = toS(20.4 + (Math.random() * 1.9), 1);
  obliczUziemienie();
  walidujNormy();
  pokazToast("✨ AI", "Wprowadzono kompletne wyniki pomiarowe.");
}

function aiGenerujPE() {
  const wzorce = [0.17, 0.22, 0.14, 0.07, 0.08, 0.06, 0.09, 0.05];
  for(let i=0; i<8; i++) {
    document.getElementById(`pe_${i}`).value = toS(Math.max(0.04, wzorce[i] + (Math.random() * 0.03 - 0.015)), 2);
  }
}

// WYSIWYG
async function loadTemplate() {
  await initDB();
  loadedPdfBytes = await getAsset("szablon_pdf");

  if (!loadedPdfBytes) {
    try {
      const res = await fetch("szablon.pdf");
      if (res.ok) {
        loadedPdfBytes = await res.arrayBuffer();
        await storeAsset("szablon_pdf", loadedPdfBytes);
      }
    } catch (_) {}
  }

  // Wstępne wczytanie czcionki
  getHandwritingFontBytes();

  if (loadedPdfBytes) {
    document.getElementById("szablonStatusText").innerHTML = "Szablon załadowany z bazy ✅";
    initPdfPreview();
  } else {
    document.getElementById("szablonStatusText").innerHTML = "Wskaż plik <strong>szablon.pdf</strong>:";
  }
  odswiezLicznikHistorii();
  resizeSigCanvas();
}

document.getElementById("fileUpload").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  if (f) {
    loadedPdfBytes = await f.arrayBuffer();
    await storeAsset("szablon_pdf", loadedPdfBytes);
    document.getElementById("szablonStatusText").innerHTML = "Szablon zapisany w bazie ✅";
    initPdfPreview();
  }
});

async function initPdfPreview() {
  if (!loadedPdfBytes) return;
  pdfDocPreview = await pdfjsLib.getDocument({ data: loadedPdfBytes.slice(0) }).promise;
  renderPage(currentPage);
}

async function renderPage(num) {
  if (!pdfDocPreview) return;
  document.getElementById("pageNumberDisplay").innerText = `Strona ${num} / ${pdfDocPreview.numPages}`;
  const page = await pdfDocPreview.getPage(num);
  
  const unscaled = page.getViewport({ scale: 1.0 });
  const containerWidth = Math.min(window.innerWidth - 32, 850);
  currentScale = containerWidth / unscaled.width;
  const viewport = page.getViewport({ scale: currentScale });

  const canvas = document.getElementById("pdfCanvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  document.getElementById("canvasWrapper").style.width = `${viewport.width}px`;
  document.getElementById("canvasWrapper").style.height = `${viewport.height}px`;

  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  renderDraggableTags(num);
}

function renderDraggableTags(num) {
  const layer = document.getElementById("dragLayer");
  layer.innerHTML = "";

  for(const [id, item] of Object.entries(matryca)) {
    if (item.page !== num) continue;

    const tag = document.createElement("div");
    tag.id = `tag_${id}`;

    if (item.isStrike) {
      tag.className = `drag-box strike-box ${id === activeBoxId ? 'selected' : ''}`;
      tag.innerText = item.label || "── SKREŚLENIE ──";
      tag.style.fontSize = `${10 * currentScale}px`;
    } else {
      let displayVal = item.txt;
      if (!displayVal) {
        const el = document.getElementById(id);
        displayVal = el ? el.value : "—";
      }
      tag.className = `drag-box ${id === activeBoxId ? 'selected' : ''}`;
      tag.innerText = displayVal;
      tag.style.fontSize = `${item.fsize * currentScale}px`;
    }

    tag.style.left = `${item.x * currentScale}px`;
    tag.style.top = `${item.y * currentScale}px`;

    tag.addEventListener("pointerdown", (e) => startDrag(e, id));
    layer.appendChild(tag);
  }
}

function startDrag(e, id) {
  e.preventDefault();
  activeBoxId = id;

  document.querySelectorAll('.drag-box').forEach(el => el.classList.remove('selected'));
  const targetEl = e.currentTarget;
  targetEl.classList.add('selected');
  updateDpadStatus();

  const startX = e.clientX;
  const startY = e.clientY;
  const initX = matryca[id].x;
  const initY = matryca[id].y;

  function onPointerMove(ev) {
    ev.preventDefault();
    matryca[id].x = Math.round(initX + (ev.clientX - startX) / currentScale);
    matryca[id].y = Math.round(initY + (ev.clientY - startY) / currentScale);
    targetEl.style.left = `${matryca[id].x * currentScale}px`;
    targetEl.style.top = `${matryca[id].y * currentScale}px`;
    updateDpadStatus();
  }

  function onPointerUp() {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
}

function nudge(dx, dy) {
  if (!activeBoxId || !matryca[activeBoxId]) return;
  matryca[activeBoxId].x += dx;
  matryca[activeBoxId].y += dy;
  const tag = document.getElementById(`tag_${activeBoxId}`);
  if (tag) {
    tag.style.left = `${matryca[activeBoxId].x * currentScale}px`;
    tag.style.top = `${matryca[activeBoxId].y * currentScale}px`;
  }
  updateDpadStatus();
}

function setNudgeStep(s) {
  currentNudgeStep = s;
  [1, 5, 10].forEach(n => {
    document.getElementById(`step${n}Btn`).className = n === s ? "text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white" : "text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400";
  });
}

function deselectActiveBox() {
  activeBoxId = null;
  document.querySelectorAll('.drag-box').forEach(el => el.classList.remove('selected'));
  document.getElementById("mobileDpad").classList.add("hidden");
  document.getElementById("desktopActiveField").innerText = "Chwyć kafelek myszką lub dotykiem";
}

function updateDpadStatus() {
  if (!activeBoxId) return;
  document.getElementById("mobileDpad").classList.remove("hidden");
  const infoText = `${activeBoxId} (${matryca[activeBoxId].x}, ${matryca[activeBoxId].y})`;
  document.getElementById("dpadLabel").innerText = infoText;
  document.getElementById("desktopActiveField").innerText = `Wybrane: ${infoText}`;
}

window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (!activeBoxId || !matryca[activeBoxId]) return;

  const krok = e.shiftKey ? 5 : 1;
  if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-krok, 0); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(krok, 0); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); nudge(0, -krok); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); nudge(0, krok); }
  else if (e.key === 'Escape') { deselectActiveBox(); }
});

function zapiszMatryce() {
  localStorage.setItem("matryca_paczkomat_v15", JSON.stringify(matryca));
  alert("✅ Matryca (wartości i pozycje skreśleń) została trwale zapisana!");
}

function przywrocWspolrzedne() {
  if (confirm("Przywrócić fabryczną matrycę wraz z pozycjami skreśleń?")) {
    matryca = JSON.parse(JSON.stringify(bazowaMatryca));
    localStorage.removeItem("matryca_paczkomat_v15");
    renderPage(currentPage);
  }
}

function changePage(delta) {
  if (!pdfDocPreview) return;
  const n = currentPage + delta;
  if (n >= 1 && n <= pdfDocPreview.numPages) {
    currentPage = n;
    deselectActiveBox();
    renderPage(currentPage);
  }
}

function switchTab(tab) {
  const vForm = document.getElementById("viewForm");
  const vEditor = document.getElementById("viewEditor");
  const tBtnForm = document.getElementById("tabBtnForm");
  const tBtnEditor = document.getElementById("tabBtnEditor");

  if (tab === 'form') {
    vForm.classList.remove("hidden");
    vEditor.classList.add("hidden");
    tBtnForm.className = "px-3.5 py-1.5 rounded-xl font-bold bg-indigo-600 text-white shadow";
    tBtnEditor.className = "px-3.5 py-1.5 rounded-xl font-bold text-slate-400 hover:text-white";
    deselectActiveBox();
  } else {
    vForm.classList.add("hidden");
    vEditor.classList.remove("hidden");
    tBtnEditor.className = "px-3.5 py-1.5 rounded-xl font-bold bg-indigo-600 text-white shadow";
    tBtnForm.className = "px-3.5 py-1.5 rounded-xl font-bold text-slate-400 hover:text-white";
    if (pdfDocPreview) renderPage(currentPage);
  }
}

// GENEROWANIE 100% AUTONOMICZNEGO DOKUMENTU PDF
async function generujWydrukPDF() {
  const btn = document.getElementById("btnPobierz");
  btn.innerText = "⏳ Generuję...";
  btn.disabled = true;

  try {
    if (!loadedPdfBytes) {
      alert("Wgraj najpierw plik szablon.pdf!");
      btn.innerText = "📄 Pobierz PDF";
      btn.disabled = false;
      return;
    }

    const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes.slice(0));
    pdfDoc.registerFontkit(fontkit);

    let customFont = null;
    let uzytoHelvetiki = false;

    // Pobranie fontu odręcznego z repozytorium GitHub lub pamięci
    const fontBuffer = await getHandwritingFontBytes();
    if (fontBuffer) {
      try {
        customFont = await pdfDoc.embedFont(fontBuffer);
      } catch (e) {
        console.error("Błąd osadzania fontu:", e);
      }
    }

    if (!customFont) {
      customFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      uzytoHelvetiki = true;
    }

    const pages = pdfDoc.getPages();
    const ink = PDFLib.rgb(0.08, 0.18, 0.45); // Odcień niebieskiego długopisu

    const draw = (pNum, txt, x, y, size=11) => {
      const p = pages[pNum - 1];
      p.drawText(uzytoHelvetiki ? usunPolskieZnaki(txt) : String(txt), {
        x,
        y: p.getSize().height - y - (size * 0.25),
        size,
        font: customFont,
        color: ink
      });
    };

    const drawStrikeLine = (pNum, x, y, width) => {
      const p = pages[pNum - 1];
      const h = p.getSize().height;
      p.drawLine({
        start: { x: x, y: h - y },
        end: { x: x + width, y: h - y },
        thickness: 1.4,
        color: ink
      });
    };

    const maTrwalyPodpis = localStorage.getItem("trwaly_podpis_png") !== null;

    // 1. Nanoszenie wartości oraz ruchomych skreśleń
    for (const [id, item] of Object.entries(matryca)) {
      if (item.isStrike) {
        drawStrikeLine(item.page, item.x, item.y, item.width || 30);
        continue;
      }

      let val = item.txt;
      if (!val) {
        const el = document.getElementById(id);
        if (el) val = el.value;
      }
      
      if (id === "podpis" && maTrwalyPodpis) continue;

      if (val) {
        draw(item.page, val, item.x, item.y, item.fsize);
      }
    }

    // 2. Naniesienie odręcznego podpisu w polu "Szymon Kacprzak"
    if (maTrwalyPodpis) {
      const skadrowany = pobierzSkadrowanyPodpis();
      if (skadrowany) {
        const sigImage = await pdfDoc.embedPng(skadrowany.dataUrl);
        const p6 = pages[5];
        const h6 = p6.getSize().height;
        const podCoords = matryca["podpis"] || { x: 104, y: 435 };

        const maxW = 95;
        const maxH = 28;
        let w = maxW;
        let h = w / skadrowany.aspect;
        if (h > maxH) {
          h = maxH;
          w = h * skadrowany.aspect;
        }

        p6.drawImage(sigImage, {
          x: podCoords.x - 12,
          y: h6 - podCoords.y - (h / 2),
          width: w,
          height: h
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Protokol_${document.getElementById("nr_seryjny").value.replace(/[\/\\]/g, '_')}.pdf`;
    link.click();

    zapiszDoHistorii();

  } catch (err) {
    alert("Błąd: " + err.message);
  } finally {
    btn.innerText = "📄 Pobierz PDF";
    btn.disabled = false;
  }
}

window.onload = loadTemplate;
