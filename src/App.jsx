import List from "./Component/list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Navbar";
import UserProfile from "./Component/profile";
import EnrollmentList from "./Component/EnrollList";

function App() {
  return (
     <Router>
       <NavigationBar/>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/enrolled" element={<EnrollmentList />} />
      </Routes>
    </Router>
  );
}
export default App;