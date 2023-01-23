import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import MainBody from './components/MainBody';

function App() {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <MainBody/>
      </div>
    </div>
  );
}

export default App;
