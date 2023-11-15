import React from "react";
import UsersTable from "../components/UsersTable";
import Charts from "../components/Charts";
import { MDBContainer } from "mdb-react-ui-kit";

function DashboardPage() {
  return (
    <>
      <div className="mx-4 my-4" style={{ overflowX: "auto" }}>
        <MDBContainer>
          <Charts />
          <UsersTable />
        </MDBContainer>
      </div>
    </>
  );
}

export default DashboardPage;
