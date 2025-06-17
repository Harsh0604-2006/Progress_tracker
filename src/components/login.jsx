import { useState } from 'react'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
function Login(){
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const handleSubmit= async(event)  =>{
event.preventDefault();
try{
await signInWithEmailAndPassword(auth, email, password);
  const user=auth.currentUser;
  console.log(user);
  console.log("User authenticated successfully");
  window.location.href="/profile";
    toast.success("User registered successfully",{position:"top-center"});
} catch(error){
    console.log(error.message);
   toast.error(error.message,{position:"bottom-center"});

}
}
function addEmail(event){

setEmail(event.target.value);

}
function addPassword(event){

setPassword(event.target.value);

}

return(
    <>
    <h1>Login</h1>
    <form className='Login' onSubmit={handleSubmit} >
        <div className="email" >
<input type="email" placeholder='Enter your email' value={email} onChange={addEmail}></input>
</div>
<div className="password"><input type="password" placeholder='Enter your password' value={password} onChange={addPassword}></input></div>

  <button type="submit">Submit</button>

  <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
    </form>
    </>




);



}
export default Login;