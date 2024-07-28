// src/view.js
import React, { useState } from 'react';
import Header from './header';
import AudioPlayer from './assets/audioPlayer';
import { useEffect } from 'react';
import { CURRENT_STATUS } from '../statusIndicator';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';
import Lottie from 'lottie-react';
import loader from '../loadingPdfProj.json'



function View({data,emotion}) {

const [pdf,setPdf] = useState({})

// const [error,setError] = useState(null)

// const[status,setStatus] = useState(CURRENT_STATUS.IDEAL)

console.log("responseeeeeeeeeee:");
console.log(data)

// const fetchData = async()=>{
//   try{

//     setStatus(CURRENT_STATUS.LOADING)
//     // const res = axios.get()

//     await  wait(2000);
  
//     setStatus(CURRENT_STATUS.SUCCESS);
//   } 
//   catch(err){
//        setStatus(CURRENT_STATUS.ERROR)
//        setError(err)
//   }


// }


// useEffect(()=>{
//   fetchData()
// },[])

// const loading = status === CURRENT_STATUS.LOADING
// const success = status === CURRENT_STATUS.SUCCESS
// const Error = status === CURRENT_STATUS.ERROR

// if(loading){
//   return <div className='h-screen bg-gradient-to-r from-[#381C59] to-[#3E187A] flex justify-center items-center font-bold overflow-y-hidden'><Lottie animationData={loader} loop={true} className='h-52'/></div>
// }
return (
    <>
<div className="min-h-screen bg-gradient-to-r from-[#381C59] to-[#3E187A] flex flex-col justify-center items-center ">
        <Header />
        <div className='mt-[10vh] w-[90%] overflow-hidden'>
          <AudioPlayer data={data} emotion={emotion} />
        </div>
      </div>    
    </>
  );
}

export default View;
