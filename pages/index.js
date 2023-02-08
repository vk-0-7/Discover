import { useState,useEffect ,useContext} from "react";
import { MyContext } from './_app.js'
import search from "../icons/search-normal.svg"
import arrowleft from "../icons/arrow-left.svg"
import arrowright from "../icons/arrowright.svg" 
import Instagram from "../icons/redinsta.svg"
import Facebook from "../icons/redfb.svg"
import Snapchat from "../icons/Snapchatred.svg"
import Tiktok from "../icons/TikTokred.svg"
import Twitter from "../icons/Twitterred.svg"
import Youtube from "../icons/YouTubered.svg"
import Pinterest from "../icons/Pinterestred.svg"
import Linkedin from "../icons/LinkedInred.svg"
import Koo from "../icons/Koo.svg"
import Moj from "../icons/Moj.svg"
import Navbar1 from "../components/navbar1";
import SignIn from "../components/signin"
import Forgetpassword from "../components/forgetpassword"
import Emailsentreset from "../components/emailsentreset"
import Signup from "../components/signup"
import Head from  "next/head"
import Footer from "../components/footer";
import styles from "../styles/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Script from "next/script"
import { faChevronRight ,faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Homeskeleton from "../components/homeskeleton"

import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Coursesdata } from "../Data/data";
import { ImagesDivThree } from "../Data/data";
import Link from "next/link";
import Image from "next/image"




const obj={
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Snapchat,
  Linkedin,
  Pinterest,
  Koo,
  Moj,
  Tiktok


}

function SampleNextArrow(props) {

  const { className, style, onClick } = props;
  return (
    <div 
      className={className} id={styles.arrow_body}
      
      onClick={onClick}
      ><Image src={arrowright}  id={styles.arrow}/> </div>
  );
}
function SecondNextArrow(props) {

  const { className, style, onClick } = props;
  return (
    <div 
      className={className} id={styles.arrow_body}
      
      onClick={onClick}
      > <Image src={arrowright}  id={styles.thirdarrow} /> </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className} id={styles.arrow_body}
      onClick={onClick}  style={{zIndex:"5"}}
    ><Image src={arrowleft}  id={styles.arrw} alt="arrow"/></div>
  );
}
function SecondPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className} id={styles.arrow_body}
      onClick={onClick}  style={{zIndex:"5"}}
    ><Image src={arrowleft}  id={styles.thirdarrw} /></div>
  );
}


