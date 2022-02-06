import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Main from './layout/Main/Main';
import Profile from './pages/Profile/Profile';
import Classroom from './pages/Classroom/Classroom';
import Subject from './pages/Subject/Subject';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Alert from './components/Alert/Alert';
import Error from './components/Error/Error';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<Navigate to='/classrooms' />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/resetPassword/:token' exact element={<ResetPassword />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        >
          <Route path='/' exact element={<div />} />
          <Route path='/me' exact element={<Profile />} />
          <Route path='/classrooms' exact element={<Classroom />} />
          <Route
            path='/classrooms/archived'
            exact
            element={<Classroom archived />}
          />
          <Route path='/classrooms/:id/:imageCnt' exact element={<Subject />} />
          <Route path='*' element={<Error />}></Route>
        </Route>
      </Routes>

      <Alert
        icon='fas fa-thumbs-up'
        heading='Success'
        info='Signed up succesfully!'
      />
    </div>
  );
};

export default App;
