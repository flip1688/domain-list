import Header from "./Header";

const ChangeOwnPass = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <div className="container overflow-auto" style={{textAlign:"-webkit-center"}}>
        {user && (
          <div className="card mt-2" style={{ width: "1024px"}}>
            <div className="card-header bg-secondary">
              <strong className="text-white">My Profile</strong>
            </div>
            <div className="card-body p-0 overflow-auto">
              <table className="table table-striped my-0" style={{whiteSpace:"nowrap"}}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>role</td>
                    <td>{user.role}</td>
                  </tr>
                  <tr>
                    <td>status</td>
                    <td>{user.status}</td>
                  </tr>
                  <tr>
                    <td>createdBy</td>
                    <td>{user.createdBy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeOwnPass;
