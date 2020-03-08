import { firestore } from '../config';

export const getMessages = async () => {
   const messageRef = firestore.collection('messages');  
   try {
   const snap = await messageRef.get(); 
   const messages = []
   snap.forEach(doc => {
     messages.push({ id: doc.id, ...doc.data()})
   })
   return messages;
   } catch (err) {
       console.log(err.message)
   }
}; 

export const processMessage = async data => {
  const messageDocRef = firestore.collection('messages');
  try {
    await messageDocRef.add({
      message: data.message,
      severity: data.severity
    });
    return 'Message sent successfully';
  } catch (err) {
    console.log(err.message);
  }
};
