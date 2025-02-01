import {BrowserRouter, Route, Routes} from "react-router-dom";
import GlobalContext from "./contexts/GlobalContext";

/*PAGES*/
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";

/*LAYOUTS*/
import Default from "./layouts/Default";
import Blank from "./layouts/Blank";


function App() {

  return (
    <GlobalContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route element={<Default />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<Blank />}>
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
