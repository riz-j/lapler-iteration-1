import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProject from './pages/CreateProject';
import CreateIssue from './pages/CreateIssue';

function App() {  
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="dashboard/project/:projectId" element={ <Dashboard /> } />
        <Route path="project/new" element={ <CreateProject /> } />
        <Route path="dashboard/project/:projectId/issues/new" element={ <CreateIssue /> } />
      </Routes>
    </div>
  )
}

export default App
