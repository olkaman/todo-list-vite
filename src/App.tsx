import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import ProtectedRoute from './features/auth/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import AuthContainer from './components-layout/AuthContainer'
import useUserStore, { useIsDarkModeOn } from './stores/userStore'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import ResetConfirm from './pages/ResetConfirm'
import UserPage from './pages/UserPage'
import { Toaster } from 'sonner'
import clsx from 'clsx'
import { CircleCheck, CircleX } from 'lucide-react'
import Board from './pages/Board'
import TodosPage from './pages/TodosPage'

function App() {
  const isCurrentUser = useUserStore((state) => state.isCurrentUser)
  const isDarkMode = useIsDarkModeOn()

  return (
    <AuthContainer>
      <>
        <Routes>
          <Route path='/' element={isCurrentUser ? <HomePage /> : <SignIn />} />
          <Route path='reset-password' element={<Board />} />
          <Route path='register' element={<Register />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='reset-confirmation' element={<ResetConfirm />} />
          <Route
            path='/'
            element={
              <ProtectedRoute user={isCurrentUser}>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path=':listKey'
            element={
              <ProtectedRoute user={isCurrentUser}>
                <TodosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=':listKey/kanbanBoard'
            element={
              <ProtectedRoute user={isCurrentUser}>
                <Board />
              </ProtectedRoute>
            }
          />
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
        <Toaster
          position='top-center'
          icons={{
            success: <CircleCheck color={isDarkMode ? '#fff' : '#333'} strokeWidth={1.5} size={24} />,
            error: <CircleX color={isDarkMode ? '#fff' : '#333'} strokeWidth={1.5} size={24} />,
          }}
          toastOptions={{
            unstyled: true,
            duration: 2000,
            classNames: {
              toast: 'px-6 py-4 border-0 rounded-md border-l-2 min-w-80 flex items-center shadow-xl',
              title: clsx(isDarkMode ? 'text-darkMode-text' : 'text-lightMode-text', 'font-sans font-normal ml-3'),
              success: clsx(isDarkMode ? 'bg-darkMode-grayDark' : 'bg-lightMode-white', 'border-l-accent'),
              error: clsx(isDarkMode ? 'bg-darkMode-grayDark' : 'bg-lightMode-white', 'border-l-warning'),
            },
          }}
        />
      </>
    </AuthContainer>
  )
}

export default App
