import { Route, Routes,Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

import { useAuth } from './context/AuthContext';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage /> }/>
        <Route path="/register" element={ isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage /> }/>

        <Route path="/dashboard" element={ isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace /> }/>
        <Route path="/profile" element={ isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace /> }/>
      </Routes>
    </div>
  );
}

export default App;
