import React from 'react'
import {useRouter} from 'next/router'


const abc = () => {
    const router=useRouter();


 const handlesubmit=()=>{

    router.push('/')
 }

  return (
    <div>
        <button onClick={handlesubmit}>
            submit
        </button>


    </div>
  )
}

export default abc