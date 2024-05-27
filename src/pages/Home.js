import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.css"; // Custom CSS for additional styling

const Home = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay
        interval={3000}
        infiniteLoop
      >
        <div className="carousel-slide">
          <img
            src="https://cdn.pixabay.com/photo/2024/04/30/07/18/dentist-8729627_1280.jpg"
            alt="Dentist"
          />
          <div className="carousel-caption">
            <h3>Professional Dental Care</h3>
            <p>Ensuring your smile is always bright and healthy.</p>
          </div>
        </div>
        <div className="carousel-slide">
          <img
            src="https://cdn.pixabay.com/photo/2013/02/10/23/22/bethesda-naval-medical-center-80380_1280.jpg"
            alt="Hospital"
          />
          <div className="carousel-caption">
            <h3>State-of-the-Art Facilities</h3>
            <p>Top-notch medical equipment for the best care.</p>
          </div>
        </div>
        <div className="carousel-slide">
          <img
            src="https://cdn.pixabay.com/photo/2021/12/22/03/11/self-care-6886599_1280.jpg"
            alt="Self Care"
          />
          <div className="carousel-caption">
            <h3>Comprehensive Self-Care</h3>
            <p>Your health, our priority.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
