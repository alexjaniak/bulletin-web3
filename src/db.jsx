import { collection, getDocs, doc, setDoc, onSnapshot } from "firebase/firestore"; 

export async function pushEcho(db, id, x, y, message) {
    // Add a new echo with id to echoes
    await setDoc(doc(db, "echoes", id), {
      x: x,
      y: y,
      message: message
    });
  }
  
//export async function pullEchos(db) {
//  const unsub = onSnapshot(collection(db, "echoes"), (querySnapshot) => {
//    let echoes = [];
//    querySnapshot.forEach((doc) => {
//      echoes.push(doc.data());
//    });
//  }
//  return echoes;
//}