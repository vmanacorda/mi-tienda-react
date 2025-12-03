import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0PUJ_x2-3_GWK5uia5ySoTmfgiISloWA",
  authDomain: "react2-be39e.firebaseapp.com",
  projectId: "react2-be39e",
  storageBucket: "react2-be39e.appspot.com",
  messagingSenderId: "326617498288",
  appId: "1:326617498288:web:d8ad38a29c0ab93128243d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, doc, query, where };
