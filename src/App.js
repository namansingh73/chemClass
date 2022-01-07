import './App.css';
import Navbar from './components/Navbar/Navbar';
import MainContainer from './layout/MainContainer/MainContainer';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './layout/Main/Main';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MainContainer>
        <Sidebar />
        <Main />
        <div></div>
      </MainContainer>
    </div>
  );
};

export default App;
