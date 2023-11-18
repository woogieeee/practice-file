import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from './component/Login.1';
import Search from './component/Search'; 
import Library from "./pages/Library";
import Social from './component/Social'; 

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} /> 
          <Route path="/Library" element={<Library />} />
          <Route path="/Social" element={<Social />} /> 
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
