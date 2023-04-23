import { useSelector } from 'react-redux';
import LoggedInHomepage from '../components/homepage/LoggedInHomepage';
import VisitorHomepage from '../components/homepage/VisitorHomepage';
import EmptyDashboard from './Dashboard';

export default function Home() {
  const currentUser = useSelector(state => state.currentUser);

    return (
        <div>
          { currentUser.id === undefined || currentUser.id === null ? 
            <VisitorHomepage/>
            :
            <EmptyDashboard />
          }
        </div>
      );
}