import { FaBars } from "react-icons/fa6";

function MainNavigation() {
  return (
    <div className=" ">
      <div className="d-flex justify-content-between  bg-white bg-opacity-50 bg-blur position-fixed custom-w-80 container-lg">
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn border d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <FaBars />
          </button>
        </div>
        <nav className="navbar navbar-expand-lg position-relative ">
          <div className="position-relative">
            <div className=" navbar-collapse" id="fixedNav">
              <ul className="navbar-nav">
                <li className="nav-item rounded-5 bg-success-subtle ">
                  <a className="nav-link btn p-1">
                    <img src="https://avatars.githubusercontent.com/u/115596797?v=4" alt="" srcset="" width={"50px"} className="rounded-5 " />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MainNavigation;
