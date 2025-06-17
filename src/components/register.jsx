import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth,db} from "./firebase";
import { setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
function Register(){
const[firstName,setFirstName]=useState("");
const[lastName,setlastName]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const handleRegister= async(event)  =>{
event.preventDefault();
if (!firstName || !lastName || !email || !password) {
  toast.error("Please fill in all fields", { position: "top-center" });
  return;
}

try{
  await   createUserWithEmailAndPassword(auth,email,password);
  const user=auth.currentUser;
  console.log(user);
  if(user){
    await setDoc(doc(db,'Users',user.uid),{
        email:user.email,
        firstname:firstName,
        lastname:lastName,
      
    });
  }
  
  console.log("User authenticated successfully");
  toast.success("User registered successfully",{position:"top-center"});
} catch(error){
    console.log(error.message);
    toast.error(error.message,{position:"bottom-center"});


}

}
function addFirstName(event){


    setFirstName(event.target.value);
}
function addLastName(event){


    setlastName(event.target.value);
}
function addEmail(event){

setEmail(event.target.value);

}
function addPassword(event){

setPassword(event.target.value);

}

return(
    <>
    <h1>Register</h1>
    <form className='register' onSubmit={handleRegister}>
          <div className="firstName">
<input type="text" placeholder='Enter your first Name' value={firstName} onChange={addFirstName}></input>
</div>
 <div className="lastName">
<input type="text" placeholder='Enter your last Name' value={lastName} onChange={addLastName}></input>
</div>
        <div className="email">
<input type="email" placeholder='Enter your email' value={email} onChange={addEmail}></input>
</div>
<div className="password"><input type="password" placeholder='Enter your password' value={password} onChange={addPassword}></input></div>
<div className="submit"><button type="submit"> Submit</button></div>
    </form>
    </>

);


}
export default Register;