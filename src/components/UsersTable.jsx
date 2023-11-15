import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";
import * as XLSX from "xlsx";

function UsersTable() {
  const [tableDetails, setTableDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/combined/all")
      .then((response) => {
        setTableDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details: ", error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Handle delete button click. You can make a DELETE request to delete the user.
    axios
      .delete(`http://localhost:3001/auth/user/${userId}`)
      .then((response) => {
        // After successful deletion, you may want to refresh the user details.
        // You can re-fetch the data or update the state to remove the deleted user.
        const updatedTableDetails = tableDetails.filter(
          (user) => user.userid !== userId
        );
        setTableDetails(updatedTableDetails);
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Flatten the data
    const flattenedData = tableDetails.map((user) => ({
      userid: user.userid,
      username: user.username,
      email: user.email,
      ...user.UsersDetail, // Spread the nested data
    }));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "CombinedData");
    XLSX.writeFile(workbook, "combined_data.xlsx");
  };

  return (
    <MDBContainer>
      <MDBRow end>
        <MDBCol>
          <MDBBtn size="sm" className="" onClick={exportToExcel}>
            Export to Excel
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBTable responsive>
        <MDBTableHead light>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">email</th>
            <th scope="col">fullname</th>
            <th scope="col">address</th>
            <th scope="col">NIC</th>
            <th scope="col">Age</th>
            <th scope="col">Birthday</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {tableDetails.map((user, index) => (
            <tr key={user.userid}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.UsersDetail ? user.UsersDetail.fullname : "-"}</td>
              <td>{user.UsersDetail ? user.UsersDetail.address : "-"}</td>
              <td>{user.UsersDetail ? user.UsersDetail.nic : "-"}</td>
              <td>{user.UsersDetail ? user.UsersDetail.age : "-"}</td>
              <td>{user.UsersDetail ? user.UsersDetail.birthday : "-"}</td>
              <td>{user.UsersDetail ? user.UsersDetail.gender : "-"}</td>
              <td>
                <MDBBtn
                  size="sm"
                  color="danger"
                  onClick={() => handleDelete(user.userid)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default UsersTable;
