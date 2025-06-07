// tema.js

export function aplicarTemaNoElemento(elemento) {
  const tema = localStorage.getItem("temaSelecionado") || "default";
  switch (tema) {
    case "azul":
      elemento.style.background = "linear-gradient(180deg, #0d1b2a, #1b263b)";
      break;
    case "verde":
      elemento.style.background = "linear-gradient(180deg, #0b3d2e, #14532d)";
      break;
    case "rosa":
      elemento.style.background = "linear-gradient(180deg, #42032C, #D36B9A)";
      break;
    default:
      elemento.style.background = "linear-gradient(180deg, #12131a, #1e2130)";
  }
}

export function aplicarTemaAutomaticamente(selector = ".screen") {
  const el = document.querySelector(selector);
  if (el) aplicarTemaNoElemento(el);
}
