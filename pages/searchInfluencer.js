import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import searchn from "../icons/searchn.svg";
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
import arrow from "../icons/arrow-left.svg";
import styles from "../styles/jobs.module.css";
import Navbar from "../components/navbar1";
import SearchInfluencerSkeleton from "../components/searchInfluencerSkeleton";
import languages from "../Data/language";
import { Coursesdata } from "../Data/data";
import { influencerCategory } from "../Data/data";
import { Interest } from "../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import Head from "next/head";
import axios from "axios";

const obj = {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Snapchat,
  Linkedin,
  Pinterest,
  Koo,
  Moj,
  Tiktok,
};
console.log(languages.name);

const searchInfluencer = () => {
  const [showloader, setShowLoader] = useState(true);
  const [cat, setCat] = useState("");
  const [nodata, setNoData] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [category, setCategory] = useState([]);
  const [interest, setInterest] = useState([]);
  const [city, setCity] = useState({ city: "" });
  const [gender, setGender] = useState();

  const [userData, setUserData] = useState([]);

  const [searchInf, setSearchInf] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchlanguage, setSearchLanguage] = useState("");
  const [count, setCount] = useState(9);
  // console.log(globalState);
  // const router = useRouter()

  useEffect(() => {
    let tokken = window.location.href;
    //  setCat(tokken.slice(56));
    //  setCat(tokken.slice(44));
    setCat(tokken.slice(44));
  }, []);

  const callfunc = () => {
    console.log(cat);
    if (cat.length > 0) {
      // setcat(cat)
      if (cat == "Fashion") {
        const checkbox = document.querySelector("input[value='Fashion Model']");
        checkbox.setAttribute("checked", true);
        console.log("hii");
      } else if (cat == "Travel") {
        const checkbox = document.querySelector("input[value='Traveler']");
        checkbox.setAttribute("checked", true);
      } else if (cat == "Automobile") {
        const checkbox = document.querySelector(
          "input[value='Automobile Reviewer']"
        );
        checkbox.setAttribute("checked", true);
      } else if (cat == "Health") {
        const checkbox = document.querySelector("input[value='Doctor']");
        checkbox.setAttribute("checked", true);
      } else if (cat == "Food") {
        const checkbox = document.querySelector("input[value='Food Reviewer']");
        checkbox.setAttribute("checked", true);
      }
    }
  };
  // useEffect(() => {

  // }, [])
  callfunc();

  // const [showfilter,setShowFilter] =useState(false)

  const handleclick = () => {
    setCount(count + 3);
  };

  const changeSocialMedia = (e) => {
    const { value, checked } = e.target;
    // console.log(`${value} is ${checked}`)

    if (checked) {
      setSocialMedia([...socialMedia, value]);
    } else {
      setSocialMedia(socialMedia.filter((e) => e !== value));
    }
  };
  //  console.log(socialMedia)
  const changeCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) setCategory([...category, value]);
    else {
      setCategory(category.filter((e) => e !== value));
    }
  };
  const changeInterest = (e) => {
    const { value, checked } = e.target;
    if (checked) setInterest([...interest, value]);
    else {
      setInterest(interest.filter((e) => e !== value));
    }
  };

  const changeCity = (e) => {
    const { name, value } = e.target;
    setCity({
      ...city,
      [name]: value,
    });
  };
  const changeGender = (e) => {
    const { value, checked } = e.target;
    if (checked) setGender(value);
  };

  const getallData = async () => {
    try {
      const response = await axios.get(
        "https://backend.discoverinfluencer.in/user/all"
      );
      const datas = response.data.users;
      // console.log(datas);
      setUserData(datas);
      setNoData(false);
    } catch (error) {
      console.log("error is ", error.message);
      setNoData(true);
    }
  };

  const getFilteredData = () => {
    axios
      .post("https://backend.discoverinfluencer.in/home/influencer_filters", {
        socialmedia: socialMedia,
        category: category,
        interest: interest,
        gender: gender,
        city: city.city,
      })
      .then((response) => {
        console.log(response.data.message);
        var abc = response.data.message;
        setUserData(abc);
        setNoData(false);

        // console.log(response.data.message)
      })
      .catch((error) => {
        console.log("Error during fetching data", error.message);
        setNoData(true);
      });
  };

  const getcategoryfilter = async () => {
    try {
      console.log(cat);
      const res = await axios.post(
        "https://backend.discoverinfluencer.in/home/influencer_filters",
        { category: cat }
      );
      const response = res.data;
      console.log(response);
    } catch (error) {
      console.log("error while filtering categorysection", error.message);
    }
  };

  useEffect(() => {
    if (cat) getcategoryfilter();
  }, [cat]);

  useEffect(() => {
    if (
      socialMedia.length == 0 &&
      category.length == 0 &&
      interest.length == 0
    ) {
      getallData();
    } else {
      getFilteredData();
    }
  }, [socialMedia, category, interest, gender]);

  const datas = userData[0];
  if (datas != undefined) var urls = datas.socialURLs[0];

  const handlefilter = () => {
    document.getElementById("main_filter").style.display = "block";
  };
  const handlecross = () => {
    document.getElementById("main_filter").style.display = "none";
  };

  return (
    <>
      {console.log(userData)}
      <Head>
        <title> SearchInfluencer-Filter</title>
      </Head>

      {/* {console.log(data)} */}

      <Navbar />
      <div className={styles.main_heading}>
        {" "}
        <h2>Discover Influencer</h2>
      </div>
      <button className={styles.filter_btn} onClick={handlefilter}>
        {" "}
        <FontAwesomeIcon className={styles.filtericon} icon={faFilter} /> Filter
      </button>
      <div className={styles.main_filter_div} id="main_filter">
        <div className={styles.filter_category1} id={styles.filters}>
          <FontAwesomeIcon
            className={styles.crossIcon}
            icon={faXmark}
            onClick={() => handlecross()}
          />
          <h3>Social media</h3>
          <input
            type="checkbox"
            id={styles.instagram}
            name="instagram"
            value="Instagram"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="instagram"> Instagram</label>
          <br />

          <input
            type="checkbox"
            id={styles.facebook}
            name="facebook"
            value="Facebook"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="facebook"> facebook</label>
          <br />

          <input
            type="checkbox"
            id={styles.linkdin}
            name="Linkdin"
            value="Linkdin"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="instagram"> Linkdin</label>
          <br />

          <input
            type="checkbox"
            id={styles.snapchat}
            name="Snapchat"
            value="Snapchat"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="Snapchat"> Snapchat</label>
          <br />

          <input
            type="checkbox"
            id={styles.pinterest}
            name="Pinterest"
            value="Pinterest"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="Pinterest"> Pinterest</label>
          <br />

          <input
            type="checkbox"
            id={styles.youtube}
            name="Youtube"
            value="Youtube"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="Youtube"> Youtube</label>
          <br />

          <input
            type="checkbox"
            id={styles.twitter}
            name="Twitter"
            value="Twitter"
            onChange={(e) => changeSocialMedia(e)}
          />
          <label for="Twitter"> Twitter</label>
          <br />
        </div>

        <div className={styles.filter_category2} id={styles.filters}>
          <h3>Influencer Category</h3>
          <div id={styles.search}>
            <Image src={searchn} id={styles.searchimg}></Image>
            <input
              type="text"
              className={styles.citySearch}
              onChange={(event) => {
                setSearchInf(event.target.value);
              }}
            />
          </div>
          <div className={styles.influencer_checkbox}>
            {influencerCategory
              .filter((val) => {
                if (searchInf == "") {
                  return val;
                } else if (val.toLowerCase().includes(searchInf.toLowerCase()))
                  return val;
              })
              .map((elem, key) => (
                <>
                  <input
                    type="checkbox"
                    id={styles.checkbox}
                    className="ckbox"
                    name="Influencer"
                    value={elem}
                    onChange={(e) => changeCategory(e)}
                  />
                  <label for="influencer"> {elem}</label>
                  <br />
                </>
              ))}{" "}
          </div>
        </div>
        <div className={styles.filter_category3} id={styles.filters}>
          <h3>Interest</h3>
          <div id={styles.search}>
            <Image src={searchn} id={styles.searchimg}></Image>
            <input
              type="text"
              className={styles.citySearch}
              onChange={(event) => {
                setSearchIndustry(event.target.value);
              }}
            />
          </div>

          <div className={styles.industry_checkbox}>
            {Interest.filter((val) => {
              if (searchIndustry == "") {
                return val;
              } else if (
                val.toLowerCase().includes(searchIndustry.toLowerCase())
              )
                return val;
            }).map((elem) => (
              <>
                <input
                  type="checkbox"
                  id={styles.checkbox}
                  classname="ckbox"
                  name={elem}
                  value={elem}
                  onChange={(e) => changeInterest(e)}
                />
                <label for="influencer"> {elem}</label>
                <br />
              </>
            ))}{" "}
          </div>
        </div>

        <div className={styles.filter_language} id={styles.filters}>
          <h3>Language</h3>
          <div id={styles.search}>
            <Image src={searchn} id={styles.searchimg}></Image>
            <input
              type="text"
              className={styles.citySearch}
              onChange={(event) => {
                setSearchLanguage(event.target.value);
              }}
            />
          </div>
          <div className={styles.language_checkbox}>
            {languages
              .filter((val) => {
                if (searchlanguage == "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchlanguage.toLowerCase())
                )
                  return val;
              })
              .map((elem, key) => (
                <>
                  <input
                    type="checkbox"
                    id={styles.checkbox}
                    className="ckbox"
                    name="Influencer"
                    value={elem.name}
                    onChange={(e) => changeCategory(e)}
                  />
                  <label for="influencer"> {elem.name}</label>
                  <br />
                </>
              ))}{" "}
          </div>
        </div>

        <div className={styles.filter_category4} id={styles.filters}>
          <h3>City</h3>
          <div id={styles.search}>
            <Image src={searchn} id={styles.searchimg}></Image>
            <input
              type="search"
              name="city"
              className={styles.citySearch}
              value={city.city}
              onChange={(e) => changeCity(e)}
            />
          </div>
        </div>

        <div className={styles.gender} id={styles.filters}>
          <h3>Gender</h3>
          <input
            type="checkbox"
            id={styles.checkbox}
            value="male"
            onChange={(e) => changeGender(e)}
          />
          <label for="influencer"> Male</label>
          <br />

          <input
            type="checkbox"
            id={styles.checkbox}
            value="female"
            onChange={(e) => changeGender(e)}
          />
          <label for="influencer"> Female</label>
          <br />

          <input
            type="checkbox"
            id={styles.checkbox}
            value="nonbinary"
            onChange={(e) => changeGender(e)}
          />
          <label for="influencer"> nonbinary</label>
          <br />
        </div>
      </div>

      <form className={styles.form}>
        <input
          type="text"
          className={styles.search}
          placeholder="Yoga trainer from Mumbai who speaks Bengali..."
        />
        <button className={styles.search_icon}>
          <Image src={searchn} id={styles.search_Icon} />
        </button>
      </form>

      {userData.length == 0 && nodata == false ? (
        <SearchInfluencerSkeleton />
      ) : (
        <div className="main_div">
          {nodata ? (
            <div className={styles.nodatafound}>
              {" "}
              <h2>No User Found...</h2>
            </div>
          ) : (
            <div className={styles.all_profiles_div}>
              {userData
                .filter((elem) => elem.visibility)
                .slice(0, count)
                .map((item, ind) => (
                  <div className={styles.card} key={ind}>
                    <Link href={`/${item.username}`}>
                      {" "}
                      <div className={styles.card_top}>
                        <Image
                          src={item.profilePic}
                          alt={item.title}
                          width="400"
                          height="300"
                        ></Image>
                        <h1>{item.username}</h1>
                      </div>{" "}
                    </Link>
                    <div className={styles.card_bottom}>
                      <h4>
                        {item.category[0]},{item.category[1]}
                      </h4>
                      <div className={styles.icon_btn_all}>
                        {Object.entries(userData[ind].socialURLs[0]).map(
                          ([key, value]) => (
                            <Link href={value} key={key} target="_blank">
                              {" "}
                              <Image src={obj[key]} id={styles.ic} />{" "}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {userData.length > 15 ? (
                <div className={styles.load_more}>
                  <button
                    className={styles.load_more_btn}
                    onClick={handleclick}
                  >
                    {" "}
                    <p>See More</p>{" "}
                    <Image
                      src={arrow}
                      style={{ height: "15px", width: "15px" }}
                    />{" "}
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default searchInfluencer;
