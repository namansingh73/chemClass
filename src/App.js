import './App.css';
import Navbar from './components/Navbar/Navbar';
import MainConatiner from './layout/MainContainer/MainConatiner';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './layout/Main/Main';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <MainConatiner>
        <Sidebar />
        <Main />
        <div></div>
      </MainConatiner>
    </div>
  );
};

export default App;
