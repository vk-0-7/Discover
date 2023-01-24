import React, { useState ,useEffect } from "react";
import axios from'axios';
import { v4 as uuid } from 'uuid';
import { useHistory } from "react-router-dom";
import styles from "../styles/signup.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import Link from "next/link"
import Head from "next/head";

const signup = ({show,set,showsignup,setsignup}) => {
     

       const [user,setUser] =useState({
        id:uuid(),
        name:"",
        email:"",
        password:"",
       });

       const handlechange=(e) =>{
        const {name,value} = e.target;
        setUser({
          ...user,
          [name]:value,   
          });
       }
  
       const API_URL ='https://backend.discoverinfluencer.in/user/activation';

       const signup= async ()=>{
         
     
        const {name,email,password}=user;
        if(name && email && password ){
          try {
           await axios.post(API_URL,user)
          } catch (error) {
            console.log('Error while calling api',error.message);
          }
         
        

      }

       }
      //  const [validate,setValidate] =useState(false)

       useEffect(() => {


        if(user.name && user.email && user.password && user.email.includes('@')){
        
        document.getElementById('signupbtn').style.backgroundColor=' rgb(190, 52, 85)'
      }
      else{
        document.getElementById('signupbtn').style.backgroundColor=' rgba(190, 52, 85,0.2)'
      }

       
       
       
      }, [user])

    //  useEffect(() => {
    //   document.getElementById('sent').addEventListener('click',(e)=>{
    //     if(!user.name) {
    //       // console.log(user.name,user.email,user.password)
         
    //       e.preventDefault()
    //     }
       
    //   })

    //  }, [])
     



return (
 <>
 <Head> 
 <title>SignIn Page</title>
</Head>
   { show ? <div className={styles.signin_box} id={styles.center}>
     <p className={styles.mainText}>Sign Up</p>
     <FontAwesomeIcon className={styles.crossIcon} icon={faXmark} onClick={()=>setsignup(false)} /> 
     <div className={styles.container} id={styles.center}>
     <div className={styles.firstInput} >
     <p>Enter your name</p>
     <input type="text" name="name" placeholder="Your name" value={user.name} onChange={(e)=>handlechange(e)} required/>
     </div> 
     <div className={styles.secondInput} >
     <p>Enter your Email</p>
     <input type="email" name="email" placeholder="Your Email" value={user.email} onChange={(e)=>handlechange(e)} required/>
      <p id='validemail' style={{marginTop:"3px",display:"none"}}>Please Enter valid email address</p>
     </div> 
     <div className={styles.thirdInput}>
     <p>Password</p>
<input type="password" name="password" placeholder="*********" value={user.password} onChange={(e)=>handlechange(e)} required/> </div>
     
         
      
      <Link href='/emailsent' id='sent'>  <button className={styles.signup_btn} id='signupbtn' onClick={signup} >Sign up</button> </Link>
       
        </div>
      
   </div> : null}
 </>
);
};

export default signup;
