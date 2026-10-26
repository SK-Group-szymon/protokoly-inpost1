pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const DB_NAME = "ProtokolantDB_A2_v33_weather_fix";
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

// MATRYCA WSPÓŁRZĘDNYCH (USUNIĘTO STRONĘ 6)
const bazowaMatryca = {
  // Strona 1
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
  "skr_p1_okresowego":{"page":1,"x":149,"y":108,"width":85,"isStrike":true},
  "skr_p1_indoor":{"page":1,"x":337,"y":294,"width":137,"isStrike":true},
  "skr_p1_selektywnosc":{"page":1,"x":248,"y":758,"width":26,"isStrike":true},

  // Strona 2
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
  "skr_p2_napiecie":{"page":2,"x":303,"y":163,"width":26,"isStrike":true},
  "skr_p2_iz1":{"page":2,"x":474,"y":287,"width":60,"isStrike":true},
  "skr_p2_iz2":{"page":2,"x":473,"y":302,"width":60,"isStrike":true},
  "skr_p2_iz3":{"page":2,"x":473,"y":320,"width":60,"isStrike":true},
  "skr_p2_pe1":{"page":2,"x":486,"y":500,"width":26,"isStrike":true},
  "skr_p2_pe2":{"page":2,"x":491,"y":530,"width":26,"isStrike":true},
  "skr_p2_pe3":{"page":2,"x":489,"y":555,"width":26,"isStrike":true},
  "skr_p2_pe4":{"page":2,"x":483,"y":574,"width":26,"isStrike":true},
  "skr_p2_pe5":{"page":2,"x":486,"y":590,"width":26,"isStrike":true},
  "skr_p2_pe6":{"page":2,"x":487,"y":606,"width":26,"isStrike":true},
  "skr_p2_pe7":{"page":2,"x":486,"y":623,"width":26,"isStrike":true},
  "skr_p2_pe8":{"page":2,"x":487,"y":641,"width":26,"isStrike":true},
  "skr_p2_ogledziny":{"page":2,"x":456,"y":669,"width":64,"isStrike":true},
  "skr_p2_mocowanie":{"page":2,"x":308,"y":684,"width":69,"isStrike":true},

  // Strona 3
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
  "skr_p3_uziemienie":{"page":3,"x":494,"y":208,"width":26,"isStrike":true},
  "skr_p3_polaczenie_gora":{"page":3,"x":362,"y":513,"width":22,"isStrike":true},
  "skr_p3_ogledziny_rcd":{"page":3,"x":452,"y":591,"width":72,"isStrike":true},
  "skr_p3_test_rcd":{"page":3,"x":462,"y":611,"width":65,"isStrike":true},
  "skr_p3_wylaczyl":{"page":3,"x":499,"y":632,"width":26,"isStrike":true},
  "skr_p3_50prc":{"page":3,"x":142,"y":747,"width":26,"isStrike":true},
  "skr_p3_nie_jest":{"page":3,"x":181,"y":761,"width":55,"isStrike":true},
  "skr_p3_nie_moze":{"page":3,"x":310,"y":761,"width":54,"isStrike":true},

  // Strona 4
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
  "skr_p4_ogledziny_rcd":{"page":4,"x":452,"y":128,"width":72,"isStrike":true},
  "skr_p4_test_rcd":{"page":4,"x":461,"y":149,"width":65,"isStrike":true},
  "skr_p4_wylaczyl":{"page":4,"x":499,"y":168,"width":26,"isStrike":true},
  "skr_p4_50prc":{"page":4,"x":143,"y":284,"width":26,"isStrike":true},
  "skr_p4_nie_jest":{"page":4,"x":180,"y":298,"width":55,"isStrike":true},
  "skr_p4_nie_moze":{"page":4,"x":307,"y":297,"width":58,"isStrike":true},
  "skr_p4_zs1":{"page":4,"x":511,"y":471,"width":26,"isStrike":true},
  "skr_p4_zs2":{"page":4,"x":508,"y":518,"width":26,"isStrike":true},

  // Strona 5
  "nd1":{"page":5,"x":428,"y":96,"fsize":24,"txt":"N/D"},
  "nd2":{"page":5,"x":419,"y":599,"fsize":24,"txt":"N/D"}
};

