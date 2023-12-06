import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

export async function signUpWithEmail (email:string, password:string){
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        return error;
      });
}

export function signUpWithGoogle (email:string, password:string){
    const res = signUpWithGoogle(email, password);
    console.log(res);
}


export async function signInWithPop (){
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
provider.addScope('email');
const result = await signInWithPopup(auth, provider);

// The signed-in user info.
// const user = result.user;
console.log("result", result);
// This gives you a Google Access Token.
const credential = GoogleAuthProvider.credentialFromResult(result);
// const token = credential!.accessToken;
  return {result, credential};
}

export async function signInWithEmailRes (email:string, password:string){
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
}