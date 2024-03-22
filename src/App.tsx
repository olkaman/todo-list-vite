import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationPage from './pages/AuthenticationPage';
import Header from './components-layout/Header';
import Container from './components-layout/Container';
import Register from './features/auth/Register';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Container>
      <>
        <div>
          <Header />
        </div>

        <div>
          <Routes>
            <Route path='todo-list-vite/' element={<AuthenticationPage />} />
            <Route path='todo-list-vite/register' element={<Register />} />
            <Route path='todo-list-vite/home' element={<HomePage />} />
          </Routes>
        </div>
      </>
    </Container>
  );
}

export default App;
