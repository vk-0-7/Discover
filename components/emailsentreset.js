import  Link  from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const emailsentreset = ({showemailsent,setemailsent}) => {
  return (


    // <div><h1>Hi</h1></div>
    <div  style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        zIndex: "100",
        backgroundColor: "rgba(0,0,0,0.1)",
      }} >
       
      <div style={{height:"25rem",width:"50vw", backgroundColor:"white", 
           zIndex:"1005",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:"flex",alignItems:"center",justifyContent:"center" ,borderRadius:"15px"  }}>
           <FontAwesomeIcon
            style={{position:"absolute",top:"2rem",right:"2rem",height:"28px",width:"28px",cursor:"pointer"}}
            icon={faXmark}
            onClick={() => setemailsent(false)}
          />
         <div> <h2 style={{textAlign:"center"}}>We have successfully sent you an email <br /> to reset your passsword . 
           </h2>
          {/* <Link href='/' ><button style={{ color: "white",
    marginTop: "18px",
    width: "100%",
    height: "45px",
    backgroundColor: "rgb(190, 52, 85)",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"}}>Open Email</button> </Link> */}
     </div> 



      </div>



    </div>
  )
}

export default emailsentreset