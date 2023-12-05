// Login.js

import React, { useEffect, useState } from "react";
import {
  signInWithEmailRes,
  signUpWithEmail,
  signInWithPop,
} from "../config/firebase";
import Notification from "../components/Notification";
import { GoogleAuthProvider, getAdditionalUserInfo, getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
import { app } from "../../firebase";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("LOGIN");
  const handleSignUP = async () => {
    try {
      setLoading("REGISTEREMAIL");
      signUpWithEmail(email, password)
        .then((res: any) => {
          console.log("success sign up email", res);
          if (res?.user?.accessToken) {
            setInfo("Successfully signed up!");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(null));
    } catch (error: any) {
      console.log("Sign up failed", error);
      setInfo("Sign up failed!");
    }
  };
  const handleSignInGoogle = async () => {
    try {
      setLoading("LOGINGOOGLE");
      const resGoogle = await signInWithPop();
      console.log("Sign up successful", resGoogle);
      if (resGoogle?.credential?.accessToken) {
        setInfo("Successfully signed in!");
      }
    } catch (error: any) {
      console.log("Sign up failed", error);
      setInfo("Sing in failed!");
    } finally {
      setLoading(null);
    }
  };
  const handleLogin = async () => {
    try {
      setLoading("LOGINEMAIL");
      const res = await signInWithEmailRes(email, password);
      console.log("Login successful", res);
      if (res) {
        setInfo("Successfully signed in");

          
        const token = await res.user.getIdToken(true);

        const idTokenResult = await res.user.getIdTokenResult(true)
        const resProvider = GoogleAuthProvider.credential(token, idTokenResult.token);
        // console.log(resProvider);
        localStorage.setItem("uid", JSON.stringify(res.user.uid))
        localStorage.setItem("idToken", JSON.stringify(token))
        localStorage.setItem("accessToken", JSON.stringify(idTokenResult.token))
      }
    } catch (error: any) {
      console.log("Login failed", error);
      setInfo("Login failed!");
    } finally {
      setLoading(null);
    }
  };

  let infoT: any;
  useEffect(() => {
    if (infoT) {
      clearTimeout(infoT);
    }
    if (info) {
      [
        (infoT = setTimeout(() => {
          setInfo(null);
        }, 4000)),
      ];
    }
  }, [info]);

  return (
    <>
    {
        info && <Notification title={info ?? ""}  /> 
    }
    <div className="w-[400px] m-auto absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 p-5  rounded shadow-2xl bg-black/80">
      <div>{mode}</div>
      
      <input
        className="p-3 rounded outline-none border border-stone-300"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        className="p-3 rounded outline-none border border-stone-300"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="text-xs text-gray-500 flex justify-end">Not registered?&nbsp;<span className="cursor-pointer text-gray-300" role="button" onClick={()=>setMode("REGISTER")}>Sign up</span></div>
      <>
        <div className="flex gap-1 flex-col">
          <button
            className="w-full"
            disabled={
              loading &&
              (loading === "LOGINEMAIL" || loading === "REGISTEREMAIL")
                ? true
                : false
            }
            onClick={mode === "LOGIN" ? handleLogin : handleSignUP}
          >
            { loading && (loading === "LOGINEMAIL" || loading === "REGISTEREMAIL") ? "Loading...":mode === "LOGIN" ? "Login" : "Sign Up"}
          </button>
          <div className="">Or</div>
          <button onClick={handleSignInGoogle}
          disabled={
            loading &&
            loading === "LOGINGOOGLE" 
              ? true
              : false
          }
          >
            { loading &&
            loading === "LOGINGOOGLE" 
              ?"Loading...":
              mode === "LOGIN" ? "Login" : "Sing Up"} with Google
          </button>
        </div>
      </>
    </div> 
    </>
   
  );
};

export default Login;