let matryca = JSON.parse(localStorage.getItem("matryca_paczkomat_v33")) || bazowaMatryca;
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

// POBIERANIE CZCIONKI PATRICK HAND
async function getHandwritingFontBytes() {
  const urls = [
    "https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhand/PatrickHand-Regular.ttf",
    "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/patrickhand/PatrickHand-Regular.ttf"
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        if (buf && buf.byteLength > 20000) return buf;
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
    pokazToast("🎙️ Mikrofon", "Mów wartości...");
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
    if (num) { 
      document.getElementById("napiecie").value = num[0].replace('.', ','); 
      walidujNormy(); przeliczPunkt9();
    }
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
      document.getElementById("p9_zsm_2").value = v;
      walidujImpedancjeZs();
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
    przeliczPunkt9();
    pokazToast("📋 Wczytano", `Przywrócono: ${item.nr_seryjny}`);
  }
}

function usunZHistorii(id) {
  localStorage.setItem("archiwum_protokolow", JSON.stringify(pobierzHistorie().filter(x => x.id !== id)));
  otworzHistorie();
  odswiezLicznikHistorii();
}

// MATEMATYKA & POGODA (API)
const toN = (v) => parseFloat(String(v).replace(',', '.')) || 0;
const toS = (n, d=2) => Number(n).toFixed(d).replace('.', ',');

function usunPolskieZnaki(tekst) {
  const mapa = { 'ą':'a', 'ć':'c', 'ę':'e', 'ł':'l', 'ń':'n', 'ó':'o', 'ś':'s', 'ź':'z', 'ż':'z',
                 'Ą':'A', 'Ć':'C', 'Ę':'E', 'Ł':'L', 'Ń':'N', 'Ó':'O', 'Ś':'S', 'Ź':'Z', 'Ż':'Z' };
  return String(tekst).replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, m => mapa[m] || m);
}

// FIZYKA: PĘTLA ZWARCIA
function przeliczPunkt9() {
  const u0 = toN(document.getElementById("napiecie").value) || 230.0;
  const in1 = toN(document.getElementById("p9_in_1").value) || 10;
  const k1 = toN(document.getElementById("p9_k_1").value) || 5;
  const ia1 = in1 * k1;
  document.getElementById("p9_ia_1").value = ia1;
  document.getElementById("p9_zsd_1").value = toS(u0 / ia1, 2);

  const in2 = toN(document.getElementById("p9_in_2").value) || 16;
  const k2 = toN(document.getElementById("p9_k_2").value) || 5;
  const ia2 = in2 * k2;
  document.getElementById("p9_ia_2").value = ia2;
  document.getElementById("p9_zsd_2").value = toS(u0 / ia2, 2);
}

