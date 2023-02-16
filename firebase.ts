// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBprj_5ojId6_iEwVMJ2ghsqbus0mkIw-A",
    authDomain: "netflix-clone-61751.firebaseapp.com",
    projectId: "netflix-clone-61751",
    storageBucket: "netflix-clone-61751.appspot.com",
    messagingSenderId: "1034800851382",
    appId: "1:1034800851382:web:da1616a965850c154eb917"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }