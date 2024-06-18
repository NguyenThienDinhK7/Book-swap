import React from "react";
import "./message.css";

const Message = () => {
  return (
    <>
      <div
        className={`Message d-flex justify-content-center align-items-center rounded-circle me-2 position-relative`}
        title="Tin nhắn"
        data-bs-toggle="modal"
        data-bs-target="#modalMessage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          className="bi bi-envelope-fill"
          viewBox="0 0 16 16"
        >
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
        </svg>

        <span className="position-absolute notifyDot p-1  bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </span>
      </div>

      <div
        className="modal fade"
        id="modalMessage"
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
                  oin andka woia doa đănoihdo oawhd ssssssss22222222222ssssssssoa dboab doahd oah dowa
                  doahd oahdoadh oadn oahd oiahdiavfi32bfi2h h3 oho32 grogroq ro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