function walidujImpedancjeZs() {
  przeliczPunkt9();
  const zsm2 = toN(document.getElementById("p9_zsm_2").value);
  const zsm1 = toN(document.getElementById("p9_zsm_1").value);
  // Zs Paczkomatu (pkt 1) musi być większe lub równe Zs Przyłącza (pkt 2)
  if (zsm2 > 0 && (zsm1 <= zsm2 || zsm1 === 0)) {
    const rKabla = 0.05 + (Math.random() * 0.12); // realny opór krótkiego WLZ
    document.getElementById("p9_zsm_1").value = toS(zsm2 + rKabla, 2);
  }
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

// 1. POBIERANIE POGODY TYLKO I WYŁĄCZNIE NA PODSTAWIE DATY (Z 12:00)
async function pobierzPogodeDlaDaty() {
  try {
    const dd = document.getElementById("data_dd").value || new Date().getDate().toString().padStart(2, '0');
    const mm = document.getElementById("data_mm").value || (new Date().getMonth() + 1).toString().padStart(2, '0');
    const rr = document.getElementById("data_rr").value || new Date().getFullYear().toString().slice(-2);
    const fullYear = "20" + rr;
    const dataStr = `${fullYear}-${mm}-${dd}`;

    let temp, wilg;

    // 1. Zawsze najpierw próbujemy pobrać dane archiwalne z wpisanej daty (Open-Meteo Archive API)
    let url = `https://archive-api.open-meteo.com/v1/archive?latitude=52.29&longitude=21.11&start_date=${dataStr}&end_date=${dataStr}&hourly=temperature_2m,relative_humidity_2m`;
    let res = await fetch(url);
    let data = await res.json();

    // 2. Jeśli brakuje danych (np. data to wczoraj, dzisiaj lub przyszłość), przechodzimy na API prognozy długoterminowej
    if (data.error || !data.hourly || data.hourly.temperature_2m.length <= 12 || data.hourly.temperature_2m[12] === null) {
      url = `https://api.open-meteo.com/v1/forecast?latitude=52.29&longitude=21.11&start_date=${dataStr}&end_date=${dataStr}&hourly=temperature_2m,relative_humidity_2m`;
      res = await fetch(url);
      data = await res.json();
    }

    // Niezależnie od tego z którego API pochodzą dane, zawsze bierzemy godzinę 12:00 dla dnia wpisanego w protokół
    if (data && data.hourly && data.hourly.temperature_2m.length > 12) {
      temp = data.hourly.temperature_2m[12];
      wilg = data.hourly.relative_humidity_2m[12];
      
      document.getElementById("temp").value = toS(temp, 1);
      document.getElementById("wilg").value = toS(wilg, 1);
      pokazToast("☁️ Pogoda (12:00)", `Dopasowano dla daty ${dd}.${mm}.${rr}: ${temp}°C, ${wilg}%`);
    } else {
      throw new Error("Brak danych dla wpisanego dnia.");
    }
  } catch (e) {
    console.warn("Błąd API pogody, losowanie zastępcze:", e);
    const mc = parseInt(document.getElementById("data_mm").value || "10");
    let bazowaTemp = 15;
    if (mc <= 2 || mc === 12) bazowaTemp = 3;
    else if (mc >= 6 && mc <= 8) bazowaTemp = 25;
    else if (mc === 3 || mc === 11) bazowaTemp = 8;
    
    document.getElementById("temp").value = toS(bazowaTemp + (Math.random() * 6 - 3), 1);
    document.getElementById("wilg").value = toS(45 + (Math.random() * 25), 1);
  }
}

// 2. SZTUCZNA INTELIGENCJA - FIZYCZNIE SPÓJNE PARAMETRY
async function aiUzupelnijWszystko() {
  pokazToast("✨ AI Oblicza...", "Pobieranie dokładnej pogody z daty i wyliczanie fizyki...");
  
  await pobierzPogodeDlaDaty();

  const losoweU = 228.0 + (Math.random() * 6.5);
  document.getElementById("napiecie").value = toS(losoweU, 1);

  const bazaWartosci = [0.12, 0.18, 0.10, 0.06, 0.07, 0.05, 0.08, 0.04];
  for(let i = 0; i < 8; i++) {
    const val = Math.max(0.03, bazaWartosci[i] + (Math.random() * 0.04 - 0.02));
    document.getElementById(`pe_${i}`).value = toS(val, 2);
  }

  const bazaRx = 4.20 + (Math.random() * 3.50);
  document.getElementById("u1").value = toS(bazaRx + (Math.random() * 0.04 - 0.02), 2);
  document.getElementById("u2").value = toS(bazaRx + (Math.random() * 0.04 - 0.02), 2);
  document.getElementById("u3").value = toS(bazaRx + (Math.random() * 0.04 - 0.02), 2);
  obliczUziemienie();

  document.getElementById("rcd_p_tx1").value = Math.floor(16 + Math.random() * 8);
  document.getElementById("rcd_m_tx1").value = Math.floor(15 + Math.random() * 7);
  document.getElementById("rcd_p_tx5").value = Math.floor(6 + Math.random() * 5);
  document.getElementById("rcd_m_tx5").value = Math.floor(6 + Math.random() * 4);
  document.getElementById("rcd_p_i").value = toS(21.0 + (Math.random() * 3.5), 1);
  document.getElementById("rcd_m_i").value = toS(20.5 + (Math.random() * 3.5), 1);

  przeliczPunkt9();
  const zsPrzylacze = 0.70 + (Math.random() * 0.35);
  const oporKabla = 0.06 + (Math.random() * 0.08);
  const zsPaczkomat = zsPrzylacze + oporKabla;
  document.getElementById("p9_zsm_2").value = toS(zsPrzylacze, 2);
  document.getElementById("p9_zsm_1").value = toS(zsPaczkomat, 2);

  walidujNormy();
}

// INICJALIZACJA
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

  if (loadedPdfBytes) {
    document.getElementById("szablonStatusText").innerHTML = "Szablon załadowany z bazy ✅";
    initPdfPreview();
  } else {
    document.getElementById("szablonStatusText").innerHTML = "Wskaż plik <strong>szablon.pdf</strong>:";
  }
  odswiezLicznikHistorii();
  przeliczPunkt9();

  document.getElementById("napiecie").addEventListener("input", () => {
    walidujNormy();
    przeliczPunkt9();
  });
  document.getElementById("p9_zsm_2").addEventListener("input", walidujImpedancjeZs);
  document.getElementById("p9_in_1").addEventListener("input", przeliczPunkt9);
  document.getElementById("p9_in_2").addEventListener("input", przeliczPunkt9);
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

// RENDEROWANIE ELEMENTÓW
function renderDraggableTags(num) {
  const layer = document.getElementById("dragLayer");
  layer.innerHTML = "";

  for(const [id, item] of Object.entries(matryca)) {
    if (item.page !== num) continue;

    const tag = document.createElement("div");
    tag.id = `tag_${id}`;

    if (item.isStrike) {
      const wPx = (item.width || 30) * currentScale;
      tag.className = `drag-box strike-real-line ${id === activeBoxId ? 'selected' : ''}`;
      tag.style.padding = '0';
      tag.style.background = 'transparent';
      tag.style.border = 'none';
      tag.style.boxShadow = 'none';
      tag.style.height = '14px';
      tag.style.width = `${wPx}px`;
      tag.style.left = `${item.x * currentScale}px`;
      tag.style.top = `${item.y * currentScale}px`;

      tag.innerHTML = `
        <div style="position: absolute; top: 6px; left: 0; right: 0; height: 2.5px; background: #e11d48; border-radius: 1px;"></div>
        <div class="resize-handle" style="position: absolute; right: -5px; top: 2px; width: 10px; height: 10px; background: #991b1b; border: 1.5px solid white; border-radius: 50%; cursor: ew-resize;"></div>
      `;

      const handle = tag.querySelector('.resize-handle');
      handle.addEventListener('pointerdown', (e) => startResizeStrike(e, id));

    } else {
      let displayVal = item.txt;
      if (!displayVal) {
        const el = document.getElementById(id);
        displayVal = el ? el.value : "—";
      }
      tag.className = `drag-box ${id === activeBoxId ? 'selected' : ''}`;
      tag.innerText = displayVal;
      tag.style.fontSize = `${item.fsize * currentScale}px`;
      tag.style.left = `${item.x * currentScale}px`;
      tag.style.top = `${item.y * currentScale}px`;
    }

    tag.addEventListener("pointerdown", (e) => {
      if (e.target.classList.contains('resize-handle')) return;
      startDrag(e, id);
    });
    layer.appendChild(tag);
  }
}

function startResizeStrike(e, id) {
  e.stopPropagation();
  e.preventDefault();
  activeBoxId = id;
  updateDpadStatus();
  const startX = e.clientX;
  const initW = matryca[id].width || 30;

  function onPointerMove(ev) {
    ev.preventDefault();
    matryca[id].width = Math.max(10, Math.round(initW + (ev.clientX - startX) / currentScale));
    const tag = document.getElementById(`tag_${id}`);
    if (tag) tag.style.width = `${matryca[id].width * currentScale}px`;
    updateDpadStatus();
  }
  function onPointerUp() {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
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

function zmienRozmiarBloku(dw, dh) {
  if (!activeBoxId || !matryca[activeBoxId]) return;
  const item = matryca[activeBoxId];
  if (item.isStrike) {
    item.width = Math.max(10, (item.width || 30) + dw);
    const tag = document.getElementById(`tag_${activeBoxId}`);
    if (tag) tag.style.width = `${item.width * currentScale}px`;
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
  const item = matryca[activeBoxId];
  document.getElementById("mobileDpad").classList.remove("hidden");

  let infoText = item.isStrike 
    ? `Skreślenie (${item.x}, ${item.y}) Dł: ${item.width}px`
    : `${activeBoxId} (${item.x}, ${item.y})`;

  document.getElementById("dpadLabel").innerHTML = infoText;
  document.getElementById("desktopActiveField").innerText = `Wybrane: ${infoText}`;

  let scalePanel = document.getElementById("customScaleControlPanel");
  if (scalePanel) scalePanel.remove();

  if (item.isStrike) {
    const p = document.createElement("div");
    p.id = "customScaleControlPanel";
    p.className = "flex gap-1 ml-2 border-l border-slate-700 pl-2";
    p.innerHTML = `
      <button onclick="zmienRozmiarBloku(-4, 0)" class="text-[10px] bg-slate-800 text-amber-300 font-bold px-2 py-1 rounded">Krótsza (-)</button>
      <button onclick="zmienRozmiarBloku(4, 0)" class="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-1 rounded">Dłuższa (+)</button>
    `;
    document.getElementById("mobileDpad").appendChild(p);
  }
}

window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (!activeBoxId || !matryca[activeBoxId]) return;
  const krok = e.shiftKey ? 5 : 1;
  if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-krok, 0); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(krok, 0); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); nudge(0, -krok); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); nudge(0, krok); }
  else if (e.key === '+' || e.key === '=') { 
    e.preventDefault(); 
    zmienRozmiarBloku(4, 0);
  }
  else if (e.key === '-' || e.key === '_') { 
    e.preventDefault(); 
    zmienRozmiarBloku(-4, 0);
  }
  else if (e.key === 'Escape') { deselectActiveBox(); }
});

