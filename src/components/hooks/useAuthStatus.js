import React, { useEffect, useState, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//this is a custom hook that keeps track of user logging in and out ( i got it from stackoverflow)
//https://stackoverflow.com/questions/65505665/protected-route-with-firebase

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  //For memory leaks(got it form stackoverflow aswell)
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, checkingStatus };
};
