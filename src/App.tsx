import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import Register from './features/auth/Register';
import HomePage from './pages/HomePage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import NotFound404Page from './components-layout/PageNotFound';
import AuthContainer from './components-layout/AuthContainer';
import useAuthStore from './stores/authStore';

function App() {
  const isCurrentUser = useAuthStore((state) => state.isCurrentUser);

  return (
    <AuthContainer>
      <>
        <div>
          <Routes>
            <Route path='/' element={<AuthenticationPage />} />
            <Route path='register' element={<Register />} />
            <Route
              path='home'
              element={
                <ProtectedRoute user={isCurrentUser}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404Page />} />
          </Routes>
        </div>
      </>
    </AuthContainer>
  );
}

export default App;
