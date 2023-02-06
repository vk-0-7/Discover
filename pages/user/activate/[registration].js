import { useState, useEffect } from "react";
import FormData from 'form-data';
import Navbar from "../../../components/navbar3";
import Approval from "../../../components/approval";
import styles from "../../../styles/registration.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import Head from "next/head"
import Image from "next/image";
import frame from "../../../Images/frame.png"
import deletes from "../../../icons/delete.svg";
import {states} from "../../../Data/places"
import { Service } from "../../../Data/data";
import { SocialMedia } from "../../../Data/data";
import { influencerCategory } from "../../../Data/data";
import { Interest } from "../../../Data/data";
import { s_a } from "../../../Data/places";
import languages from "../../../Data/language";
import axios from "axios";
import { sendError } from "next/dist/server/api-utils";



const registration = () => {
   
   const [showsuccess,setShowsuccess]=useState(false);
  

  const deleteImg=()=>{
    let uploadButton = document.getElementById("upload-button");
    let chosenImage = document.getElementById("chosen-image");
    chosenImage.src=''
    uploadButton.value='';
  }

  useEffect(() => {

    let uploadButton = document.getElementById("upload-button");
    let chosenImage = document.getElementById("chosen-image");
    let fileName = document.getElementById("file-name");
    let usericon = document.getElementById("usericon");
    let addnewimg = document.getElementById("addnewimg");
    let addimg = document.getElementById("addimg");
    let deleteimg=document.getElementById('deleteimg');
    
    // deleteimg.addEventListener('onclick',uploadButton.value='')
    
    uploadButton.onchange = () => {
         addimg.style.visibility='hidden'
         addnewimg.style.visibility='visible'
         deleteimg.style.visibility='visible'
         let reader = new FileReader(); 
        reader.readAsDataURL(uploadButton.files[0]);
        reader.onload = () => {
            chosenImage.setAttribute("src",reader.result);
        }
        // fileName.textContent = uploadButton.files[0].name;
    }

   
    
    const abc=document.getElementById('btn1')
    const bcd=document.getElementById('btn2')
       abc.addEventListener('click',()=>abc.style.backgroundColor='rgb(190, 52, 85)')
       abc.addEventListener('click',()=>bcd.style.backgroundColor='white')
       abc.addEventListener('click',()=>bcd.style.color='black')
       bcd.addEventListener('click',()=>bcd.style.backgroundColor='rgb(190, 52, 85)')
       bcd.addEventListener('click',()=>abc.style.backgroundColor='white')
       bcd.addEventListener('click',()=>abc.style.color='black')
  
  }, [])

  const[isshowmobile,setIsShowmobile] =useState(false)
  const[isshowemail,setIsShowemail] =useState(false)
  const[isagency,setIsagency] =useState()

  const[isconfirm,setIsconfirm] =useState(false)
  const [profilePic,setProfilePic] =useState();
  const [currsocialmedia,setCurrsocialmedia]=useState([])
  
  useEffect(() => {
    setCurrsocialmedia(SocialMedia);
  }, [])
  


   const [username,setUsername] =useState('')
  const [lang,setLang]=useState([]);
  const [stt,setStt]=useState([]);
  const [cty,setCty]=useState([]);
  const [category,setCategory]=useState([]);
  const [interest,setInterest]=useState([]);
  const [smedia,setSmedia]=useState([]);
  const[a,setA]=useState();
  const[b,setB]=useState();
  const[c,setC]=useState();
  // const [smedialinks,setSmedialinks]=useState([]);
  const [services,setServices] =useState([{
    socialmedia:"",
    service:"",
    price:""
  }])
 const [socialUrls,setSocialUrls]=useState({})

  
 
 const [button,setButton] =useState();
   


   const [data,setData]=useState({
     name:"",
     
     business:"",
     dob:"",
    number:"",
    email:"",
    gender:"",
    brands:"",
   
   
   })
   
  
   
  

   useEffect(() => {
       if(isconfirm)
       document.getElementById('createprofile_btn').style.backgroundColor='black'

   }, [isconfirm])
   

 
   const [url,setUrl]=useState();
   const [token,setToken]=useState();


  const  reqBody={
    profilePic:url,
    name:data.name,
    username:username,
    businessName:data.business,
    dateofBirth:data.dob,
    phoneNumber:data.number,
    numberVisibleToPremium:isshowmobile,
    email:data.email,
    showEmailToPremium:isshowemail,
    gender:data.gender,
    brand:data.brands,
    isAgency:isagency,
    "yearOfExperience":'1',
    "country": "India", 
    "isPremium": true,
    "visibility": true,
    language:lang,
    state:stt,
    currentCity:cty,
    category:category,
    intrests:interest,
    socialURLs:socialUrls,
    socialServices:services,
    isconfirm:isconfirm,
   
  };
   const [cityname,setCityname]=useState([])


    
     
    
    
  
 

  const send = async (file) => {
    const data = new FormData();

    let headers = {
      accept: "application/json",
      "Accpet-Language": "en-Us",
      "Content-type": "multipart/form-data;"
    };
  
    data.append("file", file, file.name);

    axios
    .post("https://backend.discoverinfluencer.in/upload/upload-image", data, {
      headers: headers
    })
    .then((res) => {
      console.log("response : ", res.data.imagesKey[0]);
      setUrl(res.data.imagesKey[0])
    })
    .catch((errs) => {
      console.log(errs);
    });
  };


  const handleImage =(e)=>{
    const file=(e.target.files[0])
    send(file);

  }
  console.log(url)

  useEffect(() => {
      let tokken=window.location.href;
     setToken(tokken.slice(48));
    
     
    }, [])
    
    console.log(token)
  



  console.log(reqBody);

  const REG_API='https://backend.discoverinfluencer.in/user/register'

  const createProfile=async()=>{
    setShowsuccess(true);
   
   

    try {  console.log(token)
      await axios.post(REG_API,reqBody,{
        headers:{"ActivationToken":token}
       
      })
    } catch (error) {
       console.log("error during creating profile",error.message)
    }
     
   
   
    
  

  }
  
 


  const handlechange = (e) => {

    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const changesmedia=(e)=>{
     const {name,value} = e.target;
     
  setSocialUrls({
    ...socialUrls,
    [name]:value,
  })

  }



  // console.log(socialUrls);
  

 const changelanguage=(val,index)=>{
      const curvalue=[...lang];
      curvalue[index]=val.target.value;
      setLang(curvalue);
     
 }
 const changestate=(val,index)=>{
  
      const curvalue=[...stt];
      curvalue[index]=val.target.value;
      setStt(curvalue);


      axios.post('https://countriesnow.space/api/v0.1/countries/state/cities',{
        "country": "India",
        "state": val.target.value
    }).then((res)=>{
        setCityname([res.data.data])
        console.log("cities are" ,res.data.data);
      }).catch((err) =>{
        console.log(err)
      })
      


     
 }
 const changecity=(val,index)=>{
      const curvalue=[...cty];
      curvalue[index]=val.target.value;
      setCty(curvalue);
     
 }
 const changecategory=(val,index)=>{
      const curvalue=[...category];
      curvalue[index]=val.target.value;
      setCategory(curvalue);
     
 }
 const changeinterest=(val,index)=>{
      const curvalue=[...interest];
      curvalue[index]=val.target.value;
      setInterest(curvalue);
     
 }


  
  

    

//  const changesocialmedia=(val,index)=>{
//       const curvalue=[{...services}];
//       curvalue[index]=val.target.value;
//       setServices(prev=> prev[index].socialmedia=curvalue);
     
//  }
 const changeservices=()=>{
    const user=[...services]
    user[servicecount.length-1]={socialmedia:a,service:b,price:c}
     
    setServices(user)
 }


 useEffect(() => {
  changeservices()
  
 }, [a,b,c])
 
//  const changeprices=(val,index)=>{
//       const curvalue=[{...services}];
//       curvalue[index]=val.target.value;
//       setServices.price(curvalue);
     
//  }


  console.log(data);
  // console.log(lang);
  

  const [state,setState]=useState('Assam')

  const [city, setCity] = useState([]);

  const [languagecount, setLanguageCount] = useState(['']);
  const [categorycount, setCategoryCount] = useState(['']);
  const [interestcount, setInterestCount] = useState(['']);
  const [statecount, setStateCount] = useState(['']);
  const [citycount, setCityCount] = useState(['']);
  const [mediacount, setMediaCount] = useState(['']);
  const [servicecount, setServiceCount] = useState(['']);

  const addLanguage = () => {
    const a = [...languagecount, ''];
    setLanguageCount(a);
  };
  const deletelanguage = (index) => {
    
    const b = [...lang];
    const c= [...languagecount];
    if(lang.length>1){ b.splice(index,1);  c.splice(index,1) }
    setLang(b);
   
    setLanguageCount(c);
  }
  
  const addCategory = () => {
    setCategoryCount([1, ...categorycount]);
  };
  const deletecategory = (index) => {
    const b = [...category];
    const c = [...categorycount];
    if(category.length>1){ b.splice(index,1); c.splice(index,1)}
    setCategory(b);
    setCategoryCount(c);  };

  const addInterest = () => {
    setInterestCount([1, ...interestcount]);
  };

  const deleteinterest = (index) => {
    const b = [...interest];
    const c = [...interestcount];
    if(interest.length>1){ b.splice(index,1); c.splice(index,1)}
    setInterest(b);
    setInterestCount(c);
  };

  const addState = () => {
    setStateCount([1, ...statecount]);
    setCityCount([1, ...citycount]);
  };
  const deleteplace = (index) => {
    const a= [...stt];
    const b= [...cty];
    const c = [...statecount];
    const d =[...citycount];
    if(statecount.length>1){ b.splice(index,1); c.splice(index,1); a.splice(index,1)}
    if(citycount.length>1){  d.splice(index,1)}
    setStt(a)
    setCty(b)
    setStateCount(c)
    setCityCount(d)
  };

 

  const addMedia = () => {
    setMediaCount([1, ...mediacount]);
  };

  // const deletemedia = (index) => {
  //   console.log(index)
  //   const b = [...smedia];
  //   const c = [...mediacount];
  //   if(mediacount.length>1){ b.splice(index,1); c.splice(index,1)}
  //   setSmedia(b);
  //   setMediaCount(c);  };

    const addService = () => {
      setServiceCount([1, ...servicecount]);
    };

  const deleteservice = (index) => {
    const a= [...socialmedia];
    const b= [...services];
    const c = [...servicecount];
    if(servicecount.length>1){ a.splice(index,1); b.splice(index,1); c.splice(index,1)}
    setSocialmedia(a);
    setServices(b);
    setServiceCount(c);
      };

    // const [index,setIndex]=useState()
    // const getindex=(e)=>{
    //   // const name=e.target.setAttribute('name')
    //   const {value}=e.target;
    //   setIndex(name)
    //   console.log(name);
    //   console.log(value);
    // } 

  useEffect(() => {
   var data=1;
     data= states.indexOf(state)
    console.log(data);
    setCity(s_a[data].split("|"));
  }, [state]);
  

  // useEffect(() => {
  //   console.log(city);
  // }, [city]);



 
  return (
    <>
     <Head>

      <title> Registration page</title>
     </Head>
  

        <div className="nav"> <Navbar /> </div>
     
      <div className={styles.main_div} id='main_div'>
        <h3 className={styles.main_heading}>Influencer Registration</h3>
        <div className={styles.info_profileimg}>
          <p>
            Let people get to know you better through your influencer profile.
            Be clear,
            <br /> detailed, and authentic!
          </p>
          <form className={styles.form} id="myform" encType="multipart/form-data">
            <div className={styles.icn}>
            
            <figure class="image-container" >
            
          <img id="chosen-image" className={styles.image} href={url}/>
          <FontAwesomeIcon  icon={faUser} id='usericon' className={styles.usericn}/>
      </figure>
            </div>
            <div className={styles.file_upload}>
              <input type="file" className={styles.file} id="upload-button" accept="image/*" onChange={(e)=>handleImage(e)} />
              <div className={styles.file_btn} id='addimg'><p>Upload Photo</p>  </div>
              <div className={styles.file_btn2} id='addnewimg'><p>Upload New Photo</p>  </div>
              <div className={styles.file_btn3} id='deleteimg' onClick={deleteImg}><p>Delete</p>  </div>
            </div>
          </form>
        </div>

        <div className={styles.other_info}>
          {/* Name */}
          <div className={styles.name} id={styles.register}>
            <label for="name">
              <b id={styles.mark}>Full name</b>
            </label>
            <br />
            <input
              type="text"
              id={styles.inpt}
              placeholder="Enter Full name"
              name="name"
              value={data.name}
              onChange={(e) => handlechange(e)}
              required
            />
          </div>

          {/* username */}
          <div className={styles.username} id={styles.register}>
            <label for="uname">
              <b id={styles.mark}>Username</b>
            </label>
            <br />
            <input
              type="text"
             
              id={styles.inpt}
              placeholder="Enter Username"
              name="username" 
              value={username}
              
              onChange={(e) => setUsername(e.target.value.trim())} 
              required
            />
          </div>

          {/* Business */}

          <div className={styles.business} id={styles.register}>
            <label for="name">
              <b>Business Name/Alias</b>
            </label>
            <br />
            <input
              type="text"
              id={styles.inpt}
              placeholder="Enter Business name"
              name="business"
              value={data.business}
              onChange={(e) => handlechange(e)}
              required
            />
          </div>

          {/* DOB */}
          <div className={styles.dob} id={styles.register}>
            <label for="name">
              <b id={styles.mark}>Date of Birth</b>
            </label>
            <br />
            <input
              style={{ paddingRight: "10px" }}
              type="date"
              id={styles.inpt}
              placeholder="dd/mm/yyyy"
              name="dob"
              value={data.dob}
              onChange={(e) => handlechange(e)}
              required
            />
          </div>

          {/* language  */}
          <div id={styles.dropdown} >
            <label for="name">
              <b id={styles.mark}>Language</b>
            </label>
            <br />
            {languagecount.map((elem, index) =>{  return (
              <div className={styles.language} id={styles.select} key={index} >
                <select value={lang[index]}
                  id={styles.selection}
                  name="language"
                  onChange={(e) => {changelanguage(e,index) ;console.log(e.target.value)}}
                >
                  <option value="" disabled hidden selected>
                    Select
                  </option>
                  {languages.map((elem,key) => (
                    <>
                      <option key={key} >{elem.name}</option>
                    </>
                  ))}
                </select>
         

              <div className="removebtn">   <Image name={index}
                  src={deletes}
                  id={styles.deleteicon}
                  onClick={()=>{
                   deletelanguage(index)

                  }}
                ></Image>  </div>
              </div>
            )})}
             { languagecount.length<4  && <div id={styles.add_another}>
            <h5 onClick={addLanguage}>+ Add another Language</h5>
          </div>}
          </div>

          

          <div className={styles.state_city}>
            {/* states */}
            <div className={styles.state}>
              <label for="state">
                <b id={styles.mark}>State</b>
              </label>
              <br />
              {statecount.map((ele,index) => (
                <div className={styles.allstates} key={index}>
                  <select  value={stt[index]}
                    className='optionstate'
                    id={styles.select_state}
                    onChange={(e) => { changestate(e,index) ; setState(e.target.value)}}
                  >
                        <option value="" disabled selected hidden>
                          Select
                        </option>
                     {states.map((elem, key) => (
                      <>
                     
                        <option id={key}  value={elem} >{elem}</option>
                      </>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* city */}

            <div className={styles.city}>
              <label for="uname">
                <b id={styles.mark}>City</b>
              </label>
              <br />
              {citycount.map((elem, index) => (
                <div className={styles.allcities} key={index}>
                  <select name="city"  value={cty[index]} id={styles.select_city}  onChange={(e) =>{ changecity(e,index); console.log(cty)}}>
                    <option  disabled selected hidden>
                      Select
                    </option>
                    {city.map((elem,key) => (
                      <>
                        <option id={key} key={key} >{elem}</option>
                      </>
                    ))}
                  </select>
                  <Image
                    src={deletes}
                    id={styles.deleteicon2}
                    onClick={()=>deleteplace(index)}
                  ></Image>
                </div>
              ))}
            </div>
          </div>
          { statecount.length<2  &&  <div id={styles.add_another}>
            <h5 onClick={addState}>+ Add another Place</h5>
          </div> }

          {/* number */}
          <div className={styles.number_main}>
            <div className={styles.number}>
              <label for="uname">
                <b id={styles.mark}>Mobile Number(Personal Only) </b>
              </label>
              <br />
              <input
                type="number"
                id={styles.inpt}
                placeholder="Enter mobile number(+91-4726482345)"
                name="number"
                value={data.number}
                onChange={(e) => handlechange(e)}
                required
              />
            </div>
            <div className={styles.mobile_checkbox}>
              <div id={styles.ckbx}>
                {" "}
                <input type="checkbox" name="shownumber" 
                value={true}onClick={(e)=>setIsShowmobile(e.target.value)} />
                <p>Show my Mobile Numbers only to Premium users</p>
                <br />{" "}
              </div>
              <h6>
                If Unchecked,Your mobile number will be visible to everyone
              </h6>
            </div>
          </div>
          {/* email */}
          <div className={styles.email_main}>
            <div className={styles.email}>
              <label for="email">
                <b id={styles.mark}>Email</b>
              </label>
              <br />
              <input
                type="text"
                id={styles.inpt}
                placeholder="Enter Email"
                name="email"
                value={data.email}
                onChange={(e) => handlechange(e)}
                required
              />
            </div>
            <div className={styles.email_checkbox}>
              <div id={styles.ckbx}>
                <input type="checkbox" name="showemail"
                 value={true} onClick={(e)=>setIsShowemail(e.target.value)}
                />
                <p>Show my Email address only to Premium users</p>
                <br />{" "}
              </div>
              <h6>
                If Unchecked,Your Email address will be visible to everyone
              </h6>
            </div>
          </div>
          {/* Gender */}
          <div id={styles.dropdown}>
            <label for="gender">
              <b id={styles.mark}>Gender</b>
            </label>
            <br />
            <div id={styles.select}>
              <select name="gender" 
                value={data.gender} onChange={(e)=>handlechange(e)}>
                <option value="" disabled hidden selected>
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Nonbinary</option>
              </select>
            </div>{" "}
          </div>

          {/* category */}
          <div id={styles.dropdown}>
            <label for="category">
              <b id={styles.mark}>Category</b>
            </label>
            <br />
            {categorycount.map((element, index) => (
              <div id={styles.select}>
                <select name="category" value={category[index]} onChange={(e)=>changecategory(e,index)}>
                      <option value="" disabled hidden selected>
                        Select
                      </option>
                  {influencerCategory.map((elem) => (
                    <>
                      <option>{elem}</option>
                    </>
                  ))}
                </select>
                <Image
                  src={deletes}
                  id={styles.deleteicon}
                  onClick={()=>deletecategory(index)}
                ></Image>
              </div>
            ))}
          </div>
          { categorycount.length<4 &&  <div id={styles.add_another}>
            <h5 onClick={addCategory}>+ Add another Category</h5>
          </div> }

          {/* Interest */}


          <div id={styles.dropdown}>
            <label for="interest">
              <b id={styles.mark}>Interest</b>
            </label>
            <br />
            {interestcount.map((elem,index) => (
              <div id={styles.select}>
                <select name="interest" value={interest[index]} onChange={(e) => changeinterest(e,index)}>
                  <option value="" selected hidden disabled>
                    Select
                  </option>
                  {Interest.map((elem,key) => (
                    <option key={key}>{elem}</option>
                  ))}
                </select>
                <Image
                  src={deletes}
                  id={styles.deleteicon}
                  onClick={()=>deleteinterest(index)}
                ></Image>
              </div>
            ))}
          </div>
          { interestcount.length<6  &&   <div id={styles.add_another}>
            <h5 onClick={addInterest}>+ Add another interest</h5>
          </div> }

          {/* brands */}

          <div className={styles.brands} id={styles.register}>
            <label for="brands">
              <b>Brands you've previously worked with</b>
            </label>
            <br />
            <input
              type="text"
              id={styles.inpt}
              placeholder="Name of the Brand/Company"
              name="brands"
              value={data.brands}
              onChange={(e) => handlechange(e)}
              required
            />
          </div>

          {/* Agency */}

          <div className={styles.agency}>
            <label for="uname">
              <b id={styles.mark}>Are you represented by an Agency</b>
            </label>
            <br />
            <div className={styles.agency_btn}>
              <button id='btn1' className={styles.yesbtn} value={true} onClick={(e)=>setIsagency(true)}>Yes</button>
              <button id='btn2' className={styles.nobtn} value={false}  onClick={(e)=>setIsagency(false)} >No</button>
            </div>
          </div>

          <div className={styles.social_media}>
            {/* social media */}

            <div className={styles.media}>
              <label for="media">
                <b id={styles.mark}>Social Media</b>
              </label>
              <br />
              {mediacount.map((val, index) => (
                <div className={styles.all_media}>
                  <select  id={styles.select_city} /* onChange={(e) => changesmedia(e,index)} */ onChange={(e)=>setSmedia(e.target.value)}>
                    <option value="" disabled hidden selected>
                      Select
                    </option>
                    {SocialMedia.map((val, key) => (
                      <option key={key} value={val} /* disabled={smedia.includes(val)}*/ >{val}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {/* media links */}
            <div className={styles.medialink}>
              <label for="uname">
                <b id={styles.mark}>Social Media Link</b>
              </label>
              <br />
              {mediacount.map((val,index) => (
                <div className={styles.all_links}>
                  {/* <p>{index}</p> */}
                  <input
                    type="url" /* value={smedialinks[index]} */
                    placeholder="url"
                    name={smedia} onChange={(e) => changesmedia(e)}
                    required 
                  />{" "}
                  <Image
                    src={deletes} 
                    id={styles.deleteicon2}
                    onClick={(e)=>deletemedia(index)}
                  ></Image>{" "}
                </div>
              ))}
            </div>
          </div>
          { mediacount.length<10  &&  <div id={styles.add_another}>
            <h5 onClick={addMedia}>+ Add another social media</h5>
          </div> }



          <div className={styles.services_body}>
            <div className={styles.socialm} id={styles.last}>
              <label for="social_media">
                <b id={styles.mark}>Social Media</b>
              </label>
              <br />
              {servicecount.map((elem,index) => (
                <div>
                  <select name="social_media"  id={styles.select_media} onChange={(e) => setA(e.target.value)}>
                    <option hidden selected disabled>
                      Select
                    </option>
                    {SocialMedia.map((val, index) => (
                      <option >{val}</option>
                    ))}
                  </select>{" "}
                </div>
              ))}
            </div>

            <div className={styles.services} id={styles.last}>
              <label for="social_media">
                <b id={styles.mark}>Service</b>
              </label>
              <br />
              {servicecount.map((val,index) => (
                <div>
                  <select /* value={services[index].service} */ name="social_media" id={styles.select_media} onChange={(e) => setB(e.target.value)}>
                    <option selected disabled hidden>
                      Select
                    </option>
                    {Service.map((val, key) => (
                      <option >{val}</option>
                    ))}
                  </select>{" "}
                </div>
              ))}
            </div>

            <div className={styles.services_price} id={styles.last}>
              <label for="social_media">
                <b id={styles.mark} >Service starting price</b>
              </label>
              <br />
              {servicecount.map((elem,index) => (
                <div>
                  <input
                    type="number"
                    placeholder="starting price"
                    
                    onChange={(e) => setC(e.target.value)}
                  />
                  <Image
                    src={deletes}
                    id={styles.deleteicon2}
                    onClick={()=>deleteservice(index)}
                  ></Image>{" "}
                </div>
              ))}
            </div>
          </div>
          { servicecount.length<8  &&  <div id={styles.add_another}>
            <h5 onClick={addService}>+ Add another category</h5>
          </div> }

          <div className={styles.terms_and_condition}>
            <input type="checkbox" id={styles.checkbox} name="terms" value="true" onClick={(e)=>{setIsconfirm(!isconfirm); }} />
            <p>By checking the box, you are agreeing to our terms of service</p>
          </div>
          <div className={styles.create_profile}>
            <button id="createprofile_btn" onClick={createProfile}>Create Profile</button>
          </div>
        </div>
      </div>
         { showsuccess && <div className={styles.approval}> <Approval approval={showsuccess} setapproval={setShowsuccess} /> </div>}
    </>
  );
};

export default registration;
