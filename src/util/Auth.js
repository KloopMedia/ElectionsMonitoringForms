import React, { useEffect, useState } from "react";
import firebase from "./Firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
      let rootRef = firebase.firestore().collection("users")
      let userRef = rootRef.doc(user.uid)
      userRef.set(
        {
          name: user.displayName,
          role: 'independent'
        }
      )
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
