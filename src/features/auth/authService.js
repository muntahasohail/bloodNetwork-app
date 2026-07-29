import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

const register = async ({ name, email, password, role = 'user' }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', user.uid), { name, email, role });
  return { uid: user.uid, email, name, role };
};

const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, 'users', user.uid));
  const data = snap.data();
  return { uid: user.uid, email: user.email, name: data.name, role: data.role };
};

const logout = () => signOut(auth);

const authService = { login, register, logout };
export default authService;
