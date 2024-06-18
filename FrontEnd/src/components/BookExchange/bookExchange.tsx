import React from "react";
import "./bookExchange.css"

const BookExchange = () => {
  return (
    <>
      <div
        className={`BookExchange d-flex justify-content-center align-items-center rounded-circle me-2 position-relative`}
        title="Trao đổi"
        data-bs-toggle="modal"
        data-bs-target="#modalBookExchange"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          className="bi bi-arrow-down-up"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
          />
        </svg>

        <span className="position-absolute notifyDot p-1  bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </span>
      </div>

      <div
        className="modal fade"
        id="modalBookExchange"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông báo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Toast goes here */}
              <div
                className="toast show w-100"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header">
                  <img src="..." className="rounded me-2" alt="..." />
                  <strong className="me-auto">Bootstrap</strong>
                  <small className="text-muted">11 mins ago</small>
                </div>
                <div className="toast-body">
                  Hello, world! This is a static toast-like div. ksdn knnd land
                  oin andka woia doa đănoihdo oawhd oa dboab doahd oah dowa
                  doahd oahdoadh oadn oahd ----------- h3 oho32 grogroq ro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookExchange;
