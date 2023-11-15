import React, { useState, useEffect, useRef } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import ModalForm from "../components/ModalForm";
import axios from "axios";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  useEffect(() => {
    // Retrieve userId from localStorage or wherever it's stored
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Make a GET request to the server to get user details based on userId
      axios
        .get(`http://localhost:3001/usersdetails/data/${userId}`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details: ", error);
          setDeleteButtonDisabled(true);
        });

      axios
        .get(`http://localhost:3001/auth/user/${userId}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user: ", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent the default page refresh behavior

    if (window.confirm("Are you sure you want to delete this record?")) {
      // User confirmed the deletion, proceed with DELETE request
      const userId = localStorage.getItem("userId");

      // Make a DELETE request to delete the UserDetails record
      axios
        .delete(`http://localhost:3001/usersdetails/data/${userId}`)
        .then((response) => {
          if (response.status === 204) {
            // If successfully deleted (status 204), set UserDetails to null and disable the delete button
            setUserDetails(null);
            setDeleteButtonDisabled(true);
          }
        })
        .catch((error) => {
          console.error("Error deleting user details: ", error);
        });
    }
  };

  const handleSubmissionSuccess = () => {
    // Close the modal
    setShowModal(false);

    // Refresh the page
    window.location.reload();
  };

  return (
    <>
      <section>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://t3.ftcdn.net/jpg/01/18/01/98/240_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">
                    {" "}
                    {user ? user.username : "-"}
                  </p>
                  <p className="text-muted mb-4"> {user ? user.email : "-"}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>

                    <MDBBtn
                      className="ms-1"
                      color="danger"
                      onClick={handleDeleteClick}
                      disabled={deleteButtonDisabled}
                    >
                      Delete
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted required">
                        {userDetails ? userDetails.fullname : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userDetails ? userDetails.address : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>NIC Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userDetails ? userDetails.nic : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Birthday</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userDetails ? userDetails.birthday : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        {userDetails ? userDetails.age : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile Number</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userDetails ? userDetails.mobile_number : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Service Provider</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {" "}
                        {userDetails ? userDetails.service_provider : "-"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {showModal && (
          <ModalForm
            userDetails={userDetails}
            onClose={() => setShowModal(false)}
            onSubmissionSuccess={handleSubmissionSuccess}
          />
        )}
      </section>
    </>
  );
}

export default ProfilePage;
