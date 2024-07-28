import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({data,emotion}) => {
  const audioRef = useRef(null);
  const currentContextRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const context = data;
  const colors = {
    "fear": "text-[#A9A9A9]",
    "joy": "text-[#FFFF00]",
    "disgust": "text-[#32CD32]",
    "sadness": "text-[#00BFFF]",
    "surprise":"text-[#FF4500]",
    "neutral":"text-[#87CEFA]",
    "angry":"text-[#FF6347]"
  };
  
  const Wcolors = {
    "fear": "bg-[#A9A9A9]",
    "happy": "bg-[#FFFF00]",
    "disgust": "bg-[#32CD32]",
    "sadness": "bg-[#00BFFF]",
    "surprise":"bg-[#FF4500]",
    "neutral":"bg-[#87CEFA]",
    "angry":"bg-[#FF6347]"
  };
  
  const emotionWords = emotion;

  const getCurrentContext = () => {
    const keys = Object.keys(context).map(Number).filter(time => time <= currentTime);
    if (keys.length === 0) return context[Math.min(...Object.keys(context).map(Number))];
    const nearestTime = Math.max(...keys);
    return context[nearestTime];
  };

  const currentContext = getCurrentContext();
  const allWords = Object.values(context).map(ctx => ctx.words).join(' ');

  useEffect(() => {
    if (currentContextRef.current && isPlaying) {
      currentContextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentContext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <>
      <div className={`w-[100%] min-h-screen flex flex-col items-center p-4 bg-white bg-opacity-10 rounded-lg shadow-lg mt-10`}>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={"http://localhost:5000/static/result.wav"} />
        <div className="flex items-center">
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 mt-2 text-white bg-[#59C173] rounded hover:bg-opacity-65"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="relative ml-4 mt-2">
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="px-4 py-2 text-white bg-[#59C173] rounded hover:bg-opacity-65"
            >
              <option className="bg-[#59C173]" value="0.5">0.5x</option>
              <option className="bg-[#59C173]" value="1">1x</option>
              <option className="bg-[#59C173]" value="1.5">1.5x</option>
              <option className="bg-[#59C173]" value="2">2x</option>
            </select>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${(currentTime / audioRef.current?.duration) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-2">
          Current Time: {Math.floor(currentTime)}s
        </div>
        <div className='flex flex-col lg:flex-row justify-around w-full'>
          <div className={`w-full lg:w-[60%] h-[100%] bg-black bg-opacity-10 flex justify-center rounded-lg shadow-lg p-4 overflow-y-auto`}>
            {currentContext && (
              <div className="w-full h-full">
                <p className='font-semibold text-2xl text-white'>
                  {
                    allWords.split(new RegExp(`(${currentContext.words})`, 'gi')).map((part, index) => (
                      <span
                        key={index}
                        ref={part.toLowerCase() === currentContext.words.toLowerCase() ? currentContextRef : null}
                        className={`
                          ${
                          part.toLowerCase() === currentContext.words.toLowerCase()
                            ? colors[currentContext.emotion]
                            : 'text-white'
                        }`}
                      >
                        {part}
                      </span>
                    ))
                  }
                </p>
              </div>
            )}
          </div>
          <div className={`w-full lg:w-[30%] h-[90%] bg-black bg-opacity-10 flex flex-col justify-center rounded-lg shadow-lg p-4 mt-4 lg:mt-0 overflow-y-auto`}>
            <h1 className='text-xl text-white mb-5'>Emotional Words:</h1>
            <div className='w-[100%] flex flex-wrap justify-start items-start'>
              {emotionWords.length > 0 && (
                emotionWords.map((val, index) => (
                  <div key={index} className={`${Wcolors[val[1]]} text-black w-fit h-10 rounded-md p-4 flex items-center m-[1.5%]`}>
                    {val[0]}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
