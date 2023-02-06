import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar1 from "../components/navbar1";
import Footer from "../components/footer";
import Image from "next/image";
import styles from "../styles/userDetails.module.css";
import img from "../Images/img.jpg";
import star from "../icons/star.svg";
import music from "../icons/musicnote.svg";
import Instagram from "../icons/redinsta.svg";
import Facebook from "../icons/redfb.svg";
import Snapchat from "../icons/Snapchatred.svg";
import Tiktok from "../icons/TikTokred.svg";
import Twitter from "../icons/Twitterred.svg";
import Youtube from "../icons/YouTubered.svg";
import Pinterest from "../icons/Pinterestred.svg";
import Linkedin from "../icons/LinkedInred.svg";
import Koo from "../icons/Koo.svg";
import Moj from "../icons/Moj.svg";
import performance from "../icons/performance.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Instagram from "@fortawesome/free-brands-svg-icons/faInstagram";
import axios from "axios";

const obj = {
  Facebook,
  Instagram,
  Twitter,
  Snapchat,
  Linkedin,
  Youtube,
  Tiktok,
  Pinterest,
  Koo,
  Moj,
};

export const getServerSideProps = async () => {
  
  
  const data = await fetch(
    `https://backend.discoverinfluencer.in/home/get_influencer_username/vivek`
  );
  const alldata = await data.json();

  return {
    props: {
      data: alldata || null,
    },
  };
};

const Dashboard = ({ data }) => {
  const [show, setShow] = useState(false);

  const showinfo = () => {
    document.getElementById("information").style.visibility = "visible";
  };
  const removeinfo = () => {
    document.getElementById("information").style.visibility = "hidden";
  };

  useEffect(() => {
    if (!data.user[0].numberVisibleToPremium) {
      document.getElementById("num").style.color = "transparent";
      document.getElementById("num").style.textShadow = "0 0 6px rgb(0, 0, 0)";
    }
    if (!data.user[0].showEmailToPremium) {
      document.getElementById("eml").style.color = "transparent";
      document.getElementById("eml").style.textShadow = "0 0 6px rgb(0, 0, 0)";
    }
  }, []);

  const datas = data.user[0];
  console.log(datas);

  const language = datas.language;
  const category = datas.category;
  const intrests = datas.intrests;
  const dob = datas.dateofBirth;
  const brands = datas.prevBrands;
  const URLs = datas.socialURLs[0];
  const services = datas.socialServices;
  var today = new Date();
  const year = today.getFullYear();
  const arr = dob.split("-");
  var age = year - arr[0];
  const month = today.getMonth() + 1;
  const date = today.getDate();
  if (month < arr[1]) {
    age = age - 1;
  } else if (month == arr[1]) {
    if (date < arr[2]) {
      age = age - 1;
    }
  }

  return (
    <>
      <Navbar1 />
      <div className={styles.leftBox}>
        <div className={styles.username}>
          <p>{datas.username}</p>
        </div>

        <div className={styles.userImage}>
          <Image
            className={styles.Image}
            src={datas.profilePic}
            width="400"
            height="400"
          ></Image>
        </div>

        <div className={styles.contact_btn}>
          <button onClick={showinfo}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.envelope} />
            <p> conatct Me </p>
          </button>
        </div>

        <div id="information" className={styles.info}>
          <FontAwesomeIcon
            className={styles.crossIcon}
            icon={faXmark}
            onClick={() => removeinfo()}
          />

          <div className={styles.number}>
            <h4> Contact Number: </h4>
            <h3 id="num">{datas.phoneNumber} </h3>
          </div>
          <div className={styles.email}>
            <h4> Contact Email:</h4> <h3 id="eml"> {datas.email}</h3>
          </div>
        </div>
      </div>

      <div className={styles.rightBox}>

      <div className={styles.editprofile}>
          <button>
            
            <p> Edit Profile </p>
          </button>
        </div>

        <div className={styles.name}>
          <p>
            {datas.name} , {age}{" "}
          </p>{" "}
        </div>
        <div className={styles.city}>
          <p>{datas.currentCity}</p>{" "}
        </div>
        <div className={styles.icons}>
          {Object.entries(URLs).map(([key, value]) => (
            <button key={key}>
              {console.log(key)}

              <Link href={value} target="_blank">
                {" "}
                <Image
                  src={obj[key]}
                  id={styles.ic}
                  width={400}
                  height={300}
                />{" "}
              </Link>
            </button>
          ))}
        </div>
        <div className={styles.category_section}>
          {category.map((val, key) => {
            return (
              <div id={styles.category} key={key}>
                <Image src={star} id={styles.vector} alt="category"></Image>
                <p>{val}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.interest_section}>
          {intrests.map((val, key) => {
            return (
              <div id={styles.interest} key={key}>
                <Image
                  src={performance}
                  id={styles.vector}
                  alt="interest"
                ></Image>
                <p>{val}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.language_section}>
          {language.map((elem, index) => {
            return (
              <>
                <div id={styles.language}>
                  <Image src={music} id={styles.music} alt="music note" />{" "}
                  <p> {elem}</p>
                </div>{" "}
              </>
            );
          })}
        </div>

        <div className={styles.performances}>
          {services.map((elem, index) => {
            return (
              <div id={styles.performance}>
                {" "}
                <div>
                  <Image src={performance} id={styles.performancesvg} />
                  <h5>
                    {elem.socialmedia} {elem.service}
                  </h5>
                </div>
                <h4>Starting price: ₹{elem.price}</h4>
              </div>
            );
          })}
        </div>
        {/* { (brands==undefined) && 
             <div className={styles.experience}>  <h3> Experience</h3> 
             { brands.map((val,ind)=>{
                   <h3 key={ind}> {val}  </h3>
             })
           
            }

    </div>} */}
      </div>

      <div className={styles.footer}>
        {" "}
        <Footer />{" "}
      </div>
    </>
  );
};

export default Dashboard;
