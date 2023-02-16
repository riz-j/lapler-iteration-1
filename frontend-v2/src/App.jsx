import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProject from './pages/CreateProject';
import CreateIssue from './pages/CreateIssue';
import UpdateIssue from './pages/UpdateIssue';
import AddUserToProject from './pages/AddUserToProject';
import Register from './pages/Register';

function App() {  
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="project/new" element={ <CreateProject /> } />
        <Route path="dashboard/project/:projectId" element={ <Dashboard /> } />
        <Route path="dashboard/project/:projectId/issues/new" element={ <CreateIssue /> } />
        <Route path="dashboard/project/:projectId/issues/:issueId/update" element={ <UpdateIssue /> } />
        <Route path="dashboard/project/:projectId/users/add" element={ <AddUserToProject /> } />
      </Routes>
    </div>
  )
}

export default App
