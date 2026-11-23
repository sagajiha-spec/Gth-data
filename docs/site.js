// Go Trainer Helper 안내 페이지 공통: 언어 고르기 (주소 ?lang=ko 또는 기기 언어)
const LANGS = ["ko","ja","en","zh-Hant","zh-Hans","fr","de","es","it"];
const LANG_NAMES = {"ko":"한국어","ja":"日本語","en":"English","zh-Hant":"繁體中文","zh-Hans":"简体中文","fr":"Français","de":"Deutsch","es":"Español","it":"Italiano"};
// 문의 메일: 앱 전용 이메일이 정해지면 여기만 바꾸면 됨
const CONTACT = "";
const CONTACT_SOON = {"ko":"(문의 메일 준비 중)","ja":"（お問い合わせメール準備中）","en":"(contact email coming soon)","zh-Hant":"（聯絡信箱準備中）","zh-Hans":"（联系邮箱准备中）","fr":"(adresse de contact bientôt disponible)","de":"(Kontakt-E-Mail folgt)","es":"(correo de contacto próximamente)","it":"(email di contatto in arrivo)"};
function pickLang(){
  const q = new URLSearchParams(location.search).get("lang");
  if (q && LANGS.includes(q)) return q;
  const n = (navigator.language||"en").toLowerCase();
  if (n.startsWith("zh")) return /(tw|hk|mo|hant)/.test(n) ? "zh-Hant" : "zh-Hans";
  const b = n.split("-")[0];
  return LANGS.includes(b) ? b : "en";
}
function render(T){
  const l = pickLang();
  const t = T[l] || T.en;
  document.documentElement.lang = l;
  document.title = t.title;
  const mail = CONTACT ? `<a href="mailto:${CONTACT}">${CONTACT}</a>` : CONTACT_SOON[l];
  const nav = LANGS.map(x => x===l ? `<b>${LANG_NAMES[x]}</b>` : `<a href="?lang=${x}">${LANG_NAMES[x]}</a>`).join(" · ");
  document.getElementById("app").innerHTML =
    `<nav class="langs">${nav}</nav><h1>${t.title}</h1><p class="upd">${t.updated}</p>` +
    t.sections.map(s => `<h2>${s[0]}</h2>` + (Array.isArray(s[1]) ? `<ul>${s[1].map(i=>`<li>${i}</li>`).join("")}</ul>` : `<p>${s[1]}</p>`)).join("").replaceAll("{mail}", mail);
}
