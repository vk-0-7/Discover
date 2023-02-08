   import styles from "../styles/signin.module.css";
   import {useState,useEffect} from "react";
   import { useSelector, useDispatch } from "react-redux";
   import { setEmail, setPassword } from "../pages/redux/userSlice";
   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
   import { faXmark } from '@fortawesome/free-solid-svg-icons'
   import {useRouter} from 'next/router'
   import Link from "next/link"
   import Script from "next/script";
   import Head from "next/head";
   import ClipLoader from "react-spinners/ClipLoader";
   
import axios from "axios";
import React from "react";
  
const signin = ({show,set,showsignup,setsignup,showForgotPassword,setShowForgotPassword}) => { 

 const router=useRouter();
  const dispatch = useDispatch();
const [btnloader,setBtnLoader] =useState(false)
const [color,setColor] =useState("#ffffff")
const [user, setUser] = useState({
  email:"",
  password:""
});


const handlecross= ()=>{
    set(false);
    user.email=""
    user.password=""

}



const handlechange=(e)=>{
     const {name,value} =e.target
     setUser({
      ...user,
      [name]:value
     })
}

    const LOGIN_API='https://backend.discoverinfluencer.in/user/login'

    const login= async ()=>{
        
      const {email,password}=user;
      dispatch(setEmail(email))
      dispatch(setPassword(password))
       

        
        if(email && password ){
          setBtnLoader(true) 
          try {
             await axios.post(LOGIN_API,user)
             router.push('/Dashboard')

          } catch (error) {
            console.log("Error during Login",error.message)
            setBtnLoader(false)
            document.getElementById("messagetext").style.display = "block";
          }
        }
    }


    useEffect(() => {
      if(user.email && user.password)
      document.getElementById('loginbtn').style.backgroundColor=' rgb(190, 52, 85)'
    }, [user])
    




  return (
    <>
       
     
      { show ? <div  style={{position:"fixed", height:"100vh",width:"100vw", top:"0" ,left:"0", zIndex:"100", backgroundColor:"rgba(0,0,0,0.1)"}}>   <div className={styles.signin_box} id={styles.center}>
        <p className={styles.mainText}>Sign in</p>
        <FontAwesomeIcon className={styles.crossIcon} icon={faXmark} onClick={()=>handlecross()} /> 
        <div className={styles.container} id={styles.center}>
        <div className={styles.firstInput} >
        <p>Username or email address</p>
        <input type="email" name="email" placeholder="nikusha.tetruashvili.gmail.com" value={user.email} onChange={(e)=>handlechange(e)} required/>     
        </div> 
        <div className={styles.secondInput}>
        <p>Password</p>
        <input type="password" name="password" placeholder="*********" value={user.password} onChange={(e)=>handlechange(e)} required/> </div>
        <p onClick={()=>{handlecross() ;setShowForgotPassword(true)}} className={styles.forgetPassword} > Forgot password? </p>
            
         
           <button className={styles.login_btn} id='loginbtn' onClick={login} > { btnloader ?  <ClipLoader
        color={color}
        loading={btnloader}
        // cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <span> Login</span>}</button>
       <h5
                style={{
                  color: "red",
                  margin: "5px 2px 5px 4px",
                  display: "none",
                }}
                id="messagetext"
              >
                Please enter valid credentials
              </h5>
           <p className={styles.or}>Or</p>
          <button className={styles.signup_btn} onClick={()=>{setsignup(true)}} >Sign up</button>
           </div>
         
      </div> 
     
      
        </div> : null }
       

    </>
  );
};

export default signin;
