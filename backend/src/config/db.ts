import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, Firestore } from "firebase/firestore";
import "dotenv/config";
// import fs from 'fs';

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
  const db = getDb();
  const querySnapshot = await getDocs(collection(db, 'fruits'));
  
  const fruits = querySnapshot.docs.map(doc => doc.data());

  return fruits;
}

// export const addData = (async (db: Firestore) => {
//   const file = fs.readFileSync('./src/config/data_final.json', 'utf-8');
//   const jsonData = JSON.parse(file);

//   for(const item of jsonData) {
//     try {
//       const docRef = await addDoc(collection(db, "fruits"), item);
//       console.log("added with id: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   }
// });

// export const addImages = (async (db: Firestore) => {
//   const querySnapshot = await getDocs(collection(db, 'fruits'));

//   const file = fs.readFileSync('./src/config/fruit_images.json', 'utf-8');
//   const jsonData = JSON.parse(file);

//   querySnapshot.forEach(async (fruitDoc) => {
//     const fruitName = fruitDoc.get('fruit');

//     const fruitImage = jsonData[fruitName];

//     const docRef = doc(db, 'fruits', fruitDoc.id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       await updateDoc(docRef, {
//         image: fruitImage
//       });
//     } else {
//       console.log(`Document for ${fruitName} does not exist`, fruitDoc.id);
//     }
//   });
// });