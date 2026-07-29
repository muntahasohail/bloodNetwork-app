import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

const requestsRef = collection(db, 'requests');

const getRequests = async () => {
  const snap = await getDocs(requestsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const getMyRequests = async (userOrUid) => {
  const uid = typeof userOrUid === 'object' ? (userOrUid?.uid || userOrUid?.id) : userOrUid;
  const email = typeof userOrUid === 'object' ? userOrUid?.email : undefined;
  const requests = [];
  const seen = new Set();

  const addDocs = (docs) => {
    docs.forEach((docSnap) => {
      const data = { id: docSnap.id, ...docSnap.data() };
      if (!seen.has(data.id)) {
        seen.add(data.id);
        requests.push(data);
      }
    });
  };

  if (uid) {
    const q = query(requestsRef, where('postedBy', '==', uid));
    const snap = await getDocs(q);
    addDocs(snap.docs);
  }

  if (email) {
    const q = query(requestsRef, where('postedByEmail', '==', email));
    const snap = await getDocs(q);
    addDocs(snap.docs);
  }

  return requests;
};

const addRequest = async (request) => {
  const docRef = await addDoc(requestsRef, request);
  return { id: docRef.id, ...request };
};

const updateRequest = (id, data) => updateDoc(doc(db, 'requests', id), data);
const deleteRequest = (id) => deleteDoc(doc(db, 'requests', id));

const requestService = { getRequests, getMyRequests, addRequest, updateRequest, deleteRequest };
export default requestService;
