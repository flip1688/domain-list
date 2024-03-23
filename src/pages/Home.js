import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { fetchDomains } from "../features/api/domainAPI";
import { FormGroup } from "@mui/material";

const Home = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const { userAuth } = useSelector((state) => state.auth);
  const [paramsDomain, setParamsDomain] = useState({
    name: "",
    status: "all",
    page: 1,
    pageSize: 30,
    domainId: "", // เพิ่ม domainId เข้าไปใน params
  });

  useEffect(() => {
    const fetchData = async () => {
      const domainsData = await fetchDomains(paramsDomain, userAuth);
      setDomains(domainsData.data);
    };
    fetchData();
  }, [paramsDomain, userAuth]);

  const handleSelectDomain = (event) => {
    const selectedName = event.target.value;
    const selectedDomain = domains.find(
      (domain) => domain.name === selectedName
    );
    if (selectedDomain) {
      setSelectedDomainId(selectedName);
    }
  };

  const handleSearchDomain = () => {
    window.location.href = `/domain?name=${selectedDomainId}`;
  };

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
          <div className="col-12 col-lg-9 text-center d-flex justify-content-center">
            <FormGroup className="w-75 text-center">
              <h1>Welcome To Domain List</h1>
              <div className="input-group input-group-lg my-2">
                <input
                  name="container_number"
                  list="domain-list"
                  className="form-control"
                  aria-labell="Large"
                  placeholder="ใส่ชื่อ Domain หรือ เลือก"
                  style={{
                    backgroundImage:
                      'url(\'data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3e%3cpath fill="white" stroke="%23343a40" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 5l6 6 6-6"/%3e%3c/svg%3e\')',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right .75rem center",
                    backgroundSize: "32px 32px",
                  }}
                  value={selectedDomainId} // ใช้ค่า selectedDomainId แทน value
                  onChange={(event) => setSelectedDomainId(event.target.value)}
                  onClick={(event) => event.target.select()}
                />
              </div>
              <datalist id="domain-list">
                {domains.map((domain) =>
                  domain.status !== "blocked" ? (
                    <option key={domain.id} value={domain.name}>
                      {domain.name}
                    </option>
                  ) : null
                )}
              </datalist>
              <input type="hidden" name="domainId" value={selectedDomainId} />
              <button
                type="button"
                class="btn btn-secondary btn-lg btn-block"
                onClick={handleSearchDomain}
              >
                Search Domain
              </button>
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
