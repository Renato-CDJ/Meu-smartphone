
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyIEHrdcMttMA1RylqqG_wokheP5EcIc4",
  authDomain: "presentescasal.firebaseapp.com",
  projectId: "presentescasal",
  storageBucket: "presentescasal.firebasestorage.app",
  messagingSenderId: "518416733032",
  appId: "1:518416733032:web:227913c1085f350f64bcdd",
  measurementId: "G-ZWTZTC1GYM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
