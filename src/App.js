import { Routes, Route } from 'react-router-dom';
import Classroom from './pages/Classroom/Classroom';
import Subject from './pages/Subject/Subject';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<div />} />
        <Route path='/classrooms' exact element={<Classroom />} />
        <Route path='/classrooms/:id' exact element={<Subject />} />
        <Route path='/tasks' exact element={<div />} />
        <Route path='/notices' exact element={<div />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
