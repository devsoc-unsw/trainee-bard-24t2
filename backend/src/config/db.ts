import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, Firestore } from "firebase/firestore";
import "dotenv/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import fs from 'fs';
// import https from 'https';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY, 
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const storage = getStorage(app);

export function getDb() {
    return database;
}

export function getStore() {
  return storage;
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

//     if(fruitName in jsonData) {
//       const fruitImageUrl = jsonData[fruitName];

//       const docRef = doc(db, 'fruits', fruitDoc.id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const fruitImage = await addToStorage(docRef.id, fruitImageUrl);
//         await updateDoc(docRef, {
//           image: fruitImage
//         });
//       } else {
//         console.log(`Document for ${fruitName} does not exist`, fruitDoc.id);
//       }
//     }
//   });
// });

// const addToStorage = (async (docId: string, imageUrl: string) => {
//     console.log(imageUrl);
//     const imageBuffer = await new Promise<Buffer>((resolve, reject) => {
//         https.get(imageUrl, (res: any) => {
//           const data: Uint8Array[] = [];
//           res.on("data", (chunk: any) => {
//             data.push(chunk);
//           });
//           res.on("end", () => {
//             resolve(Buffer.concat(data));
//           });
//           res.on("error", reject);
//         });
//     });

//     console.log("ho");
//     const storageRef = ref(getStore(), `images/${docId}.jpg`);

//     await uploadBytes(storageRef, imageBuffer);

//     return await getDownloadURL(storageRef);
// });