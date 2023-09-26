import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/search-results" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
