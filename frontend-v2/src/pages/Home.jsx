import { useSelector } from 'react-redux';
import VisitorHomepage from '../components/homepage/VisitorHomepage';
import EmptyDashboard from './EmptyDashboard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser);

    if (!currentUser.id) {
      return <VisitorHomepage />;
    }

    return <EmptyDashboard />;
}