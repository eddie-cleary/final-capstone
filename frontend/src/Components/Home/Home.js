import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      You must be authorized to see this page. <Link to="/">Home</Link>
    </div>
  );
};

export default Home;