const index = () => {

  

  // const changeplaceholder=()=>{
  //   var items = Array("buy milk","purchase the new iPhone","test","hello");
  //   var item = items[Math.floor(Math.random()*items.length)];
  //   document.getElementById('Pholder').placeholder=item;
  // }
  // const mytimeout=setInterval(changeplaceholder,5000)
  const [topdata,setTopdata] =useState([]);
  const [newdata,setNewdata] =useState([]);
  const [showemailsent,setShowemailsent] =useState(false); 
  const [showForgotPassword,setShowForgotPassword]  =useState(false)
 const [showsignup,setShowSignup] =useState(false)
  const [showModal,setShowModal]= useState(false);

//  useEffect(() => {
//    if (showModal) {
    
//     document.getElementById('maindiv').style.backgroundColor= 'rgba(0,0,0,0.2)'
   
   
//    }
//    else{
//     document.getElementById('maindiv').style.backgroundColor= 'transparent'
//   }

//  }, [showModal])


   const   getInfluencerTop= async()=>{
         try {
            const res= await axios.get('https://backend.discoverinfluencer.in/user/top');
            const data=res.data.topUsers;
            setTopdata(data)
            // console.log(res);
            const response= await axios.get('https://backend.discoverinfluencer.in/user/all');
            const datas=response.data.users;
            setNewdata(datas)
            
         } catch (error) {
            console.log('error fetching all top data',error.message)
         }
   }




   useEffect(()=>{
    getInfluencerTop();
   

 },[])



 
 
 
  

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow  />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SecondNextArrow />,
    prevArrow: <SecondPrevArrow  />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const datas=topdata[0]
  if (datas != undefined)  
  var urls= datas.socialURLs[0]
 
  

  return (
    <>
    {console.log(topdata)}
    {console.log(newdata)}
      <Head>
       <meta name="description" content="Discover Influencer"/>
       </Head>
      <Head>
       <meta name="author" content="CFT labs"/>
       </Head>
       <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       </Head>

       <Head>
       <title>
         Discover Influencers | Search by Name, Username, Category, City | Top Creators in India
       </title>
       <link rel="icon" href="/favicon.ico"  />
       <link rel="preconnect" href="https://fonts.googleapis.com"/> 
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    
       </Head>

       
        
      { topdata.length==0 && newdata.length==0 ? <Homeskeleton/> : <div className={styles.container}>
        
         <div className={styles.navbar} id='nav' ><Navbar1 show={showModal} set={setShowModal}/>  </div> 
        <div> <SignIn show={showModal} set={setShowModal} showsignup={showsignup} setsignup={setShowSignup} showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword}/> </div>
       { showsignup ? <div> <Signup show={showModal} set={setShowModal} showsignup={showsignup} setsignup={setShowSignup}/> </div> :null}
       {showForgotPassword ?<Forgetpassword showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} showemailsent={showemailsent} setemailsent={setShowemailsent}/> :null}
       {showemailsent ?  <Emailsentreset showemailsent={showemailsent} setemailsent={setShowemailsent}/>  : null }
      <div className={styles.main_div} >
          
           <div className={styles.inside_main_box}>
        <p className={styles.main_text}>
          {" "}
          Discover Right Influencer <br /> for Your Campaign
        </p>
        <form className={styles.form}>
          <input id='Pholder'
            type="text"
            className={styles.search}
            placeholder="Yoga trainer from Mumbai who speaks Bengali..."
          />
          <button className={styles.search_icon}>
            <Image src={search} alt="search" id={styles.search} priority></Image>
          </button>
        </form>
        <div className={styles.main_text2}>
       <p> Di is a new AI system that discovers Influencer for your campaign from a description in natural language.</p>
        </div>
        </div>
      </div>

      {/* div for top influencer carousel */}

      <div className={styles.second_div}>
        <p className={styles.top_influencer}>Top Influencers</p>
        <Link href='/searchInfluencer'> <button className={styles.see_all_btn}>
         <p>see all influencers</p>  <FontAwesomeIcon id={styles.greater_icon} icon={faChevronRight} />
        </button> </Link>
        <p className={styles.txt}>Discover Top Influencers from the Country</p>
        <div className={styles.box2_carousel} >
          <Slider dots={true} {...settings}>
            {topdata.filter((elem) =>   elem.visibility).map((item,ind) => (
                  <div className={styles.card}>
                  <Link href={`/${item.username}`}><div className={styles.card_top} key={ind}>
                  <Image src={item.profilePic} alt={item.title} width="300" height="400" priority></Image>
                  <h1>{item.name}</h1>
                </div>   </Link>
                <div className={styles.card_bottom}>
                  <h4>{item.category[0]},{item.category[1]}</h4>
                    
                { topdata &&  <div className={styles.icon_btn_all}>
                   {/* {console.log(topdata[ind].socialURLs[0])} */}
                  {Object.entries(topdata[ind].socialURLs[0]).map(([key, value]) => (
        <Link href={value} key={key} target="_blank">  <Image src={obj[key]} id={styles.ic} /> </Link>
         
       ))}    
                  </div>}

                   </div>
                </div> 
            ))}
          </Slider>
        </div>
      </div>

      {/* div for new influencer carousel */}

      
      <div className={styles.second_div} id={styles.sec_div}>
        <p className={styles.top_influencer}>Discover New Influencers Faster</p>
       
        <p className={styles.txt}>Discover the Newest Influencers from the Country</p>
        <div className={styles.box2_carousel} >
          <Slider dots={true} {...settings}>
            {newdata.filter((elem) =>   elem.visibility  ).map((item,ind) => (
                   <div className={styles.card}>
               <Link href={`/${item.username}`} >  <div className={styles.card_top} key={ind}>
                  <Image src={item.profilePic} alt={item.title} width="300" height="400" priority></Image>
                  <h1>{item.name}</h1>
                </div>   </Link>
                <div className={styles.card_bottom}>
                  <h4>{item.category[0]},{item.category[1]}</h4>
                { newdata &&  <div className={styles.icon_btn_all}>
                   
                   {Object.entries(newdata[ind].socialURLs[0]).map(([key, value]) => (
                   <Link href={value} key={key} target='_blank'>  <Image src={obj[key]} id={styles.ic} /> </Link>
         
       ))}
                </div>}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* div for categories carousel */}

      <div className={styles.third_div}>
        <p className={styles.top_influencer}>Categories</p>
       <Link href='/searchInfluencer'> <button className={styles.see_all_btn2}>
        <p> see all categories</p>  <FontAwesomeIcon id={styles.greater_icon} icon={faChevronRight} />
        </button> </Link>

        <div className={styles.box3_carousel}>
          <Slider dots={true} {...setting  }>
            {ImagesDivThree.map((item,key) => (
             <Link href='/searchInfluencer' as =
             {`/searchInfluencer?data=${item.category}`}  >  <div className={styles.card2} key={key} >
                <div className={styles.card_top2}>     
                  <Image src={item.Img} alt={item.title} width="300" height="400" priority ></Image>
                  <p className={styles.category_name}>{item.category}</p>
                </div>
              </div> </Link>
            ))}
          </Slider>
        </div>
      </div>
     <div className={styles.footer}> <Footer/></div>

    



     </div>}
     
    </>
  );
};

export default index;
