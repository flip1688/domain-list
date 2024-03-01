import { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { fetchDomains } from "../features/api/domainAPI";

const Domains = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [domains, setDomain] = useState([]);

  useEffect(() => {
    const getDomains = async () => {
      setIsLoading(true);
      const domainsData = await fetchDomains(userAuth);
      setDomain(domainsData);
      setIsLoading(false);
    };
    getDomains();
  }, [fetchDomains]);

  return (
    <>
      <Header />
      <div className="container" style={{ textAlign: "-webkit-center" }}>
        <div className="text-end">
          <button className="btn btn-sm btn-dark my-2">+ Create Domain</button>
        </div>
        {/* Show loading indicator */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>หมายเหตุ</th>
              <th>amount</th>
              <th>status</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={6}>
                  <div className="spinner-grow" role="status"></div>
                </td>
              </tr>
            )}

            {domains &&
              domains.map((domain, index) => (
                <tr key={domain.id}>
                  <td>{index + 1}</td>
                  <td>{domain.name}</td>
                  <td>{domain.remarks}</td>
                  <td>{domain.amount}</td>
                  <td>{domain.status}</td>
                  <td>
                    <button className="btn btn-sm btn-dark mx-1">
                      Edit Name
                    </button>
                    <button className="btn btn-sm btn-dark mx-1">
                      Edit Amount
                    </button>
                    <button className="btn btn-sm btn-dark mx-1">
                      Edit Remarks
                    </button>
                    <button className="btn btn-sm btn-dark mx-1">
                      Edit Status
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Domains;
