import React from 'react'
import { Link } from 'react-router-dom'
import Header from './header'
import { motion } from 'framer-motion'

function Home() {

  const parentVarient ={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{
        duration:0.50,delay:0.15,
        when:"beforeChildren",
        staggerChildren:0.5
      }
    }
  }

  const childVarient={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{
        duration:0.75,delay:0.5
      }
    }
  }
  
  const btnVarient ={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{
        duration:0.75,delay:1.5
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
      <motion.div  className='w-screen h-screen flex justify-end items-center relative overflow-hidden pr-20 bg-[url("/t2.jpg")] bg-cover'>
        {/* <video
          src={videobg}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        /> */}
        <motion.div variants={parentVarient}   initial="hidden" animate="visible" className="w-[40%] flex flex-col items-start absolute ml-5 top-[40vh] transform -translate-y-1/2">
          <motion.h1 variants={parentVarient}   className='text-[7vw] font-bold bg-gradient-to-r from-[#59C173] via-[#a17fe0] to-[#5D26C1] text-transparent bg-clip-text '>Dream PDF</motion.h1>
          <motion.p  variants={childVarient}  className='text-[1vw] text-wrap w-[80%] opacity-50 font-semibold text-[#a17fe0]'>

          DreamPDF is a revolutionary app that enhances the reading experience of PDF documents. Users can easily upload PDFs, and the app identifies people, places, and emotional words within the text. These emotions are highlighted and reflected in the voice modulation during narration, making the reading lively and engaging. Combining advanced technology with a user-friendly design, DreamPDF offers a unique, immersive way to read and interact with PDF documents. ✨
          </motion.p>
          <Link to="/upload">
          <motion.button variants={btnVarient}  initial="hidden" animate="visible" whileHover="over" className="rounded-[50px] bg-[#59C173] border-[#a17fe0] border-[1px] p-2 w-32 mt-4 text-[1em] font-semibold">Get Started</motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
    </>

  )
}

export default Home
