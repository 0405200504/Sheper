# SHEPER — Landing Page

Página de vendas da **Sheper**, a comunidade das ovelhas negras: estilo, imagem pessoal, streetwear, feedback real e networking.

## Como rodar

É um site estático — não precisa de build nem dependências:

```bash
python3 -m http.server 4040
# abra http://localhost:4040
```

Ou abra o `index.html` direto no navegador.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html` | Página completa (14+ seções) |
| `css/styles.css` | Design system: tokens, botões, cards, header adaptativo, FAQ, pricing |
| `js/main.js` | FAQ em acordeão (data-driven), carrossel, reveal on scroll, header por seção |
| `img/` | Fotos e mascote |
| `img/logo/` | Logo oficial (símbolo, wordmark, favicon + originais) |

## Antes de publicar

- Substituir os **depoimentos placeholder** (seção "dor") por relatos reais — marcados com comentário no HTML.
- Preencher **nome, credenciais, números e fotos do fundador** (seção "Quem guia o rebanho").
- Checkout: todos os CTAs apontam para `https://pay.cakto.com.br/3ephu46`.
