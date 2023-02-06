import React, { useState, useEffect ,CSSProperties} from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import styles from "../styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import ClipLoader from "react-spinners/ClipLoader";

const signup = ({ show, set, showsignup, setsignup }) => {
  const router = useRouter();
  const [btnloader,setBtnloader] =useState(false)
const [color,setColor] =useState("#ffffff")
const [verified,setVerified] =useState(false)

  const [user, setUser] = useState({
    id: uuid(),
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function containsNumbers(str) {
    return /\d/.test(str);
  }
  function isValid(str) {
    var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    return regex.test(str);
  }

  function containsLetter(string) {
    const upper = /[A-Z]/.test(string),
      lower = /[a-z]/.test(string);

    return upper && lower;
  }

  useEffect(() => {
    if (user.password.length > 7) {
      document.getElementById("firstvalidation").style.color = "green";
    } else {
      document.getElementById("firstvalidation").style.color =
        " rgb(231, 91, 91)";
    }
    if (containsNumbers(user.password) && isValid(user.password)) {
      document.getElementById("thirdvalidation").style.color = "green";
    } else {
      document.getElementById("thirdvalidation").style.color =
        " rgb(231, 91, 91)";
    }
    if (containsLetter(user.password)) {
      document.getElementById("secondvalidation").style.color = "green";
    } else {
      document.getElementById("secondvalidation").style.color =
        " rgb(231, 91, 91)";
    }
  }, [user.password]);

  const API_URL = "https://backend.discoverinfluencer.in/user/activation";
  //  console.log(user.email);



  const signup = async () => {
    var emailfound = false;

    if(verified){
      setBtnloader(true)
    // console.log(email)
    try {
      const res = await axios.get(
        "https://backend.discoverinfluencer.in/user/all"
      );
      var data = await res.data.users;
      
      console.log(data);
    } catch (error) {
      console.log("error", error.message);
      
    }
    //checking if the given email is already present in the database

    data.map((val, ind) => {
      console.log(user.email);
      if (user.email == val.email) {
        emailfound = true;
        setBtnloader(false)
        document.getElementById("messagetext").style.display = "block";
      }
    });
    if (user.name && user.email && user.password && !emailfound) {
      try {
        await axios.post(API_URL, user);
        router.push("/emailsent");
      } catch (error) {
        console.log("Error while calling api", error.message);
      }
    } else {
      document.getElementById("messagetext").style.display = "block";
    }}
  };
  //  const [validate,setValidate] =useState(false)

  useEffect(() => {
    if (
      user.name &&
      user.email &&
      user.password &&
      user.email.includes("@") &&
      containsLetter(user.password) &&
      containsNumbers(user.password) &&
      isValid(user.password) &&
      user.password.length > 7
    ) {
      document.getElementById("signupbtn").style.backgroundColor =
        "rgb(190, 52, 85)";
      // document.getElementById('signupbtn').disabled=false;
      document.getElementById("signupbtn").style.cursor = "pointer";
      setVerified(true)
    } else {
      document.getElementById("signupbtn").style.backgroundColor =
        " rgba(190, 52, 85,0.2)";
        setVerified(false)
      // document.getElementById('signupbtn').disabled=true;
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>SignIn Page</title>
      </Head>
      {show ? (
        <div
          className={styles.signin_box}
          id={styles.center}
          style={{ position: "fixed" }}
        >
          <p className={styles.mainText}>Sign Up</p>
          <FontAwesomeIcon
            className={styles.crossIcon}
            icon={faXmark}
            onClick={() => setsignup(false)}
          />
          <div className={styles.container} id={styles.center}>
            <div className={styles.firstInput}>
              <p>Enter your name</p>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={user.name}
                onChange={(e) => handlechange(e)}
                required
              />
            </div>
            <div className={styles.secondInput}>
              <p>Enter your Email</p>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={user.email}
                onChange={(e) => handlechange(e)}
                required
              />
              <p id="validemail" style={{ marginTop: "3px", display: "none" }}>
                Please Enter valid email address
              </p>
              <h5
                style={{
                  color: "red",
                  margin: "5px 2px 5px 4px",
                  display: "none",
                }}
                id="messagetext"
              >
                This email-id is already registered
              </h5>
            </div>
            <div className={styles.thirdInput}>
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="*********"
                value={user.password}
                onChange={(e) => handlechange(e)}
                required
              />{" "}
            </div>
            <div className={styles.password_validation}>
              <p>Password should contain:</p>
              <ul>
                <li id="firstvalidation">contains at least 8 characters</li>
                <li id="secondvalidation">
                  contains both lower (a-z) and upper case letters (A-Z)
                </li>
                <li id="thirdvalidation">
                  contains at least one number (0-9) or a symbol
                </li>
              </ul>
            </div>

            <button
              className={styles.signup_btn}
              id="signupbtn"
              onClick={signup}
            >
             { btnloader ?  <ClipLoader
        color={color}
        loading={btnloader}
        // cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <span> Sign up</span>}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default signup;
