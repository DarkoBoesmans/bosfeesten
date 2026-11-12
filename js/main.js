var i={limoen:{naam:"Limoen",cmyk:[35,0,100,0],druk:"#B2D334",scherm:"#C9F022",dichtst:"geel 2025",graden:26},mandarijn:{naam:"Mandarijn",cmyk:[0,60,100,0],druk:"#F5821F",scherm:"#FB8316",dichtst:"rood 2025",graden:29},ultra:{naam:"Ultramarijn",cmyk:[90,80,0,0],druk:"#364FA2",scherm:"#2D49CD",dichtst:"blauw 2025",graden:36},druif:{naam:"Druif",cmyk:[70,90,0,0],druk:"#6D3F99",scherm:"#7D29BE",dichtst:"roze 2026",graden:66},lila:{naam:"Lila",cmyk:[35,50,0,0],druk:"#A888BF",scherm:"#B785D9",dichtst:"roze 2026",graden:60},indigo:{naam:"Indigo",cmyk:[85,95,0,0],druk:"#4F3795",scherm:"#5828B8",dichtst:"blauw 2025",graden:58},groen:{naam:"Groen",cmyk:[65,0,100,0],druk:"#60BC46",scherm:"#37CB00",dichtst:"mint 2026",graden:28},creme:{naam:"Crème",cmyk:[2,2,14,0],druk:"#FAF6DE",scherm:"#FFF8DC",dichtst:"geel 2025",graden:4}};var s=[{id:"a",naam:"Limoen & Mandarijn",zin:"Zonnig en luid. Een lichte affiche, fris groen met oranje en een diepblauwe tegenkleur.",harmonie:"Jullie inspiratie blauw, limoen, rood, met mandarijn in plaats van rood (rood was 2025). Split-complementair rond Ultramarijn.",kleuren:{P:i.limoen,S:i.mandarijn,A:i.ultra,B:i.mandarijn,L:i.creme},bon:{licht:i.limoen,zwaar:i.ultra}},{id:"b",naam:"Ultramarijn & Limoen",zin:"Diepblauwe affiche met een fel groen patroon en oranje als vonk.",harmonie:"Zelfde drie kleuren als A, maar donker. Split-complementair rond Ultramarijn.",kleuren:{P:i.ultra,S:i.limoen,A:i.mandarijn,B:i.limoen,L:i.creme},bon:{licht:i.limoen,zwaar:i.ultra}},{id:"c",naam:"Lila & Limoen",zin:"Zacht en zomers. Lila met limoen en een oranje accent.",harmonie:"Complementair paar (Lila en Limoen staan tegenover elkaar) met Mandarijn als warm accent.",kleuren:{P:i.lila,S:i.limoen,A:i.mandarijn,B:i.limoen,L:i.creme},bon:{licht:i.limoen,zwaar:i.lila}},{id:"d",naam:"Indigo & Groen",zin:"Jullie triade oranje, paars, groen. Donker paarsblauw met groen patroon.",harmonie:"Triade: Mandarijn, Indigo en Groen liggen bijna op gelijke afstand op de kleurcirkel.",kleuren:{P:i.indigo,S:i.groen,A:i.mandarijn,B:i.groen,L:i.creme},bon:{licht:i.mandarijn,zwaar:i.indigo}},{id:"e",naam:"Groen & Indigo",zin:"Dezelfde triade, maar licht: groene affiche met indigo patroon.",harmonie:"Triade: Mandarijn, Indigo en Groen. Let op: een groene affiche volgt op de mintgroene van 2026.",kleuren:{P:i.groen,S:i.indigo,A:i.mandarijn,B:i.indigo,L:i.creme},bon:{licht:i.mandarijn,zwaar:i.indigo}}];var v={naam:"affiche",titel:"Affiche A2",b:1280,h:1810},C=[v,{naam:"flyer",titel:"Flyer A5",b:720,h:1022},{naam:"prijslijst",titel:"Prijslijst",b:900,h:1273},{naam:"bonnetjes",titel:"Prijslijst bonnetjes",b:900,h:1273}],S=[{jaar:"2025",kleuren:["#FF5252","#FFD600","#40C4FF"],alt:"Affiche Bosfeesten 2025: rood met geel patroon, blauwe en rode badges"},{jaar:"2026",kleuren:["#4DBD97","#EF476F","#1F9AA9","#FFC43E"],alt:"Affiche Bosfeesten 2026: mintgroen met roze patroon, teal en gele accenten"}];var c=(e,t=document)=>t.querySelector(e),u=(e,t=document)=>[...t.querySelectorAll(e)];function V(e=new Date){let t=e.getFullYear(),n=1+(6-new Date(t,7,1).getDay()+7)%7+7,r=new Date(t,7,n+2);return e>r?t+1:t}var y={};try{y=JSON.parse(localStorage.getItem("bf-stemmen")??"{}")}catch{}var W=()=>{try{localStorage.setItem("bf-stemmen",JSON.stringify(y))}catch{}},w=(e)=>y[e]??0;function P(e,t){y[e]=Math.max(0,w(e)+t),W()}function Z(){y={},W()}var B=(e)=>[1,3,5].map((t)=>parseInt(e.slice(t,t+2),16)),ke=(e)=>(e/=255)<=0.04045?e/12.92:((e+0.055)/1.055)**2.4,q=(e)=>{let[t,a,n]=B(e).map(ke);return 0.2126*t+0.7152*a+0.0722*n};function A(e,t){let[a,n]=[q(e),q(t)].sort((r,o)=>o-r);return(a+0.05)/(n+0.05)}var g=(e)=>A(e,"#17171A")>A(e,"#FFFFFF")?"#17171A":"#FFFFFF",J=([e,t,a,n])=>`C${e} M${t} Y${a} K${n}`,Y=(e)=>e.reduce((t,a)=>t+a,0);var H=new Map;function he(e){return new Promise((t,a)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>a(Error(`Kon ${e} niet laden.`)),n.src=e})}function fe(e,{b:t,h:a}){let n=document.createElement("canvas");n.width=t,n.height=a;let r=n.getContext("2d",{willReadFrequently:!0});return r.drawImage(e,0,0),r.getImageData(0,0,t,a).data}function $e(e){if(!H.has(e.naam)){let t=`assets/kunst/${e.naam}`;H.set(e.naam,Promise.all([`${t}.m1.webp`,`${t}.m2.webp`,`${t}.v.jpg`].map(he)).then((a)=>a.map((n)=>fe(n,e))))}return H.get(e.naam)}async function Q(e,t,a){let[n,r,o]=await $e(t),[l,_,z,h,ce]=["P","S","L","A","B"].map((d)=>B(a[d].druk));e.width=t.b,e.height=t.h;let N=e.getContext("2d"),G=N.createImageData(t.b,t.h),D=G.data;for(let d=0;d<D.length;d+=4){let de=n[d],me=n[d+1],ue=n[d+2],pe=r[d],ge=r[d+1],be=r[d+2];for(let m=0;m<3;m++)D[d+m]=(de*l[m]+me*_[m]+ue*z[m]+pe*h[m]+ge*ce[m]+be*o[d+m])/255;D[d+3]=255}N.putImageData(G,0,0)}var j=(e,t)=>`<canvas class="c-kunst" data-werk="${e.naam}" data-combo="${t.id}" width="${e.b}" height="${e.h}"
    role="img" aria-label="${e.titel} in combo ${t.id.toUpperCase()}, ${t.naam}"></canvas>`;function b(e,t,a,n){let r=e==="licht"?"Lichte drank":"Zware drank",o=i.creme.druk;return`<svg class="c-bon" viewBox="0 0 1618 1000" role="img" aria-label="Drankbon ${r.toLowerCase()} ${n}: ${t.naam} met letters in ${a.naam}">
    <rect width="1618" height="1000" fill="${t.druk}"/>
    <g class="c-bon__label" fill="${o}" stroke="${a.druk}">
      <text x="110" y="170">${r}</text>
      <text x="1508" y="900" text-anchor="end">${r}</text>
    </g>
    <g class="c-bon__titel">
      <text x="110" y="560" textLength="1398" lengthAdjust="spacingAndGlyphs"><tspan fill="${a.druk}" stroke="${o}">Bos</tspan><tspan fill="${o}" stroke="${a.druk}"> ${n}</tspan></text>
      <text x="110" y="790" textLength="1398" lengthAdjust="spacingAndGlyphs" fill="${a.druk}" stroke="${o}">Feesten</text>
    </g>
  </svg>`}var f=(e)=>e.id.toUpperCase();function _e(e,t,a){let n=e.kleuren;return`<section class="c-dia" id="dia-${e.id}" aria-label="Combo ${f(e)}: ${e.naam}" style="--dia-p:${n.P.druk};--dia-tekst:${g(n.P.druk)};--dia-s:${n.S.druk}">
    <div class="c-dia__affiche">${j(v,e)}</div>
    <div class="c-dia__info">
      <p class="c-dia__teller">${t+1} / ${s.length} · pijltjes of A tot ${f(s[s.length-1])}</p>
      <h2 class="c-dia__titel"><span class="c-dia__letter">${f(e)}</span>${e.naam}</h2>
      <ul class="c-dia__kleuren">
        ${[n.P,n.S,n.A].map((r)=>`<li><i style="background:${r.druk}"></i>${r.naam}</li>`).join("")}
      </ul>
      <div class="c-dia__bonnen">${b("licht",e.bon.licht,e.bon.zwaar,a)}${b("zwaar",e.bon.zwaar,e.bon.licht,a)}</div>
      <div class="c-dia__acties">
        <button type="button" class="c-dia__knop c-dia__knop--vol" data-stem="${e.id}">Stem op ${f(e)}</button>
        <a class="c-dia__knop" href="#${e.id}">Bekijk huisstijl en drukwerk <span aria-hidden="true">→</span></a>
      </div>
      <div class="c-dia__klaar" hidden>
        <p class="c-dia__bevestig" role="status">Gestemd op <b data-gekozen></b>. Geef de laptop door.</p>
        <button type="button" class="c-dia__knop c-dia__knop--vol" data-volgende>Volgende persoon</button>
        <button type="button" class="c-dia__terug" data-ongedaan>Stem ongedaan maken</button>
      </div>
    </div>
  </section>`}function X(e){return`
  <main class="c-show" aria-label="Kleurvoorstellen Bosfeesten ${e}">
    <div class="c-show__spoor" tabindex="0">${s.map((t,a)=>_e(t,a,e)).join("")}</div>
    <nav class="c-show__nav" aria-label="Combo kiezen">
      <button type="button" class="c-show__pijl" data-stap="-1" aria-label="Vorige combo">←</button>
      ${s.map((t,a)=>`<button type="button" class="c-show__letter" data-naar="${a}"${a===0?' aria-current="true"':""} style="--kleur:${t.kleuren.P.druk}">${f(t)}</button>`).join("")}
      <button type="button" class="c-show__pijl" data-stap="1" aria-label="Volgende combo">→</button>
      <button type="button" class="c-show__alles" data-alles>Alles naast elkaar ↓</button>
    </nav>
  </main>

  <section class="c-alle" id="alle" aria-labelledby="alle-titel">
    <header class="c-alle__kop">
      <h2 class="c-alle__titel" id="alle-titel">Bosfeesten ${e}: welke kleuren?</h2>
      <p class="c-alle__uitleg">Klik een affiche om ze groot te zien en te stemmen. Geen rood, roze, hemelsblauw of mint: die waren van 2025 en 2026.</p>
    </header>
    <div class="c-alle__raster">
      ${s.map((t,a)=>`
      <figure class="c-alle__item">
        <button type="button" class="c-alle__beeld" data-naar="${a}" aria-label="Combo ${f(t)} groot bekijken">${j(v,t)}</button>
        <figcaption class="c-alle__naam"><b>${f(t)}</b> ${t.naam}<span class="c-alle__stemmen" data-telling="${t.id}">${w(t.id)}</span></figcaption>
      </figure>`).join("")}
    </div>
    <div class="c-alle__uitslag">
      <button type="button" class="c-knop" data-uitslag>Toon de stemmen</button>
      <button type="button" class="c-knop c-knop--rand" data-wis>Stemmen op nul</button>
    </div>
  </section>

  <section class="c-vorig" aria-labelledby="vorig-titel">
    <h2 class="c-vorig__titel" id="vorig-titel">Zo zag het er de vorige jaren uit</h2>
    <div class="c-vorig__rij">
      ${S.map((t)=>`
      <figure class="c-vorig__jaar">
        <button type="button" class="c-vorig__knop" data-groot="assets/vorig/${t.jaar}-groot.jpg" data-alt="${t.alt}" aria-label="Affiche ${t.jaar} groot bekijken">
          <img src="assets/vorig/${t.jaar}.jpg" alt="${t.alt}" width="700" height="990" loading="lazy">
        </button>
        <div class="c-vorig__bonnen">
          <img src="assets/vorig/bon-${t.jaar}-licht.webp" alt="Drankbon lichte drank ${t.jaar}" width="500" height="301" loading="lazy">
          <img src="assets/vorig/bon-${t.jaar}-zwaar.webp" alt="Drankbon zware drank ${t.jaar}" width="500" height="301" loading="lazy">
        </div>
        <figcaption>${t.jaar}</figcaption>
      </figure>`).join("")}
      <p class="c-vorig__tekst">In 2025 was blauw de lichte bon en rood de zware. In 2026 werd rood-roze net de lichte. Daarom is de lichte bon nu altijd een lichte kleur en de zware altijd de donkerste.</p>
    </div>
  </section>`}var F=(e)=>e.toUpperCase(),ve=(e)=>e>=4.5?"goed voor alle tekst":e>=3?"goed voor grote tekst":"alleen voor grote titels",ye=[{r:"P",rol:"Primary · 60%",gebruik:"Achtergrond van affiche en flyer, altijd onder het boompjespatroon."},{r:"S",rol:"Secondary · 30%",gebruik:"Boompjespatroon, rand rond de titel, jaartal en Meis-badge."},{r:"A",rol:"Accent · 10%",gebruik:"Datumblokken, uren, Plein-badge en knoppen op de site."},{r:"L",rol:"Papier",gebruik:'Papierkleur, titel "BOS FEESTEN" en tekst op gekleurde vlakken.'}];function we(e,t,a,n){let r=e.kleuren[t],o=(l)=>`<button type="button" class="c-kopie" data-kopie="${l}">${l}</button>`;return`<article class="c-kleur">
    <div class="c-kleur__vlak">
      <span class="c-kleur__druk" style="background:${r.druk};color:${g(r.druk)}"><span class="c-kleur__rol">${a}</span><span class="c-kleur__naam">${r.naam}</span></span>
      <span class="c-kleur__scherm" style="background:${r.scherm};color:${g(r.scherm)}">scherm</span>
    </div>
    <dl class="c-kleur__waarden">
      <div><dt>CMYK</dt><dd>${o(J(r.cmyk))}</dd></div>
      <div><dt>Hex druk</dt><dd>${o(r.druk)}</dd></div>
      <div><dt>Hex scherm</dt><dd>${o(r.scherm)}</dd></div>
      <div><dt>Inkt</dt><dd>${Y(r.cmyk)}% totaal</dd></div>
    </dl>
    <p class="c-kleur__gebruik">${n}</p>
    ${t==="L"?"":`<p class="c-kleur__afstand">${r.graden}° van ${r.dichtst} op de kleurcirkel.</p>`}
  </article>`}function ee(e,t){let a=e.kleuren,n=i.creme.druk,r=[a.P,a.S,a.A];return`<div class="o-pagina">
  <nav class="c-pad" aria-label="Combo's">
    <a class="c-pad__link c-pad__link--terug" href="#">Alle combo's</a>
    ${s.map((o)=>`<a class="c-pad__link" href="#${o.id}"${o.id===e.id?' aria-current="page"':""}><i style="background:${o.kleuren.P.druk}"></i><i style="background:${o.kleuren.S.druk}"></i><i style="background:${o.kleuren.A.druk}"></i>${F(o.id)} · ${o.naam}</a>`).join("")}
  </nav>
  <main>
    <header class="c-held" style="background:${a.P.druk};color:${g(a.P.druk)}">
      <div class="c-held__tekst">
        <p class="c-held__letter">${F(e.id)}</p>
        <h1 class="c-held__titel">${e.naam}</h1>
        <p class="c-held__zin">${e.zin}</p>
        <p class="c-held__harmonie">${e.harmonie}</p>
        <p class="c-held__jaar">Huisstijl Bosfeesten ${t}</p>
      </div>
      <div class="c-held__bonnen">
        ${b("licht",e.bon.licht,e.bon.zwaar,t)}
        ${b("zwaar",e.bon.zwaar,e.bon.licht,t)}
      </div>
    </header>

    <section class="o-sectie" aria-labelledby="vb-titel">
      <h2 class="c-sectie-titel" id="vb-titel">Drukwerk in deze kleuren</h2>
      <p class="c-sectie-tekst">Rechtstreeks uit drukwerk.af, automatisch herkleurd. Opmaak en teksten zijn die van nu. Klik om groot te bekijken.</p>
      <div class="c-voorbeelden">
        ${C.map((o)=>`<figure class="c-voorbeeld"><button type="button" class="c-voorbeeld__knop" data-vergroot aria-label="${o.titel} groot bekijken">${j(o,e)}</button><figcaption>${o.titel}</figcaption></figure>`).join("")}
      </div>
    </section>

    <section class="o-sectie" aria-labelledby="kleuren-titel">
      <h2 class="c-sectie-titel" id="kleuren-titel">Kleuren</h2>
      <p class="c-sectie-tekst">Typ in drukwerk.af de CMYK-waarden in de hoofdstalen. "Hex scherm" is de fellere versie voor de website, Instagram en Facebook. Klik op een waarde om ze te kopiëren.</p>
      <div class="c-kleuren">${ye.map(({r:o,rol:l,gebruik:_})=>we(e,o,l,_)).join("")}</div>
    </section>

    <section class="o-sectie o-gulden" aria-labelledby="bon-titel">
      <div>
        <h2 class="c-sectie-titel" id="bon-titel">Drankbonnen</h2>
        <ul class="c-lijst">
          <li>Lichte drank is ${e.bon.licht.naam}, de lichtste kleur. Zware drank is ${e.bon.zwaar.naam}, de donkerste.</li>
          <li>Het verschil zit ook in helderheid, dus aan de toog in het donker en voor kleurenblinden blijven ze uit elkaar te houden.</li>
          <li>Geen rood, roze, hemelsblauw of mint, zodat een bon van vorig jaar meteen opvalt.</li>
        </ul>
      </div>
      <div>
        <div class="c-oudebonnen">
          <figure>${b("licht",e.bon.licht,e.bon.zwaar,t)}${b("zwaar",e.bon.zwaar,e.bon.licht,t)}<figcaption><b>${t}, combo ${F(e.id)}</b>: licht links, zwaar rechts</figcaption></figure>
          ${S.map((o)=>`<figure><img src="assets/vorig/bon-${o.jaar}-licht.webp" alt="Lichte drankbon ${o.jaar}" width="500" height="301" loading="lazy"><img src="assets/vorig/bon-${o.jaar}-zwaar.webp" alt="Zware drankbon ${o.jaar}" width="500" height="301" loading="lazy"><figcaption>${o.jaar}: licht links, zwaar rechts</figcaption></figure>`).join("")}
        </div>
      </div>
    </section>

    <section class="o-sectie o-gulden" aria-labelledby="regels-titel">
      <div>
        <h2 class="c-sectie-titel" id="regels-titel">Verhouding en regels</h2>
        <div class="c-verhouding" role="img" aria-label="Verhouding 60 procent ${a.P.naam}, 30 procent ${a.S.naam}, 10 procent ${a.A.naam}">
          ${r.map((o,l)=>`<span style="flex:${[60,30,10][l]};background:${o.druk};color:${g(o.druk)}">${[60,30,10][l]}</span>`).join("")}
        </div>
        <ul class="c-lijst">
          <li>Het boompjespatroon staat in ${a.S.naam} op ${a.P.naam}, nooit op ${a.L.naam}.</li>
          <li>De titel "BOS FEESTEN" is ${a.L.naam} met een rand in ${a.S.naam}.</li>
          <li>Lange tekst staat in ${e.bon.zwaar.naam} op ${a.L.naam}.</li>
          <li>Plein krijgt ${a.A.naam}, Meis krijgt ${a.B.naam}.</li>
          <li>Logo's van sponsors blijven in hun eigen kleuren op ${a.L.naam}.</li>
        </ul>
      </div>
      <div>
        <h3 class="c-sectie-titel c-sectie-titel--klein">Lettertypes</h3>
        <p class="c-letter c-letter--titel">Hipstelvetica</p>
        <p class="c-letter__uitleg">Titels, logo, badges</p>
        <p class="c-letter c-letter--slab">Roboto Slab 13 Augustus</p>
        <p class="c-letter__uitleg">Datums, uren en prijzen</p>
        <p class="c-letter">Poppins voor alle andere tekst</p>
        <h3 class="c-sectie-titel c-sectie-titel--klein">Crème tekst lezen</h3>
        <dl class="c-contrast">
          ${r.map((o)=>{let l=A(n,o.druk);return`<div><dt><i style="background:${o.druk}"></i>op ${o.naam}</dt><dd>${l.toFixed(1)}:1, ${ve(l)}</dd></div>`}).join("")}
        </dl>
      </div>
    </section>

    <nav class="c-verder" aria-label="Andere combo's">
      ${s.filter((o)=>o.id!==e.id).map((o)=>`<a class="c-verder__link" href="#${o.id}" style="background:${o.kleuren.P.druk};color:${g(o.kleuren.P.druk)}"><span>Combo ${F(o.id)}</span>${o.naam}</a>`).join("")}
    </nav>
  </main></div>`}var te=0;function L(e){let t=c("#toast");if(!t)return;t.textContent=e,clearTimeout(te),te=window.setTimeout(()=>t.textContent="",2500)}function ae(){return`<dialog class="c-lightbox" id="lightbox" aria-label="Vergroot beeld">
    <img class="c-lightbox__beeld" alt="">
    <button type="button" class="c-lightbox__sluit" data-sluit>Sluiten</button>
  </dialog>`}function I(e,t){let a=c("#lightbox"),n=c(".c-lightbox__beeld",a??document);if(!a||!n)return;n.src=e,n.alt=t,a.showModal()}function ne(e){let t=c("#lightbox");if(t?.open&&(e.target===t||e.target.closest("[data-sluit]")))t.close()}var R=()=>c(".c-show__spoor"),oe=()=>u(".c-dia");function k(){let e=R();return e?Math.round(e.scrollLeft/e.clientWidth):0}function O(e){oe().forEach((t,a)=>t.toggleAttribute("inert",a!==e)),u(".c-show__letter").forEach((t,a)=>t.toggleAttribute("aria-current",a===e))}function M(e){return u(".c-dia")[e]?.querySelector(".c-dia__acties:not([hidden]) .c-dia__knop, .c-dia__klaar:not([hidden]) .c-dia__knop")??null}function E(e,t=!1){let a=R();if(!a)return;let n=oe().length,r=(e+n)%n;O(r);let o=!matchMedia("(prefers-reduced-motion: reduce)").matches;if(a.scrollTo({left:r*a.clientWidth,behavior:o?"smooth":"auto"}),c(".c-show")?.scrollIntoView({block:"start",behavior:o?"smooth":"auto"}),t)M(r)?.focus({preventScroll:!0})}function re(){let e=R();if(!e)return;O(k());let t=0;e.addEventListener("scroll",()=>{clearTimeout(t),t=window.setTimeout(()=>O(k()),120)},{passive:!0})}var p=null;function x(){for(let e of u(".c-dia")){e.querySelector(".c-dia__acties").hidden=p!==null,e.querySelector(".c-dia__klaar").hidden=p===null;let t=e.querySelector("[data-gekozen]");if(t)t.textContent=p?.toUpperCase()??""}u("[data-telling]").forEach((e)=>e.textContent=String(w(e.dataset.telling)))}function ie(e){if(p)return;P(e,1),p=e,x()}function le(){if(!p)return;P(p,-1),p=null,x()}function K(){p=null,x()}var U=c("#inhoud"),T=V(),je=new Map([v,...C].map((e)=>[e.naam,e]));function se(){let e=s.find((t)=>t.id===location.hash.slice(1));U.innerHTML=(e?ee(e,T):X(T))+ae(),document.title=e?`Combo ${e.id.toUpperCase()} · ${e.naam} · Bosfeesten ${T}`:`Bosfeesten ${T} Kleurkeuze`;for(let t of u("canvas[data-werk]",U)){let a=s.find((n)=>n.id===t.dataset.combo);Q(t,je.get(t.dataset.werk),a.kleuren).catch((n)=>L(n.message))}re(),x()}async function Le(e){try{await navigator.clipboard.writeText(e),L(`Gekopieerd: ${e}`)}catch{L("Kopiëren lukt hier niet. Selecteer de tekst zelf.")}}addEventListener("hashchange",()=>{se(),scrollTo(0,0),U.focus({preventScroll:!0})});document.addEventListener("click",(e)=>{let t=e.target,a=t.closest("[data-stem]");if(a){ie(a.dataset.stem),M(k())?.focus();return}if(t.closest("[data-ongedaan]")){le(),M(k())?.focus();return}if(t.closest("[data-volgende]")){K(),E(0,!0);return}let n=t.closest("[data-naar]");if(n){E(Number(n.dataset.naar),!0);return}let r=t.closest("[data-stap]");if(r){E(k()+Number(r.dataset.stap));return}if(t.closest("[data-alles]")){c("#alle")?.scrollIntoView({behavior:"smooth"});return}let o=t.closest("[data-uitslag]");if(o){let h=document.body.classList.toggle("toon-uitslag");o.textContent=h?"Verberg de stemmen":"Toon de stemmen";return}if(t.closest("[data-wis]")){Z(),K(),L("Stemmen staan op nul.");return}let l=t.closest("[data-groot]");if(l){I(l.dataset.groot,l.dataset.alt??"");return}let _=t.closest("[data-vergroot]");if(_){let h=c("canvas",_);if(h)I(h.toDataURL("image/jpeg",0.92),h.getAttribute("aria-label")??"");return}let z=t.closest("[data-kopie]");if(z){Le(z.dataset.kopie);return}ne(e)});se();document.addEventListener("keydown",(e)=>{if(location.hash.length>1||e.altKey||e.ctrlKey||e.metaKey||c("#lightbox")?.open)return;let t=!!(document.activeElement&&document.activeElement.closest(".c-show")),a=(n)=>{e.preventDefault(),E(n,t||document.activeElement===document.body)};if(e.key==="ArrowRight")a(k()+1);else if(e.key==="ArrowLeft")a(k()-1);else{let n=s.findIndex((r)=>r.id===e.key.toLowerCase());if(n>=0)a(n)}});
