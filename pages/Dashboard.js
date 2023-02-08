import { useState, useEffect } from "react";
import {useRouter} from 'next/router'
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
import {useSelector} from 'react-redux'
import { faHourglass1, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Instagram from "@fortawesome/free-brands-svg-icons/faInstagram";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

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




const Dashboard = () => {
    const router=useRouter();

    const [color,setColor] =useState("#000000")
   const [data,setData] =useState([])
   const [show, setShow] = useState(false);
   
   var {email,password}=useSelector(state=>state.user) 
   console.log(email,password)
 

 


  const fetchdata=async()=>{
    console.log(email)
   
    try{
      const res=await axios.get('https://backend.discoverinfluencer.in/user/all')
      const data=await res.data.users
      const userdata= data.filter((val)=>{
        return val.email==email
        
      })
      setData(userdata[0])
      setShow(true)
    }
    catch(error){
      console.log("error fetching all data" ,error.message)
    }
    // console.log(userdata)
    
    
  }

  useEffect(()=>{
    fetchdata();
  },[])
  
  
    
   const handleEditProfile=()=>{
        router.push('/editprofile')
   }


  





  const showinfo = () => {
    document.getElementById("information").style.visibility = "visible";
  };
  const removeinfo = () => {
    document.getElementById("information").style.visibility = "hidden";
  };

  useEffect(() => {
    if (!data.numberVisibleToPremium && show) {
      document.getElementById("num").style.color = "transparent";
      document.getElementById("num").style.textShadow = "0 0 6px rgb(0, 0, 0)";
    }
    if (!data.showEmailToPremium && show) {
      document.getElementById("eml").style.color = "transparent";
      document.getElementById("eml").style.textShadow = "0 0 6px rgb(0, 0, 0)";
    }
  }, []);

 
 if(show){
  var language = data.language;
   console.log(language)
  var category = data.category;
  var intrests = data.intrests;
  var dob = data.dateofBirth;
  // console.log(typeof dob)
  const brands = data.prevBrands;
    if(data.socialURLs)
  {  var URLs = data.socialURLs[0];
   console.log(URLs)}
   if(data.socialServices){
  var services = data.socialServices;}
  var today = new Date();
  const year = today.getFullYear();
  if(dob){const arr = dob.split("-")
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
}
 
}
  return (
    <>
   

     
      { show ? <div> <div>  <Navbar1 /></div> 
      <div className={styles.leftBox}>
        <div className={styles.username}>
          <p>{data.username}</p>
        </div>

        <div className={styles.userImage}>
          <Image
            className={styles.Image}
            src={data.profilePic}
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
            <h3 id="num">{data.phoneNumber} </h3>
          </div>
          <div className={styles.email}>
            <h4> Contact Email:</h4> <h3 id="eml"> {data.email}</h3>
          </div>
        </div>
      </div>

      <div className={styles.rightBox}>

      <div className={styles.editprofile}>
          <button onClick={handleEditProfile}>
            
            <p> Edit Profile </p>
          </button>
        </div>

       <div className={styles.name}>
          <p>
            {data.name} , {age}{" "}
          </p>{" "}
        </div> 
        <div className={styles.city}>
          <p>{data.currentCity}</p>{" "}
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
       
      </div>

      <div className={styles.footer}>
        {" "}
        <Footer />{" "}
      </div> </div> : <div style={{position:"absolute",top:"50%" ,left:"50%" ,transform:"translate(-50%,-50%)"}}><ClipLoader
        color={color}
        // loading={btnloader}
        // cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}
    </>
  );
};

export default Dashboard;
