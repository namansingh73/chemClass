import './App.css';
import Navbar from './components/Navbar/Navbar';
import MainContainer from './layout/MainContainer/MainContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './layout/Main/Main';
import MiscSidebar from './components/MiscSidebar/MiscSidebar';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MainContainer>
        <Sidebar />
        <Main />
        <MiscSidebar />
      </MainContainer>
    </div>
  );
};

export default App;
