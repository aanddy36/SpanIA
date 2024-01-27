import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./sections/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ReserveClass } from "./pages/ReserveClass";
import { UserProfile } from "./pages/UserProfile";
import { AdminLayout } from "./sections/AdminLayout";
import { AdminHome } from "./pages/AdminHome";
import { AdminClasses } from "./pages/AdminClasses";
import { AdminStudents } from "./pages/AdminStudents";
import { AdminSettings } from "./pages/AdminSettings";
import { WrongPage } from "./pages/WrongPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reserve" element={<ReserveClass />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
