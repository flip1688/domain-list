import Header from "./Header";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className="container" style={{textAlign:"-webkit-center"}}>
        {user && (
          <div class="card mt-2" style={{ width: "1024px"}}>
            <div class="card-header bg-secondary">
              <strong className="text-white">My Profile</strong>
            </div>
            <div class="card-body p-0 overflow-auto">
              <table class="table table-striped my-0">
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

export default MyProfile;
