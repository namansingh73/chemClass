import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainContainer from './layout/MainContainer/MainContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import MiscSidebar from './components/MiscSidebar/MiscSidebar';
import Classroom from './pages/Classroom/Classroom';
import Subject from './pages/Subject/Subject';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MainContainer>
        <Sidebar />
        <Main>
          <Routes>
            <Route path='/' exact element={<div />} />
            <Route path='/classrooms' exact element={<Classroom />} />
            <Route path='/classrooms/:id' exact element={<Subject />} />
            <Route path='/tasks' exact element={<div />} />
            <Route path='/notices' exact element={<div />} />
          </Routes>
        </Main>
        <MiscSidebar />
      </MainContainer>
    </div>
  );
};

export default App;
