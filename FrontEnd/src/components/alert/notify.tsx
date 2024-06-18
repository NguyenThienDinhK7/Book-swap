import React from "react";
import "./notify.css";

const Notify = () => {
  return (
    <>
      <div
        className={`Notify d-flex justify-content-center align-items-center rounded-circle me-2 position-relative`}
        title="Thông báo"
        data-bs-toggle="modal"
        data-bs-target="#modalNotify"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          className="bi bi-bell-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>

        <span className="position-absolute notifyDot p-1  bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </span>
      </div>

      <div
        className="modal fade"
        id="modalNotify"
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
                  Hello, worldqqqqqqqqqqqqqqq! This is a static toast-like div. ksdn knnd land oin andka woia doa đănoihdo oawhd oa dboab doahd oah dowa doahd oahdoadh oadn oahd oiahdiavfi32bfi2h h3 oho32 grogroq ro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notify;
