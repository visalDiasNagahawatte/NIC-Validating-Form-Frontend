import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Carousel() {
  const userId = localStorage.getItem("userId");
  return (
    <MDBContainer className="mt-3 col-md-8">
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={1}
          src="https://wallpapers.com/images/hd/neon-yellow-welcome-5eakk7jalfwf6cp6.jpg"
          alt="..."
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={2}
          src="https://wallpapercave.com/wp/wp3188042.jpg"
          alt="..."
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={3}
          src="https://www.sundaytimes.lk/171029/uploads/DSC6328.jpg"
          alt="..."
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </MDBCarousel>
      {!userId ? (
        <MDBCard className="mt-2 text-center">
          <MDBCardBody>
            <MDBCardTitle>Welcome to DataHub</MDBCardTitle>
            <MDBCardText>In order to proceed, please log in</MDBCardText>
            <Link to={"/login"}>
              <MDBBtn>Login</MDBBtn>
            </Link>
          </MDBCardBody>
        </MDBCard>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Carousel;
