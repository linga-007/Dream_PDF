// src/view.js
import React from 'react';
import Header from './header';
import AudioPlayer from './assets/audioPlayer';

function View() {
  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-r from-[#381C59] to-[#3E187A] flex flex-col justify-center items-center overflow-x-hidden">
        <Header />
        <div className='flex-grow mt-[10vh]  max-w-full overflow-hidden'>
          <AudioPlayer />
        </div>
      </div>
    </>
  );
}

export default View;
