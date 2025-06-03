// script.js atualizado para autenticação, tema e redirecionamento
import { db, collection, getDocs } from './firebase.js';

const formLogin = document.getElementById("login-form");
if (formLogin) {
  formLogin.onsubmit = async (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    const snapshot = await getDocs(collection(db, "usuarios"));
    const match = snapshot.docs.find(doc => doc.data().nome === user && doc.data().senha === pass);

    if (match || (user === "Renato" && pass === "123") || (user === "Pir" && pass === "123")) {
      localStorage.setItem("usuario", user);
      alert("Lá vou eu!");
      window.location.href = "home.html";
    } else {
      document.getElementById("login-erro").textContent = "Usuário ou senha incorretos.";
    }
  }
}

// Tema aplicado
const tema = localStorage.getItem("temaCelular") || "tema-rosa";
if (document.querySelector(".phone")) {
  document.querySelector(".phone").classList.add(tema);
}


window.enviarMensagem = function () {
  const input = document.getElementById("mensagemInput");
  const texto = input.value.trim();
  if (!texto) return;

  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerHTML = `<div class="msg-text">${texto}</div>`;
  chat.appendChild(msg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
};
