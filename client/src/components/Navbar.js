function MainNavigation() {
  return (
    <div className="d-flex justify-content-end position-fixed bg-white bg-opacity-50 bg-blur nav-width px-4">
      <nav className="navbar navbar-expand-lg position-relative ">
        <div className="container-fluid position-relative">
          <div className="collapse navbar-collapse" id="navbarNav">
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
  );
}

export default MainNavigation;
