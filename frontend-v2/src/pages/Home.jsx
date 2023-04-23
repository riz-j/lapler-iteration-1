import { useSelector } from 'react-redux';
import LoggedInHomepage from '../components/homepage/LoggedInHomepage';
import VisitorHomepage from '../components/homepage/VisitorHomepage';
import EmptyDashboard from './EmptyDashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);
  // const projects = currentUser.projects
  // const firstKey = Object.keys(projects)[0];  // get the first key
  // const firstId = projects[firstKey].id;  // access the id of the first element

  // useEffect(() => {
  //   if (Object.keys(currentUser).length > 0) {
  //     navigate(`dashboard/project/${firstId}`);
  //   } 
  // }, [])

  if (!currentUser.id) {
    return <VisitorHomepage />;
  }

  return <EmptyDashboard />;

    // return (
    //     <div>
    //       { currentUser.id === undefined || currentUser.id === null ? 
    //         <VisitorHomepage/>
    //         :
    //         <EmptyDashboard />
    //       }
    //     </div>
    //   );
}