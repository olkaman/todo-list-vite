import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import ProtectedRoute from './features/auth/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import AuthContainer from './components-layout/AuthContainer'
import useUserStore from './stores/userStore'
import SignIn from './pages/SignIn'
import TodoPage from './pages/TodoPage'
import ResetPassword from './pages/ResetPassword'
import ResetConfirm from './pages/ResetConfirm'
import UserPage from './pages/UserPage'

function App() {
  const isCurrentUser = useUserStore((state) => state.isCurrentUser)

  return (
    <AuthContainer>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='register' element={<Register />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='reset-confirmation' element={<ResetConfirm />} />
        <Route
          path='home'
          element={
            <ProtectedRoute user={isCurrentUser}>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route path=':listKey' element={<TodoPage />} />
        </Route>
        <Route
          path='user-page'
          element={
            <ProtectedRoute user={isCurrentUser}>
              <UserPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </AuthContainer>
  )
}

export default App
