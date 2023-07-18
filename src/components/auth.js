import { useState } from "react";
import {auth} from "../config/fire"; //, googleProvider
import {createUserWithEmailAndPassword, signOut} from "firebase/auth"; //signInWithPopup,

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  //const signInWithGoogle = async () => {
  //  try {
  //    await signInWithPopup(auth, googleProvider);
  //  } catch (err) {
  //    console.error(err);
  //  }
  //};

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Mot de Passe..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Inscrire</button>

      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};
//      <button onClick={signInWithGoogle}> Sign In With Google</button>