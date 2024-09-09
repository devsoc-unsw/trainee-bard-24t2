import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "dotenv/config";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export function getDb() {
    return database;
}

export async function getFruits() {
  let db = getDb();
  const querySnapshot = await getDocs(collection(db, 'fruits'));
  
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  })
}