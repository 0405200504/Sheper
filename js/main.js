/* ==========================================================================
   SHEPER — interações: FAQ, carrossel de fundadores, reveal, smooth scroll,
   header adaptativo (claro/escuro)
   ========================================================================== */

/* ---------- FAQ (componente data-driven) ---------- */
const FAQ_ITEMS = [
  {
    q: "A Sheper é um curso?",
    a: "Não. A Sheper é uma comunidade com aulas, trilhas, lives, feedbacks, desafios e networking. Você aprende e aplica com acompanhamento de verdade.",
  },
  {
    q: "Preciso entender de moda pra entrar?",
    a: "Não. A Sheper é justamente pra quem quer começar a se vestir melhor com direção, sem depender de tentativa e erro.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. A assinatura é mensal e você pode cancelar quando quiser.",
  },
  {
    q: "A comunidade serve pra quem gosta de streetwear?",
    a: "Sim. Streetwear é um dos pilares fortes da Sheper, mas a comunidade também fala de identidade, modelagem, cores, sneakers, acessórios, imagem pessoal e presença.",
  },
  {
    q: "Vou receber feedback individual?",
    a: "Sim. Você posta seu outfit, dúvida de compra e guarda-roupa pra receber feedback direto e prático.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Você tem 7 dias pra testar. Não curtiu, cancela e recebe de volta.",
  },
  {
    q: "Qual o valor?",
    a: "R$39,90 por mês. Menos que um lanche por semana.",
  },
  {
    q: "Onde eu entro?",
    a: "Clica em qualquer botão de assinatura da página e finaliza sua entrada pela página de pagamento.",
  },
];

function buildFaq() {
  const list = document.getElementById("faq-list");
  if (!list) return;

  FAQ_ITEMS.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "faq-item";
    el.innerHTML = `
      <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-btn-${i}">
        <span>${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="faq-answer" id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}">
        <p>${item.a}</p>
      </div>
    `;
    list.appendChild(el);
  });

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-question");
    if (!btn) return;
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-answer");
    const isOpen = item.classList.contains("open");

    list.querySelectorAll(".faq-item.open").forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = "0px";
      }
    });

    item.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
    answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";
  });
}

/* ---------- Fundadores (dados) ----------
   Fotos: salvar em img/fundadores/ com o nome indicado em `photo` (9:16, tratamento
   uniforme P&B). Enquanto a foto não existir, o slide mostra o placeholder da marca. */
