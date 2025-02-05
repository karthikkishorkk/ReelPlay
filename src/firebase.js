import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCpDDR55_9eILwf1mo8sHSdKagDzbtwb3M",
  authDomain: "netflix-clone-7effc.firebaseapp.com",
  projectId: "netflix-clone-7effc",
  storageBucket: "netflix-clone-7effc.firebasestorage.app",
  messagingSenderId: "1073256464869",
  appId: "1:1073256464869:web:54a1d2e658f1c39711ef0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            toast.error(error.code.split('/')[1].split('-').join(" "));
        } else {
            toast.error(error.code.split('/')[1].split('-').join(" "));
        }
    }
};



const login = async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signup,logout}