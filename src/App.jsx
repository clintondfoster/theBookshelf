import AllBooks from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import {Route, Routes} from "react-router-dom";



function App() {

  return (
    <div className="App">
    <Routes>
      <Route path={"/home"} element={<AllBooks/>}/>
      <Route path={"/book/:id"} element={<SingleBook/>}/>
    </Routes>
    </div>
  );
}

export default App;
