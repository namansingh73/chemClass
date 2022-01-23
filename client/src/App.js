import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Main from './layout/Main/Main';
import Classroom from './pages/Classroom/Classroom';
import Subject from './pages/Subject/Subject';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import Alert from './components/Alert/Alert';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/' element={<Main />}>
          <Route path='/' exact element={<div />} />
          <Route path='/me' exact element={<Profile />} />
          <Route path='/classrooms' exact element={<Classroom />} />
          <Route path='/classrooms/:id' exact element={<Subject />} />
          <Route path='/tasks' exact element={<div />} />
          <Route path='/notices' exact element={<div />} />
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
