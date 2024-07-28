import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import { motion } from 'framer-motion';
import axios from 'axios';
import Lottie from 'lottie-react';
import loader from '../loadingPdfProj.json';
import { CURRENT_STATUS } from '../statusIndicator';
import { history, examples } from '../secret';
import Pdf from '../dec1.pdf';
import pdfImg from './assets/pdf.png'


function Upload({ setData, setEmotion }) {
  const [over, setOver] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(CURRENT_STATUS.IDEAL);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [tfile, setTFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
      console.log(selectedFile.name);
    }
  };

  const handleHistory = async (e) => {
    e.preventDefault();
    
    // Convert the imported PDF to a Blob
    const response = await fetch(Pdf);
    const pdfBlob = await response.blob();
    const pdfFile = new File([pdfBlob], "dec1.pdf");
  
    const formData = new FormData();
    formData.append('file', pdfFile);
  
    try {
      setStatus(CURRENT_STATUS.LOADING);
  
      const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      const response1 = await axios.get("http://localhost:5000/getwords");
      console.log(response1.data);
      
      const res = uploadResponse.data.file;
      const finalData = {};
      let prev = 0;
      console.log("check");
  
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        finalData[Math.floor(res[i].timestamp)] = {
          words: res[i].text,
          emotion: res[i].label
        };
        prev = Math.floor(res[i].timestamp);
      }
      console.log(finalData);
      setData(finalData);
      setEmotion(response1.data);
      setStatus(CURRENT_STATUS.SUCCESS);
    } catch (error) {
      console.error('Error generating or downloading file:', error);
      setStatus(CURRENT_STATUS.ERROR);
      setError(error);
    }
  };
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus(CURRENT_STATUS.LOADING);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      const response1 = await axios.get("http://localhost:5000/getwords");
      console.log(response1.data);
      var res = response.data.file;
      var finalData = {};
      console.log("check");

      console.log(res);
      for (var i = 0; i < res.length; i++) {
        finalData[Math.floor(res[i].timestamp)] = {
          words: res[i].text,
          emotion: res[i].label
        };
      }
      console.log(finalData);
      setData(finalData);
      setEmotion(response1.data);
      setStatus(CURRENT_STATUS.SUCCESS);
    } catch (error) {
      console.error('Error generating or downloading file:', error);
      setStatus(CURRENT_STATUS.ERROR);
      setError(error);
    }
  };

  const parentVarient = {
    hidden: {
      x: -1500,
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        duration: 0.75, delay: 0.25,
        when: "beforeChildren",
        staggerChildren: 0.5
      }
    }
  };

  const btnVarient = {
    visible: {
      x: [-1500, 0],
      transition: {
        type: "spring",
        duration: 0.75, delay: 0.25,
      }
    },
    over: {
      scale: 1.2,
      boxShadow: "0px 0px 8px violet",
    }
  };

  const loading = status === CURRENT_STATUS.LOADING;
  const success = status === CURRENT_STATUS.SUCCESS;
  const Error = status === CURRENT_STATUS.ERROR;
  const ideal = status === CURRENT_STATUS.IDEAL;

  if (loading) {
    return <div className='h-screen bg-gradient-to-r from-[#381C59] to-[#3E187A] flex justify-center items-center font-bold overflow-y-hidden'><Lottie animationData={loader} loop={true} className='h-96' /></div>;
  }

  if (success) {
    navigate("/view");
  }

  return (
    <>
      {ideal && <div className='bg-[url("/pc4.jpg")] bg-cover '>
        <Header />
        <div className='flex flex-row items-center mx-5'>
          <div className='w-[25%] flex flex-col justify-center items-center pr-10 pb-10 bg-black bg-opacity-30 rounded-xl mr-10'>
            <h1 className='text-white text-2xl  mt-5'>Try Our Examples</h1>
            <div className='w-[100%] flex flex-wrap flex-col p-10'>
              {examples.map((name, index) => (
                <div key={index} onClick={handleHistory} className='bg-[#59C173] w-[100%] flex justify-center text-white py-2 px-4 m-2 rounded-md h-12 items-center'>
                  {name}
                </div>
              ))}
            </div>
          </div>
          <motion.div variants={parentVarient} initial="hidden" animate="visible" className='w-[80%] h-screen flex flex-col justify-center items-center pr-10 pb-10'>
            <h1 className='bg-gradient-to-r  from-[#a17fe0] to-[#5D26C1] font-bold text-[3vw] mt-10 uppercase pb-5 bg-clip-text text-transparent'>Pdf Upload</h1>
            <div
              onDragOver={(e) => { e.preventDefault(); setOver(true); console.log(over); }}
              onDragLeave={(e) => { e.preventDefault(); setOver(false); console.log(over); }}
              onDrop={(e) => { e.preventDefault(); console.log("check"); setFile(e.dataTransfer.files[0]); }}
              className={`border-4 rounded-xl border-dashed border-[#59C173] w-[80%] h-80 mb-9 flex flex-col justify-center items-center bg-opacity-20 backdrop-blur-lg ${over ? "bg-white" : "bg-black"}`}
            >
              <img
                src={file === null ? 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/upload-cloud-icon.png' : pdfImg}
                className='h-14 mb-5'
                alt='Upload Icon'
              />
              <form className="space-y-4 flex flex-col">
                <input type="file" onChange={handleFileChange} hidden ref={btnRef} />
                <motion.button variants={btnVarient} whileHover="" type="button" onClick={() => btnRef.current.click()} className="w-44 bg-[#59C173] text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-opacity-50">
                  Upload a File
                </motion.button>
              </form>
            </div>
            {file && <motion.button variants={btnVarient} onClick={handleUpload} animate="visible" whileHover="over" type="submit" className="w-44 bg-[#59C173] text-white py-2 px-4 mt-5 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-opacity-50">
              Submit
            </motion.button>}
          </motion.div>
       
          <div className='w-[35%] flex flex-col justify-center items-center pr-10 pb-10 bg-black bg-opacity-30 rounded-xl'>
            <h1 className='text-white text-2xl mt-10'>Previously used</h1>
            <div className='w-[100%] flex flex-wrap flex-col p-10'>
              {history.map((name, index) => (
                <div key={index} onClick={handleHistory} className='bg-[#59C173] w-[100%] flex justify-center text-white py-2 px-4 m-2 rounded-md h-12'>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>}
      {Error && <div className='h-screen bg-gradient-to-r from-[#381C59] to-[#3E187A] flex justify-center items-center font-bold overflow-y-hidden'><p className='text-[vh]'>Something Went Wrong</p></div>}
    </>
  );
}

export default Upload;
