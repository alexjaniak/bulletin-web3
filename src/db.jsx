import { collection, getDocs, doc, setDoc } from "firebase/firestore"; 

export async function pushEcho(db, id, x, y, message) {
    // Add a new echo with id to echoes
    await setDoc(doc(db, "echoes", id), {
      x: x,
      y: y,
      message: message
    });
  }
  
export async function pullEchos(db) {
  const querySnapshot = await getDocs(collection(db, "echoes"));
  let echoes = [];
  querySnapshot.forEach((doc) => {
    echoes.push(doc.data());
  });
  return echoes;
}