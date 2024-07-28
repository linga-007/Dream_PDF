import React from 'react';
import { motion } from 'framer-motion';



function Header() {

  const headerVarient = {
    hidden:{
      top:-100
    },
    visible:{
      top:2,
      transition:{
        type:"spring",
        damping:10
      }
    }
  }

  return (
    <>
      <motion.div variants={headerVarient} initial="hidden" animate="visible" className=" w-screen overflow-x-hidden absolute flex flex-col justify-center items-center  bg-transparent">
        <h1 className="self-start ml-10 my-5 font-bold text-[1vw] text-[#a17fe0]">DREAM PDF</h1>
        <hr className=" w-[95%] border-t-2 border-[#59C173]" />
      </motion.div>
    </>
  );
}

export default Header;
