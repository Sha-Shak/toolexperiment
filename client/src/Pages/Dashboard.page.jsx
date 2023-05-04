import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/Navbar.component";
import { checkInstructorRole } from "../Services/roleCheck.service";

function DashboardPage() {
  const navigate = useNavigate();

  async function checkInstructor() {
    try {
      const isInstructor = await checkInstructorRole();
      if (isInstructor) logout();
    } catch (error) {
      logout();
    }
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    checkInstructor();
  }, []);

  return (
    <div className="grow overflow-y-auto">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}

export default DashboardPage;
