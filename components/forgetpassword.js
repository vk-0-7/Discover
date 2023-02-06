import axios from "axios";
import { useRouter } from "next/router";
// import Forgotpasswordemailsent from "../pages/emailsent2";
import { useState, useEffect } from "react";
import styles from "../styles/forgotpassword.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

const forgetpassword = ({ showForgotPassword, setShowForgotPassword,showemailsent,setemailsent }) => {

    const router=useRouter();
    const [btnloader,setBtnloader] =useState(false)
    const [color,setColor] =useState("#ffffff")
    const [verified,setVerified] =useState(false)
   
 

  // submitting the button
 var emailfound=false;
  const handlesubmit = async () => {
    // console.log(email)
    if(verified)
{    setBtnloader(true)
    try {
      const res = await axios.get(
        "https://backend.discoverinfluencer.in/user/all"
      );
      var data = await res.data.users;
    //   setDatas(data);
      console.log(data);
    } catch (error) {
      console.log("error", error.message);
    }
    //checking if the given email is already present in the database
      
    data.map((val, ind) => {
        // console.log(val.email)
      if (email == val.email) {
        
        emailfound=true;
      }
      
    });
 //if email is already present then post the api of forgotPassword
 
    //  console.log(abc);

    if (emailfound) {             //because emailfound is set to true in the same function thats why the
                                   //value remains false everytime 


try {
const res = await axios.post(
"https://backend.discoverinfluencer.in/user/forgotPassword",
{ email: email }
);
const response = await res.data;
console.log(response);
setShowForgotPassword(false)
 setemailsent(true)

 
} catch (error) {
console.log("error while sending forgot password data", error.messsage);
setShowForgotPassword(false)
 setemailsent(true)

}

//if the email is not present just send a message
} else {
document.getElementById("messagetext").style.display = "block";
setBtnloader(false)
}
}
  
}
  
       
     // to remove this forgotpassword modal

  const handlecross = () => {
    setShowForgotPassword(false);
  };


  const [email, setEmail] = useState("");

  const handlechange = (e) => {
    setEmail(e.target.value);
  };

    //email validation
      
  useEffect(() => {
    if (email && email.includes("@")){
      document.getElementById("sendmail").style.backgroundColor = " rgb(190, 52, 85)"
        setVerified(true)
        }
        else{
          document.getElementById("sendmail").style.backgroundColor = " rgba(190, 52, 85,0.2)"
          setVerified(false)
        }
  }, [email]);
  //   console.log(emailfound)

  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        zIndex: "100",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
       
      <div className={styles.main_div} id={styles.center}>
        <div className={styles.inside_div}>
          <p className={styles.mainText}>Forgot password</p>
          <FontAwesomeIcon
            className={styles.crossIcon}
            icon={faXmark}
            onClick={() => handlecross()}
          />

          <div className={styles.firstInput}>
            <p>Email address</p>
            <input
              type="email"
              name="email"
              placeholder="nikusha.tetruashvili.gmail.com"
              value={email}
              onChange={(e) => handlechange(e)}
              required
            />

            <h5
              style={{
                color: "red",
                margin: "5px 2px 5px 4px",
                display: "none",
              }}
              id="messagetext"
            >
              This email-id is not registered
            </h5>

            <div className={styles.btn}>
              <button id="sendmail" onClick={handlesubmit}>
              { btnloader ?  <ClipLoader
        color={color}
        loading={btnloader}
        // cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <span> Submit</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgetpassword;
