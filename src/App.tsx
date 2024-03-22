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
            <Route path='/' element={<AuthenticationPage />} />
            <Route path='register' element={<Register />} />
            <Route path='home' element={<HomePage />} />
          </Routes>
        </div>
      </>
    </Container>
  );
}

export default App;
