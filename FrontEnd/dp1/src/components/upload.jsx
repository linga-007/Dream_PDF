import React from 'react'
import { useState , useRef} from 'react';
import { Link } from 'react-router-dom';
import Header from './header'
import { motion, spring } from 'framer-motion';
import { type } from '@testing-library/user-event/dist/type';

function Upload() {
  const [file, setFile] = useState(null);
  const[over , setOver] = useState(false)
  const btnRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", "test");
    formData.append("file", file);

    // try {
    //   const res = await axios.post("http://localhost:3003/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.error("Error uploading file:", err);
    // }

    setFile(null);
  };

  const parentVarient ={
    hidden:{
      x:-1500,
    },
    visible:{
      x:0,
      transition:{
        type:"spring",
        duration:0.75,delay:0.25,
        when:"beforeChildren",
        staggerChildren:0.5
      }
    }
  }

  const btnVarient ={
    visible:{
      opacity:[0,1,0,1,0,1],
      transition:{
       delay:1.5
      }
    },
 over:{
  scale:1.2,
  // textShadow : "0px 0px 8px violet",
  boxShadow:"0px 0px 8px violet",
 }
}

  return (
    <>

    <div className='bg-[url("/pc4.jpg")] bg-cover '>
    <Header/>
    <motion.div variants={parentVarient}   initial="hidden" animate="visible"  className='w-screen h-screen flex flex-col justify-center items-center pr-10 pb-10'>
    <h1 className='bg-gradient-to-r from-[#a17fe0] to-[#5D26C1] font-bold text-[3vw] mt-10 uppercase pb-5 bg-clip-text text-transparent'>Pdf Upload</h1>
      <div
        onDragOver={(e) => { e.preventDefault();  
           setOver(true)
           console.log(over) }}
        onDragLeave={(e) => { e.preventDefault();  
          setOver(false)
          console.log(over) }}
        onDrop={(e) => {
          e.preventDefault();
          console.log("check")
          setFile(e.dataTransfer.files[0]);
        }}
        className={`border-4 rounded-xl border-dashed border-[#59C173] w-[45%] h-80 mb-9 flex flex-col justify-center items-center bg-opacity-20 backdrop-blur-lg ${over?"bg-white":"bg-black"}`}
      >
        <img
          src={file === null ? 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/upload-cloud-icon.png' : "https://as1.ftcdn.net/v2/jpg/02/26/42/06/1000_F_226420649_vlXjp3JyUrnW5EHY00dvhbqkVdUfyafj.jpg"}
          className='h-14 mb-5'
          alt='Upload Icon'
        />
        <form className="space-y-4 flex flex-col" onSubmit={onSubmit}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} hidden ref={btnRef} />
          <motion.button variants={btnVarient}  whileHover="" type="button" onClick={() => btnRef.current.click()} className="w-44 bg-[#59C173] text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-opacity-50">
            Upload a File
          </motion.button>
        
        </form>
      </div>
{
  file&&<Link to="/view">
      <motion.button variants={btnVarient} animate="visible" whileHover="over" type="submit" className="w-44 bg-[#59C173] text-white py-2 px-4 mt-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-opacity-50">
            Submit
          </motion.button>
      </Link>
}
      
    </motion.div>
   

      </div>
    </>
  );
}

export default Upload
