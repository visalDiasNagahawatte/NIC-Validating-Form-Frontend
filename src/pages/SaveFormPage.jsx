import React, { useState, useContext } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from "mdb-react-ui-kit";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function SaveFormPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  //getting userid
  const authContext = useContext(AuthContext);
  const userId = authContext.authState ? authContext.authState.userId : null;

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
      // Handle invalid NIC input
      return;
    } else if (NICNo.length === 10 && !/^\d+$/.test(NICNo.substr(0, 9))) {
      // Handle invalid NIC input
      return;
    } else {
      // Year
      if (NICNo.length === 10) {
        extractedYear = "19" + extractedYear;
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
        // Handle invalid NIC input
        return;
      } else {
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

    // Implement mobile number logic to update the service provider
    const serviceProviderCode = parseInt(newMobileNumber.substr(3, 2)); // Extract the service provider code

    if (serviceProviderCode === 70 || serviceProviderCode === 71) {
      setServiceProvider("Mobitel");
    } else if (serviceProviderCode === 75) {
      setServiceProvider("Airtel");
    } else if (
      serviceProviderCode === 77 ||
      serviceProviderCode === 73 ||
      serviceProviderCode === 74 ||
      serviceProviderCode === 76
    ) {
      setServiceProvider("Dialog");
    } else if (serviceProviderCode === 72 || serviceProviderCode === 78) {
      setServiceProvider("Hutch");
    } else {
      setServiceProvider("");
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
    };

    try {
      // Make a POST request to your server
      const response = await axios.post(
        "http://localhost:3001/usersdetails/data",
        formData
      );

      // Handle the response, e.g., show a success message
      console.log("Data saved:", response.data);

      // Clear form fields after successful submission
      setFullName("");
      setAddress("");
      setNIC("");
      setGender("");
      setAge("");
      setBirthday("");
      setMobileNumber("");
      setServiceProvider("");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            id="formFullname"
            label="Full Name"
            value={fullName}
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
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                type="text"
                id="formNIC"
                label="NIC Number"
                onChange={handleNICChange}
                value={nic}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="formAge"
                label={age ? "Age" : "Age"}
                type="text"
                value={age}
                readOnly
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                id="formBirthday"
                label={birthday ? "Birthday" : "Birthday"}
                value={birthday}
                readOnly
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="formGender"
                label={gender ? "Gender" : "Gender"}
                type="text"
                value={gender}
                readOnly
              />
            </MDBCol>
          </MDBRow>
          <MDBInput
            wrapperClass="mb-4"
            type="tel"
            id="form6Example6"
            label="Mobile Number"
            onChange={handleMobileNumberChange}
            value={mobileNumber}
          />
          <MDBInput
            wrapperClass="mb-4"
            id="form6Example4"
            label={serviceProvider ? "Service Provider" : "Service Provider"}
            value={serviceProvider}
            readOnly
          />

          <MDBBtn className="mb-4" type="submit" block>
            Save Details
          </MDBBtn>
        </form>
      </div>
    </>
  );
}

export default SaveFormPage;
