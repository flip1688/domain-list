import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-body-tertiary">
          <Header />
        </div>
        <div className="row">
          <div className="d-none d-lg-block col-lg-2 bg-body-tertiary">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-9">
           <h1>Welcome To Domain List</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