const FOUNDERS = [
  {
    name: "Juck",
    handle: "@juckfe",
    stats: "INSTAGRAM 425K · TIKTOK 180K",
    cred: "Criador de conteúdo de moda que vive de viralizar.",
    bio: "Juck faz conteúdo de moda há uns 5 anos e domina o jogo como poucos. Sabe montar vídeo que prende, viraliza forte e tem um alcance que a maioria não chega perto. A régua é alta: vídeos passando de 6 milhões de views e parcerias com marcas muito grandes. Não é sorte, é frequência e mão pra criar conteúdo que performa.",
    photo: "img/fundadores/01-juck.jpg",
  },
  {
    name: "Asaf",
    handle: "@asaf.pj",
    stats: "TIKTOK 215K · INSTAGRAM 180K",
    cred: "Criador de conteúdo de moda que une estilo e inteligência artificial.",
    bio: "Asaf é carioca, monta outfits afiados e cria conteúdo de moda há um bom tempo, o que já lhe rendeu relevância no meio. A foto sempre foi a força dele. Hoje puxa a frente ensinando a galera a melhorar as fotos com IA, mostrando prompt e técnica na prática. É o cara que manja de inteligência artificial e coloca isso a serviço da moda.",
    photo: "img/fundadores/02-asaf.jpg",
  },
  {
    name: "Master",
    handle: "@gabrielmaster_",
    stats: "INSTAGRAM 200K · TIKTOK 110K",
    cred: "Criador de conteúdo de moda, games e lifestyle.",
    bio: "Master ganhou o mundo no Fortnite, foi um dos melhores do planeta no começo do jogo. Depois virou a chave pra moda: hoje posta fit atrás de fit, monta looks afiados e carrega um lifestyle que chama atenção. O trunfo é a ponte entre os dois mundos. Trouxe a comunidade gigante do game junto e usa isso pra puxar essa galera pra cima: academia, estilo, festa e viagem. Prova viva de que dá pra sair da frente da tela e construir uma vida foda.",
    photo: "img/fundadores/03-master.jpg",
  },
  {
    name: "Evertom Pombo",
    handle: "@evertonpombo",
    stats: "TIKTOK 170K · INSTAGRAM 39K",
    cred: "Sneakerhead e criador de conteúdo.",
    bio: "Evertom Pombo é o cara dos tênis. Faz conteúdo de moda com a veia voltada pros sneakers: explica, destrincha e mostra tudo sobre calçado como poucos. Já tem nome firmado e relevância no nicho. Quando o assunto é sneaker, ele é referência.",
    photo: "img/fundadores/04-evertom-pombo.jpg",
  },
  {
    name: "Juan Pablo",
    handle: "@juanpablboy",
    stats: "INSTAGRAM 150K · TIKTOK 60K",
    cred: "Fundador da Tears e especialista em branding.",
    bio: "Juan vive de internet há mais de 12 anos. É dono da Tears, marca de streetwear. Sua praia é branding e criação de marca do zero, é aí que ele é referência. Nesse tempo virou nome construindo marca, comunidade e estratégia que vira venda de verdade, não métrica de vaidade.",
    photo: "img/fundadores/05-juan-pablo.jpg",
  },
  {
    name: "Nathan Cabral",
    handle: "@_nathancabral",
    stats: "INSTAGRAM 100K · TIKTOK 48K",
    cred: "Criador de conteúdo de moda e lifestyle.",
    bio: "Nathan Cabral tem 17 anos e faz conteúdo de moda há uns 2, mas já passou de 100 mil seguidores em pouco tempo. Crescimento rápido e conteúdo que vai além da roupa: fala de desenvolvimento pessoal e mostra o próprio lifestyle. Evolução, academia e religião são a base da marca dele, e é isso que conecta. Já rodou parceria com marca internacional e nomes grandes do nacional.",
    photo: "img/fundadores/06-nathan-cabral.jpg",
  },
  {
    name: "Gabriel Satiro",
    handle: "@bielsatiro",
    stats: "TIKTOK 100K · INSTAGRAM 40K",
    cred: "Fundador de duas marcas de roupa e criador de conteúdo de moda.",
    bio: "Gabriel Satiro vive de moda há uns 6 anos e toca duas marcas próprias de roupa (anny & tears). Foi um dos primeiros no Brasil a ensinar a galera a se vestir de verdade, e ajudou a abrir esse caminho pro streetwear por aqui. Fez nome unindo conteúdo e as próprias marcas, e já rodou colab com nomes grandes, inclusive gringos.",
    photo: "img/fundadores/07-gabriel-satiro.jpg",
  },
  {
    name: "Thalys Ronald",
    handle: "@thalys.ronald",
    stats: "TIKTOK 85K · INSTAGRAM 78K",
    cred: "Criador de conteúdo de moda e dono de marca de acessórios.",
    bio: "Thalys Ronald faz conteúdo de moda e construiu uma comunidade fiel em cima disso. O trunfo dele é ser espontâneo: o jeito de falar cria uma conexão real com quem assiste, não é conteúdo engessado. Além do conteúdo, toca a própria marca de acessórios (your.pricee), provando que sabe transformar audiência em marca de verdade.",
    photo: "img/fundadores/08-thalys-ronald.jpg",
  },
  {
    name: "Vitin Resende",
    handle: "@vitinresende",
    stats: "TIKTOK 70K · INSTAGRAM 50K",
    cred: "Criador de conteúdo de moda com pegada estética internacional.",
    bio: "Vitin Resende se destaca pela foto. Monta outfit afiado, sabe casar calçado no look e entrega uma estética que parece feita fora do Brasil, nível gringo de verdade. Teve uma ascensão rápida e carrega um engajamento muito alto pro tamanho da audiência, sinal de que o público não só segue, curte de verdade.",
    photo: "img/fundadores/09-vitin-resende.jpg",
  },
  {
    name: "Davi Belo",
    handle: "@davidnthegoat",
    stats: "TIKTOK 70K · INSTAGRAM 30K",
    cred: "Criador de conteúdo de moda e YouTuber.",
    bio: "Davi Belo saiu de uma cidade pequena de Minas Gerais e construiu nome no conteúdo de moda. Posta com frequência alta, mantém uma média de views forte e faz vídeo que realmente ajuda a rapaziada a evoluir no estilo. No YouTube, os vlogs e a forma como trata o público renderam uma comunidade fiel e engajada. Constância e proximidade são a marca dele.",
    photo: "img/fundadores/10-davi-belo.jpg",
  },
  {
    name: "Petry",
    handle: "@petry.mene",
    stats: "TIKTOK 60K · INSTAGRAM 5K",
    cred: "Criador de conteúdo de moda que transita por todos os estilos.",
    bio: "Petry faz conteúdo ensinando a se vestir e mostrando como importar produto da China na prática. O trunfo é o carisma e a espontaneidade na frente da câmera, o jeito de falar segura o público. Monta outfit fora da casinha e passeia entre os estilos com facilidade, do streetwear ao casual. Não fica preso a uma só pegada, e é aí que se destaca.",
    photo: "img/fundadores/11-petry.jpg",
  },
  {
    name: "Germano",
    handle: "@eugermanoh",
    stats: "TIKTOK 50K · INSTAGRAM 15K",
    cred: "Modelo e criador de conteúdo de moda.",
    bio: "Germano é modelo antes de tudo. Proporção de corpo, estética forte e os dreads compõem uma presença que salta na frente da câmera, e é isso que o faz brilhar. Roda com marca nacional atrás de marca nacional e leva a mesma pegada estética pro conteúdo que produz. Moda no corpo e no feed.",
    photo: "img/fundadores/12-germano.jpg",
  },
  {
    name: "Bruno Gomes",
    handle: "@brnogomes",
    stats: "INSTAGRAM 45K · TIKTOK 12K",
    cred: "Criador de conteúdo de moda e embaixador da Umbro.",
    bio: "Bruno Gomes faz conteúdo ensinando a rapaziada a se vestir melhor. Direto no ponto: mostra na prática como montar look e acertar no estilo. Fez nome pelas parcerias com marcas grandes e hoje é embaixador da Umbro, unindo estilo e a pegada do futebol.",
    photo: "img/fundadores/13-bruno-gomes.jpg",
  },
  {
    name: "Dudu Ianoski",
    handle: "@ianoskki",
    stats: "INSTAGRAM 10K · TIKTOK 5K",
    cred: "Criador de conteúdo de moda com pegada viral.",
    bio: "Ianoski se destaca pelo conteúdo viral. Tem sacada afiada nos vídeos, mistura humor e moda de um jeito que estoura a bolha e prende quem assiste. É criador recente, começou agora, mas a ascensão já veio rápida. A comunicação cômica e leve é a marca dele, e o que faz o vídeo rodar.",
    photo: "img/fundadores/14-dudu-ianoski.jpg",
  },
];

