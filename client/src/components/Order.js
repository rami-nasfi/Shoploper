import React from "react";

function Order() {
  return (
    <div className="container">
      <div className=" d-flex align-items-center  mx-5 ">
        <table class="table table-striped ">
          <thead>
            <tr>
              <th scope="col" className="">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
              </th>
              <th scope="col">ID</th>
              <th scope="col">Cutomer</th>
              <th scope="col">Amount</th>
              <th scope="col" colspan="3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
              </td>
              <td className="align-middle">
                <div class="">
                  <img
                    src="https://ayshek.com/wp-content/uploads/2020/05/ca9d45_eb1aa063479640fdb8bc40d2f1d14c27mv2.jpg"
                    class="roundedw-20 w-16"
                    alt="..."
                  />
                </div>
              </td>
              <td className="align-middle">Harrisa</td>
              <td className="align-middle">Sauce</td>
              <td className="align-middle">$18.99</td>
              <td className="align-middle">
                <a href="">U</a>
              </td>
              <td className="align-middle">
                <a href="">X</a>
              </td>
            </tr>
            <tr>
              <td className="align-middle">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
              </td>
              <td className="align-middle">
                <div class="">
                  <img
                    src="https://ayshek.com/wp-content/uploads/2020/05/ca9d45_eb1aa063479640fdb8bc40d2f1d14c27mv2.jpg"
                    class="rounded w-16"
                    alt="..."
                  />
                </div>
              </td>
              <td className="align-middle">Harrisa</td>
              <td className="align-middle">Sauce</td>
              <td className="align-middle">$18.99</td>
              <td className="align-middle">
                <a href="">U</a>
              </td>
              <td className="align-middle">
                <a href="">X</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
