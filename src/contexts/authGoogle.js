import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import App from '../services/firebase'

export const AuthGoogleContext = createContext({})

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const auth = getAuth(App);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('@Auth:token');
    const sessionUser = sessionStorage.getItem('@Auth:user');
    if (sessionToken && sessionUser) {
      setUser(sessionUser);
    }
    setLoading(false);
  }, []);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem('@Auth:token', token);
        sessionStorage.setItem('@Auth:user', JSON.stringify(user));
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function signOut() {
    sessionStorage.clear();
    setUser(null);
  }

  return (
    <AuthGoogleContext.Provider
      value={{ signInGoogle, authenticated: !!user, loading, user, signOut }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}
