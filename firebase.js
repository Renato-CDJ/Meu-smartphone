// firebase.js atualizado
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyIEHrdcMttMA1RylqqG_wokheP5EcIc4",
  authDomain: "presentescasal.firebaseapp.com",
  projectId: "presentescasal",
  storageBucket: "presentescasal.appspot.com",
  messagingSenderId: "518416733032",
  appId: "1:518416733032:web:c6ccf8b438b5563864bcdd",
  measurementId: "G-VECFNQVX87"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
};
