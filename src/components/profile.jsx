import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth,db} from "./firebase";
import { getDoc,setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile(){
    const[userDetails,setUserDetails]=useState(null);
    const fetchUserData=async()=>{

        auth.onAuthStateChanged(async(user)=>{

            console.log(user);
            const docRef=doc(db,"Users",user.uid)
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){

                setUserDetails(docSnap.data());
                console.log(setUserDetails);
            }
            else{
                console.log("User not logged in");
            }
        });
    };
    useEffect(()=>{

        fetchUserData();
    },[])
    async function handleLogout(){

        try {
await auth.signOut();
window.location.href="/login";
console.log("User logged out Succesfully");

        }
        catch(error){

console.log("Error Logging out: ", error.message);
        }
    }
return(
<div>{userDetails?(
    <>
<h1>Hello, {userDetails.firstName}</h1>
<div><p>Email:{userDetails.email} </p>
<p>First Name:{userDetails.firstName} </p>
<p>Last Name :{userDetails.lastName} </p>
</div>
<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
</>
):(<p>Loading</p>)}
</div>
);

}
export default Profile;