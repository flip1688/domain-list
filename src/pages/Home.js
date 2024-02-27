import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { auth } = useAuth();

  const username = auth ? auth.username : null;

  console.log(auth)

  return (
    <div>
        <p>You are logged in as: {username}</p>
      <Link to="/logout" className="btn btn-primary">Logout</Link>
    </div>
  );
};

export default Home;
