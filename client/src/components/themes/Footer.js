import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <span class="mb-3 mb-md-0 text-muted">© 2024 Shoploper, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a class="text-muted" href="https://www.facebook.com/rami.nasfi" target="_blank">
              <h4>
                <FaLinkedin />
              </h4>
            </a>
          </li>
          <li class="ms-3">
            <a class="text-muted" href="https://github.com/rami-nasfi" target="_blank">
              <h4>
                <FaGithub />
              </h4>
            </a>
          </li>
          <li class="ms-3">
            <a class="text-muted" href="https://www.facebook.com/rami.nasfi" target="_blank">
              <h4>
                <FaFacebook />
              </h4>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
