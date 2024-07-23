import { HashRouter as Router, Routes, Route } from "react-router-dom";

import {
  LandingPage,
  Login,
  Register,
  Unauthorized,
  UserProfile,
  About,
  MyProfile
} from './pages'
import AuthorizedRoutes from "utils/AuthorizedRoutes";
import { AuthProvider } from "context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />      

          {/* Public Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} /> {/* About Page */}
          

          <Route element={<AuthorizedRoutes />}>
            <Route path="/my-profile/" element={<MyProfile />} />
            <Route path="/user/:userid" element={<UserProfile />} />
          </Route>

          {/* 404 - Page Not Found */}
          <Route path="*" element={<Unauthorized />} />

        </Routes>      
      </Router>
    </AuthProvider>
  );
}

export default App;
