import React from "react";

function CarouselImage() {
  return (
    <div>
      <div id="carouselExample" className="carousel slide ">
        <div className="carousel-inner rounded">
          <div className="carousel-item active ">
            <img
              src="https://img.freepik.com/photos-premium/goutte-eau-se-repose-herbe-au-soleil_786688-1476.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/photos-gratuite/feuilles-automne-fraiches-revelent-motif-organique-vibrant-genere-par-ia_188544-15037.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/fresh-yellow-daisy-single-flower-close-up-beauty-generated-by-ai_188544-15543.jpg"
              className="d-block w-100"
              alt="..."
            />
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
