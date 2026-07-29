import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const donorsRef = collection(db, 'donors');

const getDonors = async () => {
  const snap = await getDocs(donorsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

const addDonor = async (donor) => {
  const docRef = await addDoc(donorsRef, donor);
  return { id: docRef.id, ...donor };
};

const deleteDonor = (id) => deleteDoc(doc(db, 'donors', id));

const updateDonor = (id, data) => updateDoc(doc(db, 'donors', id), data);

const donorService = { getDonors, addDonor, deleteDonor, updateDonor };
export default donorService;
