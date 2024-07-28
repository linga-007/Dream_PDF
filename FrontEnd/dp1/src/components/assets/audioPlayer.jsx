import React, { useRef, useState } from 'react';
import music from "../assets/harvard.wav";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const context = {
    0: {
      words: 'The meeting room was filled with a tense silence as John’s eyes narrowed, his face turning a shade of red. His voice, when he finally spoke, was a low growl that barely contained his fury. "I can\'t believe the audacity," he spat out, slamming his fist on the table. The betrayal by his closest ally was a stab in the back that he couldn\'t easily forgive...',
      emotion: "anger"
    },
    8: {
      words: "Emily sat by the window, gazing out at the rain-soaked street. Her heart felt heavy, weighed down by the loss of her beloved pet. The house felt unbearably empty without the sound of paws padding across the floor. A tear slid down her cheek as she clutched the collar, the only physical reminder of the happiness that once filled her days.",
      emotion: "sad"
    },
    12: {
      words: "The sun shone brightly on the lively park, where laughter echoed through the air. Children ran around, playing games, while families enjoyed picnics on the grass. Sarah couldn’t help but smile as she watched a group of friends dancing to a cheerful tune, their joy infectious. It was one of those perfect days where everything seemed to fall into place, and happiness was palpable in every corner.",
      emotion: "happy"
    },
  };

  const colors = {
    "anger": "text-red-500",
    "happy": "text-green-500",
    "sad": "text-blue-500"
  };
  
  const Wcolors = {
    "anger": "bg-red-500",
    "happy": "bg-green-500",
    "sad": "bg-blue-500"
  };
  
  const emotionWords = [
    ['hello', 'happy'],
    ['world', 'sad'],
    ['python', 'anger'],
    ['programming', 'happy'],
    ['chatgpt', 'sad']
  ];

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

  const getCurrentContext = () => {
    const keys = Object.keys(context).map(Number).filter(time => time <= currentTime);
    if (keys.length === 0) return context[Math.min(...Object.keys(context).map(Number))];
    const nearestTime = Math.max(...keys);
    return context[nearestTime];
  };

  const currentContext = getCurrentContext();
  const allWords = Object.values(context).map(ctx => ctx.words).join(' ');

  return (
    <>
      <div className={`w-[100%] min-h-screen flex flex-col items-center p-4 ${currentContext ? colors[currentContext.emotion] : 'bg-white'} bg-opacity-10 rounded-lg shadow-lg overflow-y-auto overflow-x-hidden`}>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={music} />
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 mt-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
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
                <p className='font-semibold text-5xl text-white'>
                  {
                    allWords.split(new RegExp(`(${currentContext.words})`, 'gi')).map((part, index) => (
                      <span
                        key={index}
                        className={`${
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
            <div className='w-[100%] flex flex-wrap justify-around'>
              {emotionWords.length > 0 && (
                emotionWords.map((val, index) => (
                  <div key={index} className={`${Wcolors[val[1]]} text-white w-fit h-10 rounded-full p-4 flex items-center m-[0.8%]`}>
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
