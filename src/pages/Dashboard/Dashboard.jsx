import { useAuthentication } from "hooks/useAuthentication";
import './dashboard.scss';

const Dashboard = () => {
  const { auth } = useAuthentication();
  const user = auth.currentUser;

  return (
    <div className="dash">
      <h2 className='text-center'>Olá, <span >{user.displayName}</span></h2>
    </div>
  )
}

export default Dashboard;