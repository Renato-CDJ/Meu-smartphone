// script-chat.js atualizado com suporte a contatos e mensagens entre usuários

import { db, collection, addDoc, getDoc, doc, setDoc, onSnapshot, query, orderBy, serverTimestamp } from './firebase.js';

const user = localStorage.getItem("usuario");
if (!user) window.location.href = "login.html";

const chatContainer = document.getElementById("chat");
const input = document.getElementById("mensagemInput");
let contatos = [];
let chatAtivo = null;

// Carregar contatos
async function carregarContatos() {
  const contatosRef = doc(db, "usuarios", user);
  const docSnap = await getDoc(contatosRef);
  if (docSnap.exists()) {
    contatos = docSnap.data().contatos || [];
    // Renderizar lista de contatos no UI (se houver)
  }
}

// Adicionar contato
window.adicionarContato = async function (nomeContato) {
  if (nomeContato === user) return alert("Você não pode adicionar a si mesmo.");
  const ref = doc(db, "usuarios", nomeContato);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const usuarioRef = doc(db, "usuarios", user);
    const usuarioSnap = await getDoc(usuarioRef);
    const dados = usuarioSnap.exists() ? usuarioSnap.data() : {};
    const lista = dados.contatos || [];
    if (!lista.includes(nomeContato)) {
      lista.push(nomeContato);
      await setDoc(usuarioRef, { ...dados, contatos: lista });
      alert("Contato adicionado com sucesso!");
      carregarContatos();
    } else {
      alert("Contato já adicionado.");
    }
  } else {
    alert("Usuário não encontrado.");
  }
};

// Abrir chat com contato
window.abrirChat = function (contato) {
  chatAtivo = contato;
  chatContainer.innerHTML = "";
  const chatId = gerarIdChat(user, contato);

  const q = query(collection(db, "chats", chatId, "mensagens"), orderBy("criadoEm"));
  onSnapshot(q, (snapshot) => {
    chatContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <div class="msg-text">
          <strong>${msg.de}</strong><br>
          ${msg.texto}<br>
          <small style="opacity: 0.6; font-size: 12px;">${msg.hora}</small>
        </div>
      `;
      chatContainer.appendChild(div);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
};

// Enviar mensagem
window.enviarMensagem = async function () {
  const texto = input.value.trim();
  if (!texto || !chatAtivo) return;
  const agora = new Date();
  const hora = agora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const chatId = gerarIdChat(user, chatAtivo);
  await addDoc(collection(db, "chats", chatId, "mensagens"), {
    de: user,
    texto,
    hora,
    criadoEm: serverTimestamp(),
  });
  input.value = "";
};

function gerarIdChat(u1, u2) {
  return [u1, u2].sort().join("_");
}

carregarContatos();
