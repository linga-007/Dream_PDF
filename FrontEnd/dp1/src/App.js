import Header from './components/header';
import { Route, Routes } from "react-router-dom";
import Home from './components/home';
import View  from './components/view';
import Upload from './components/upload';
import T from './components/t'
function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/test" element={<T />} />
      </Routes>
    </>
  );
}

export default App;