/* ---------- Carrossel de fundadores ---------- */
function initFoundersCarousel() {
  const track = document.getElementById("fc-track");
  const dotsWrap = document.getElementById("fc-dots");
  const counter = document.getElementById("fc-counter");
  const prevBtn = document.getElementById("fc-prev");
  const nextBtn = document.getElementById("fc-next");
  if (!track || !dotsWrap || !counter) return;

  const pad = (n) => String(n).padStart(2, "0");
  const total = FOUNDERS.length;

  FOUNDERS.forEach((f, i) => {
    const slide = document.createElement("article");
    slide.className = "fc-slide";
    slide.setAttribute("aria-label", `${pad(i + 1)} de ${pad(total)} — ${f.name}`);
    slide.innerHTML = `
      <div class="fc-photo">
        <span class="fc-photo-index">${pad(i + 1)}</span>
        <div class="fc-placeholder" aria-hidden="true">
          <img src="img/logo/simbolo-negativo.png" alt="" loading="lazy" />
          <span>FOTO 9:16 · EM BREVE</span>
        </div>
        <img src="${f.photo}" alt="Retrato de ${f.name}" loading="lazy"
             onerror="this.remove()" />
      </div>
      <div class="fc-info">
        <h3 class="fc-name">${f.name}</h3>
        <span class="fc-handle">${f.handle} · FUNDADOR</span>
        <span class="fc-handle">${f.stats}</span>
        <p class="fc-cred">${f.cred}</p>
        <p class="fc-bio">${f.bio}</p>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "fc-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir pro fundador ${pad(i + 1)}`);
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);
  let index = 0;

  function go(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    counter.textContent = `${pad(index + 1)} / ${pad(total)}`;
    dots.forEach((d, j) => d.classList.toggle("active", j === index));
  }

  prevBtn?.addEventListener("click", () => go(index - 1));
  nextBtn?.addEventListener("click", () => go(index + 1));

  /* swipe no mobile */
  let startX = null;
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 48) go(delta < 0 ? index + 1 : index - 1);
      startX = null;
    },
    { passive: true }
  );

  go(0);
}

/* ---------- Reveal on scroll ---------- */
function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Smooth scroll para links internos ---------- */
function initSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

buildFaq();
initFoundersCarousel();
initReveals();
initSmoothScroll();
