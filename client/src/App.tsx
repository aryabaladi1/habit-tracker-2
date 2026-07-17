import { Route, Routes,Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppLayout from './AppLayout';
import ProfilePage from './pages/ProfilePage';
import HabitsPage from './pages/HabitsPage';
import TasksPage from './pages/TasksPage';

import { useAuth } from './context/AuthContext';
import WeekPage from './pages/WeekPage';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/" replace /> : <LoginPage /> }/>
        <Route path="/register" element={ isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage /> }/>

        <Route
          element={
            isAuthenticated
              ? <AppLayout />
              : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<WeekPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