function zapiszMatryce() {
  localStorage.setItem("matryca_paczkomat_v33", JSON.stringify(matryca));
  alert("✅ Matryca zapisana!");
}

function przywrocWspolrzedne() {
  if (confirm("Przywrócić fabryczną matrycę wraz z pozycjami skreśleń?")) {
    matryca = JSON.parse(JSON.stringify(bazowaMatryca));
    localStorage.removeItem("matryca_paczkomat_v33");
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

// GENEROWANIE DOKUMENTU PDF BEZ OBRAZKA NA STRONIE 6
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

    try {
      const fontBuffer = await getHandwritingFontBytes();
      if (fontBuffer) { customFont = await pdfDoc.embedFont(fontBuffer); }
    } catch (fontErr) { console.warn("Błąd parsowania fontu:", fontErr); }

    if (!customFont) {
      customFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      uzytoHelvetiki = true;
    }

    const pages = pdfDoc.getPages();
    const ink = PDFLib.rgb(0.08, 0.18, 0.45);

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

    // Nanoszenie wartości liczbowych oraz skreśleń
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
      if (val) {
        draw(item.page, val, item.x, item.y, item.fsize);
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const sn = document.getElementById("nr_seryjny").value.replace(/[\/\\]/g, '_');
    link.download = `Protokol_${sn}.pdf`;
    link.click();

    zapiszDoHistorii();

  } catch (err) {
    alert("Błąd generowania PDF: " + err.message);
    console.error(err);
  } finally {
    btn.innerText = "📄 Pobierz PDF";
    btn.disabled = false;
  }
}

window.onload = loadTemplate;
