import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import AuthContainer from './components-layout/AuthContainer';
import useAuthStore from './stores/authStore';
import SignIn from './pages/SignIn';
import TodoPage from './pages/TodoPage';

function App() {
  const isCurrentUser = useAuthStore((state) => state.isCurrentUser);

  return (
    <AuthContainer>
      <>
        <div>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='register' element={<Register />} />
            <Route
              path='home'
              element={
                <ProtectedRoute user={isCurrentUser}>
                  <HomePage />
                </ProtectedRoute>
              }
            >
              <Route path=':listId' element={<TodoPage />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </>
    </AuthContainer>
  );
}

export default App;
