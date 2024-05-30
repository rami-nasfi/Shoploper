import React from "react";

function CarouselImage() {
  return (
    <div>
      <div id="carouselExample" className="carousel slide ">
        <div className="carousel-inner rounded">
          <div className="carousel-item active ">
            <img
              src="https://www.socialistsanddemocrats.eu/sites/default/files/styles/header_background/public/2019-04/Palestine%402x.jpg?itok=wc3eu5BG"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img src="https://pbs.twimg.com/media/F_K8qaGWAAA1Dnu.png" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselImage;
