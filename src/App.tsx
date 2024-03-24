import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import Header from './components-layout/Header';
import Container from './components-layout/Container';
import Register from './features/auth/Register';
import HomePage from './pages/HomePage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import NotFound404Page from './components-layout/NotFound404Page';

function App() {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(true);
        navigate('/home');
        setIsLoading(false);
      } else {
        setCurrentUser(null);
        navigate('/');
        setIsLoading(false);
      }

      return () => subscribe();
    });
  }, []);
  console.log(currentUser);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container>
      <>
        <div>
          <Header />
        </div>

        <div>
          <Routes>
            <Route path='/' element={<AuthenticationPage />} />
            <Route path='register' element={<Register />} />
            <Route
              path='home'
              element={
                <ProtectedRoute user={currentUser}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404Page />} />
          </Routes>
        </div>
      </>
    </Container>
  );
}

export default App;
