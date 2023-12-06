import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
// import { auth } from '../firebase'
import Home from './Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<string | null>("PAGE");
  useEffect(()=>{
    setLoading("PAGE")
    const accessToken = JSON.parse(localStorage.getItem("accessToken") ?? "");
    const idToken = JSON.parse(localStorage.getItem("idToken") ?? "")
    if(accessToken){
      
      // const credential = GoogleAuthProvider.credential(idToken, accessToken);
       
  // Sign in with the credential to validate the token
    // signInWithCredential(auth, credential).then((userCredential) => {
    //   // Token is valid, you can access user information in userCredential.user
    //   console.log(userCredential);
    // })
    // .catch((error) => {
    //   // Token is invalid
    //   console.error(error);
    // });
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key="+import.meta.env.VITE_APIKEY, {
      method: "POST",
      body: JSON.stringify({ idToken: idToken})
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      console.log(res)
      if(res?.users?.[0]?.email){
         console.log("Authenticated");
         setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
      }
    }).finally(()=>setLoading(null));
  }
    },[])
  if(loading){
    return <div className='flex h-[80vh] items-center justify-center text-gray-500'>Loading...</div>
  }
  return (
    <>
    {
      isAuthenticated ? <Home />:<Login />
    }
    </>
  )
}

export default App
