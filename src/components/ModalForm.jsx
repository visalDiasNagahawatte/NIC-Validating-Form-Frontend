import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBValidationItem,
  MDBValidation,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import axios from "axios";

function ModalForm({ onClose, onSubmissionSuccess, userDetails }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [nicError, setNicError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  //getting userid
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/usersdetails/data/${userId}`)
        .then((response) => {
          const userDetails = response.data;

          if (userDetails) {
            setFullName(userDetails.fullname);
            setAddress(userDetails.address);
            setNIC(userDetails.nic);
            setGender(userDetails.gender);
            setAge(userDetails.age);
            setBirthday(userDetails.birthday);
            setMobileNumber(userDetails.mobile_number);
            setServiceProvider(userDetails.service_provider);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [userId]);

  const handleNICChange = (e) => {
    const newNIC = e.target.value;
    setNIC(newNIC);

    // Clear existing details
    setGender("");
    setAge("");
    setBirthday("");

    // Implement NIC logic here and update gender, age, and birthday
    const NICNo = newNIC.trim();
    let dayText = parseInt(NICNo.substr(NICNo.length === 10 ? 2 : 4, 3));
    let extractedYear = NICNo.substr(0, NICNo.length === 10 ? 2 : 4);
    let extractedGender = "";
    let extractedMonth = "";
    let extractedDay = "";

    if (NICNo.length !== 10 && NICNo.length !== 12) {
      setNicError("Invalid NIC number!");
      return;
    } else if (NICNo.length === 10 && !/^\d+$/.test(NICNo.substr(0, 9))) {
      setNicError("Invalid NIC number!");

      return;
    } else {
      // Year
      if (NICNo.length === 10) {
        extractedYear = "19" + extractedYear;
        setNicError(null);
      }

      // Gender
      if (dayText > 500) {
        extractedGender = "Female";
        dayText -= 500;
      } else {
        extractedGender = "Male";
      }

      // Day Digit Validation
      if (dayText < 1 || dayText > 366) {
        setNicError("Invalid NIC number!");

        return;
      } else {
        setNicError(null);
        // Month and Day

        if (dayText > 335) {
          extractedDay = dayText - 335;
          extractedMonth = "December";
        } else if (dayText > 305) {
          extractedDay = dayText - 305;
          extractedMonth = "November";
        } else if (dayText > 274) {
          extractedDay = dayText - 274;
          extractedMonth = "October";
        } else if (dayText > 244) {
          extractedDay = dayText - 244;
          extractedMonth = "September";
        } else if (dayText > 213) {
          extractedDay = dayText - 213;
          extractedMonth = "August";
        } else if (dayText > 182) {
          extractedDay = dayText - 182;
          extractedMonth = "July";
        } else if (dayText > 152) {
          extractedDay = dayText - 152;
          extractedMonth = "June";
        } else if (dayText > 121) {
          extractedDay = dayText - 121;
          extractedMonth = "May";
        } else if (dayText > 91) {
          extractedDay = dayText - 91;
          extractedMonth = "April";
        } else if (dayText > 60) {
          extractedDay = dayText - 60;
          extractedMonth = "March";
        } else if (dayText < 32) {
          extractedDay = "January";
          extractedMonth = dayText;
        } else if (dayText > 31) {
          extractedDay = dayText - 31;
          extractedMonth = "Febuary";
        }

        // Set extracted NIC details
        setGender(extractedGender);
        setAge(new Date().getFullYear() - parseInt(extractedYear));
        setBirthday(extractedYear + "-" + extractedMonth + "-" + extractedDay);
      }
    }
  };

  const handleMobileNumberChange = (e) => {
    const newMobileNumber = e.target.value;
    setMobileNumber(newMobileNumber);

    // Validate if the mobile number contains only 9 numeric values
    if (!/^\d{9}$/.test(newMobileNumber)) {
      setMobileError("Invalid Number");
      setServiceProvider("");
      return;
    } else {
      setMobileError(null);

      // Implement mobile number logic to update the service provider
      const serviceProviderCode = parseInt(newMobileNumber.substr(0, 2)); // Extract the service provider code

      if (serviceProviderCode === 70 || serviceProviderCode === 71) {
        setServiceProvider("Mobitel (Pvt) Ltd");
      } else if (serviceProviderCode === 75) {
        setServiceProvider("Airtel Sri Lanka");
      } else if (
        serviceProviderCode === 77 ||
        serviceProviderCode === 73 ||
        serviceProviderCode === 74 ||
        serviceProviderCode === 76
      ) {
        setServiceProvider("Dialog Axiata PLC");
      } else if (serviceProviderCode === 72 || serviceProviderCode === 78) {
        setServiceProvider("Hutchison Telecommunication Lanka (Pvt) Ltd");
      } else {
        setServiceProvider("-");
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      fullname: fullName,
      address: address,
      nic: nic,
      gender: gender,
      age: age,
      birthday: birthday,
      mobile_number: mobileNumber,
      service_provider: serviceProvider,
      userid: userId,
    };

    // Check if userDetails exist
    if (userDetails) {
      // Update the record using axios.put
      axios
        .put(`http://localhost:3001/usersdetails/data/${userId}`, formData)
        .then((response) => {
          // Handle the response, e.g., show a success message
          console.log("Data updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      // Create a new record using axios.post
      axios
        .post("http://localhost:3001/usersdetails/data", formData)
        .then((response) => {
          // Handle the response, e.g., show a success message
          console.log("Data saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
    // Clear form fields after successful submission
    setFullName("");
    setAddress("");
    setNIC("");
    setGender("");
    setAge("");
    setBirthday("");
    setMobileNumber("");
    setServiceProvider("");

    onClose();
    onSubmissionSuccess();
  };

  return (
    <>
      <MDBModal show={true} onHide={onClose} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Form Submission</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={onClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <form onSubmit={handleSubmit}>
                  <MDBTextArea
                    textarea
                    rows={2}
                    wrapperClass="mb-4"
                    id="formFullname"
                    label="Full Name"
                    value={fullName}
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />

                  <MDBTextArea
                    wrapperClass="mb-4"
                    textarea
                    rows={2}
                    id="formAddress"
                    label="Address"
                    value={address}
                    required
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBValidation>
                        <MDBValidationItem
                          className="col-md-12 "
                          feedback="Invalid NIC number"
                          invalid
                        >
                          <MDBInput
                            type="text"
                            id="formNIC"
                            label="NIC Number"
                            onChange={handleNICChange}
                            value={nic}
                            required
                            className={nicError ? "is-invalid" : ""}
                          />
                          {nicError && (
                            <div className="invalid-feedback">{nicError}</div>
                          )}
                        </MDBValidationItem>
                      </MDBValidation>
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="formAge"
                        label={age ? "Age" : "Age"}
                        type="text"
                        value={age}
                        required
                        readOnly
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className=" mb-4">
                    <MDBCol>
                      <MDBInput
                        id="formBirthday"
                        label={birthday ? "Birthday" : "Birthday"}
                        value={birthday}
                        required
                        readOnly
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        id="formGender"
                        label={gender ? "Gender" : "Gender"}
                        type="text"
                        value={gender}
                        required
                        readOnly
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBValidation>
                      <MDBValidationItem
                        className="col-md-12 "
                        feedback={mobileError}
                        invalid
                      >
                        <MDBInputGroup textBefore="+94">
                          <MDBInput
                            wrapperClass="mb-4"
                            type="tel"
                            id="form6Example6"
                            label="Mobile Number (Ex:771234567)"
                            onChange={handleMobileNumberChange}
                            value={mobileNumber}
                            className={mobileError ? "is-invalid" : ""}
                            required
                          />
                          {mobileError && (
                            <div className="invalid-feedback">
                              {mobileError}
                            </div>
                          )}
                        </MDBInputGroup>
                      </MDBValidationItem>
                    </MDBValidation>
                  </MDBRow>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="form6Example4"
                    label={
                      serviceProvider ? "Service Provider" : "Service Provider"
                    }
                    value={serviceProvider}
                    required
                    readOnly
                  />
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onClose}>
                      Close
                    </MDBBtn>
                    <MDBBtn type="submit" disabled={nicError || mobileError}>
                      Save changes
                    </MDBBtn>
                  </MDBModalFooter>
                </form>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default ModalForm;
