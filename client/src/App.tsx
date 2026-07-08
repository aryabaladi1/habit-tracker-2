import { Route, Routes,Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HabitsPage from './pages/HabitsPage';
import TasksPage from './pages/TasksPage';
import WeeksPage from './pages/WeeksPage';

import { useAuth } from './context/AuthContext';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/" replace /> : <LoginPage /> }/>
        <Route path="/register" element={ isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage /> }/>

        <Route path="/" element={ isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace /> }/>
        <Route path="/profile" element={ isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace /> }/>
        <Route path="/habits" element={ isAuthenticated ? <HabitsPage /> : <Navigate to="/login" replace /> }/>
        <Route path="/tasks" element={ isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace /> }/>
        <Route path="/weeks" element={ isAuthenticated ? <WeeksPage  /> : <Navigate to="/login" replace /> }/>
      </Routes>
    </div>
  );
}

export default App;
