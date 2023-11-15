import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter className="  text-center text-white " dark bgColor="primary">
      <div className="text-center text-white-50 p-3" dark bgColor="primary">
        © 2023 Copyright:{" "}
        <a
          className="text-white-50"
          href="https://www.facebook.com/visal.nagahawatte.1/"
          target="_blank"
        >
          Visal Nagahawatte
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
