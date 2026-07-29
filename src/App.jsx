import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./services/firebase";
import { setAuthLoading } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        const data = snap.data();
        dispatch({ type: "auth/login/fulfilled", payload: { uid: firebaseUser.uid, email: firebaseUser.email, name: data?.name, role: data?.role } });
      }
      dispatch(setAuthLoading(false));
    });
    return () => unsub();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;