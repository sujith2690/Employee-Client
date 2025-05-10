import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './pages/Loading'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';


const Home = lazy(() => import('./pages/Home'))
const AddEmploy = lazy(() => import('./pages/AddEmploy'))
const Update = lazy(() => import('./pages/Update'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))

const App = () => {
  return (
    <div className=''>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ProtectedRoute  element={< Home />} />} />
          <Route path="/add" element={<ProtectedRoute  element={< AddEmploy />} />} />
          <Route path="/update/:id" element={<ProtectedRoute  element={< Update />} />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App