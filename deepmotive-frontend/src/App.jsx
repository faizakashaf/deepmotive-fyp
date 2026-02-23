//src/App.jsx

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { HabitsProvider } from "./context/HabitsContext";
import { DarkModeProvider } from "./context/DarkModeContext";

import Sidebar from "./components/Sidebar";
import HeaderTemp from "./components/HeaderTemp";

import HabitDashboard from "./pages/HabitDashboard";
import HabitSetup from "./pages/HabitSetup";
import Analytics from "./pages/Analytics";
import AICoach from "./pages/AICoach";
import Challenges from "./pages/Challenges";
import ReflectionJournal from "./pages/ReflectionJournal";
import StreakTracker from "./pages/StreakTracker";

import DeepMotiveLanding from "./components/landing/DeepMotiveLanding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const ProtectedLayout = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to='/login' />;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content wrapper - shifts when sidebar opens on desktop */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <HeaderTemp
          setIsAuthenticated={setIsAuthenticated}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className='p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <DarkModeProvider>
      <HabitsProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Landing Page */}
            <Route
              path='/'
              element={
                isAuthenticated ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <DeepMotiveLanding />
                )
              }
            />

            {/* Login Page */}
            <Route
              path='/login'
              element={
                isAuthenticated ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* Signup Page */}
            <Route
              path='/signup'
              element={
                isAuthenticated ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedLayout
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path='/dashboard' element={<HabitDashboard />} />
              <Route path='/setup' element={<HabitSetup />} />
              <Route path='/analytics' element={<Analytics />} />
              <Route path='/ai-coach' element={<AICoach />} />
              <Route path='/challenges' element={<Challenges />} />
              <Route path='/journal' element={<ReflectionJournal />} />
              <Route path='/streak' element={<StreakTracker />} />
            </Route>

            {/* Fallback */}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
      </HabitsProvider>
    </DarkModeProvider>
  );
}

export default App;
