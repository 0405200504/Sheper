/* ==========================================================================
   SHEPER — interações leves: FAQ, carrossel, reveal on scroll, smooth scroll
   ========================================================================== */

/* ---------- FAQ (componente data-driven) ---------- */
const FAQ_ITEMS = [
  {
    q: "A Sheper é um curso?",
    a: "Não. A Sheper é uma comunidade com aulas, trilhas, lives, feedbacks, desafios e networking. Você aprende e aplica com acompanhamento do ambiente.",
  },
  {
    q: "Preciso entender de moda para entrar?",
    a: "Não. A Sheper é justamente para quem quer começar a se vestir melhor com direção, sem depender de tentativa e erro.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. A assinatura é mensal e você pode cancelar quando quiser.",
  },
  {
    q: "A comunidade serve para quem gosta de streetwear?",
    a: "Sim. Streetwear é um dos pilares fortes da Sheper, mas a comunidade também fala sobre identidade, modelagem, cores, sneakers, acessórios, imagem pessoal e presença.",
  },
  {
    q: "Vou receber feedback individual?",
    a: "Sim. Você poderá postar seu look, dúvidas de compra e guarda-roupa para receber feedback direto e prático.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Você tem 7 dias para testar. Se não fizer sentido para você, pode pedir reembolso.",
  },
  {
    q: "Qual o valor?",
    a: "R$39,90 por mês.",
  },
  {
    q: "Onde eu entro?",
    a: "Clique em qualquer botão de assinatura da página e finalize sua entrada pela página de pagamento.",
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
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
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

    // fecha os outros
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

/* ---------- Carrossel de trilhas ---------- */
function initCarousel() {
  const track = document.getElementById("trilhas-carousel");
  if (!track) return;

  const step = () => {
    const card = track.querySelector(".trilha-card");
    return card ? card.offsetWidth + 16 : 240;
  };

  document.querySelector(".carousel-prev")?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.querySelector(".carousel-next")?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
}

/* ---------- Reveal on scroll (leve, via IntersectionObserver) ---------- */
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

/* ---------- Header adaptativo: contraste conforme a seção sob a cápsula ---------- */
function initHeaderContrast() {
  const capsule = document.querySelector(".header-capsule");
  const sections = Array.from(document.querySelectorAll("[data-header]"));
  if (!capsule || !sections.length) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const probe = window.scrollY + 12 + capsule.offsetHeight / 2; // centro da cápsula
    let theme = "dark";
    for (const s of sections) {
      if (s.offsetTop <= probe) theme = s.dataset.header;
      else break;
    }
    capsule.classList.toggle("on-dark", theme === "dark");
    capsule.classList.toggle("on-light", theme === "light");
    capsule.classList.toggle("on-red", theme === "red");
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

buildFaq();
initCarousel();
initReveals();
initSmoothScroll();
initHeaderContrast();
