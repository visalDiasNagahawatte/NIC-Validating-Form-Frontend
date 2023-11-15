import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";
import { BarChart } from "@mui/x-charts";

function Charts() {
  const [serviceProvidersData, setServiceProvidersData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    // Make the API call using Axios
    axios
      .get("http://localhost:3001/usersdetails/service-providers-count")
      .then((response) => setServiceProvidersData(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:3001/usersdetails/gender-count")
      .then((response) => setGenderData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <MDBRow>
        <MDBCol className="col-md-4 mb-3">
          {serviceProvidersData.length > 0 && (
            <PieChart
              series={[
                {
                  data: serviceProvidersData.map((entry) => ({
                    id: entry.service_provider,
                    value: entry.count,
                    label: entry.service_provider,
                  })),
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={650}
              height={200}
              slotProps={{
                legend: {
                  direction: "column",
                  position: { vertical: "bottom", horizontal: "left" },
                },
              }}
            />
          )}
        </MDBCol>
        <MDBCol className="mb-3">
          {genderData.length > 0 && (
            <BarChart
              margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
              }}
              xAxis={[
                {
                  id: "gender",
                  data: genderData.map((entry) => entry.gender),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: genderData.map((entry) => entry.count),
                  fill: "dodgerblue",
                },
              ]}
              width={500}
              height={300}
            />
          )}
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default Charts;
