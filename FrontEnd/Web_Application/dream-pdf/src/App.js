import Header from './components/header';
import { Route, Routes } from "react-router-dom";
import Home from './components/home';
import View  from './components/view';
import Upload from './components/upload';
import { useState } from 'react';
function App() {
  const [data,setData] = useState({})
  const [emotion,setEmotion] = useState([])


  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View data={data} emotion={emotion}/>} />
        <Route path="/upload" element={<Upload setData={setData} setEmotion={setEmotion}/>} />
      </Routes>
    </>
  );
}

export default App;
