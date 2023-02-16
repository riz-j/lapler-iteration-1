import { useSelector } from "react-redux";
import LoggedInHomepage from "../components/homepage/LoggedInHomepage";
import VisitorHomepage from "../components/homepage/VisitorHomepage";

export default function Home() {
  const currentUser = useSelector(state => state.currentUser);

    return (
        <div>
          { Object.keys(currentUser).length === 0 ? 
            <VisitorHomepage/>
            :
            <LoggedInHomepage/>
          }
        </div>
      );
}