
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBGn6Rjp3sX-dGckV2U0zSl1u2bqtIJPIs",
  authDomain: "netflix-clone-82209.firebaseapp.com",
  projectId: "netflix-clone-82209",
  storageBucket: "netflix-clone-82209.firebasestorage.app",
  messagingSenderId: "1004638148410",
  appId: "1:1004638148410:web:67c31d503499f02ed52203"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider : "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    return signOut(auth);
}

export {auth, db, login, logout, signup};