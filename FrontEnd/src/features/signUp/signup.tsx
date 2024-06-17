import React, { useState } from "react";
import AutThumb from "../../../public/images/site/AuthThumb.jpg";
import "../signUp/signup.css";

const API_URL = "http://localhost:5038/api/";

let alertStatus = "d-none";

async function signupHandle(email: string, pass: string) {
  console.log(email, pass);
  pass = String(pass);

  try {
    const response = await fetch(API_URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass }),
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Failed to sign up:", error);
    throw new Error("Failed to sign up");
  }
}

const Signup = () => {
  const [warningEmail, setWarningEmail] = useState<string>(""); // State để lưu trữ cảnh báo cho Email
  const [warningPass, setWarningPass] = useState<string>(""); // State để lưu trữ cảnh báo cho Password
  const [warningRePass, setWarningRePass] = useState<string>(""); // State để lưu trữ cảnh báo cho Email
  const [message, setMessage] = useState<string>(""); // State để lưu trữ thông điệp phản hồi

  // Function xử lý khi click vào nút Đăng ký
  const handleClick = async () => {
    const emailValue = (
      document.getElementById("Email") as HTMLInputElement
    ).value.trim();
    const passValue = (
      document.getElementById("Password") as HTMLInputElement
    ).value.trim();
    const rePassValue = (
      document.getElementById("rePassword") as HTMLInputElement
    ).value.trim();

    // Kiểm tra và cập nhật state warningEmail và warningPass
    if (emailValue === "") {
      setWarningEmail("*Vui lòng nhập Email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setWarningEmail("*Định dạng email không hợp lệ");
      return;
    } else {
      setWarningEmail(""); // Nếu hợp lệ, đặt lại warningEmail về rỗng
    }

    if (passValue === "") {
      setWarningPass("*Vui lòng nhập mật khẩu");
      return;
    } else if (passValue.length < 8 || passValue.length > 30) {
      setWarningPass("*Mật khẩu phải có từ 8 đến 30 ký tự");
      return;
    } else {
      setWarningPass(""); // Nếu hợp lệ, đặt lại warningPass về rỗng
    }

    if (rePassValue === "") {
      setWarningRePass("*Vui lòng nhập lại mật khẩu");
      return;
    } else if (rePassValue !== passValue) {
      setWarningRePass("*Mật khẩu nhập lại không khớp");
      return;
    } else {
      setWarningRePass(""); // Nếu hợp lệ, đặt lại warningRePass về rỗng
    }

    // Đã vượt qua tất cả các kiểm tra, tiến hành đăng ký hoặc xử lý logic tiếp theo
    try {
      const signupMessage = await signupHandle(emailValue, passValue);
      setMessage("*" + signupMessage);
      if (signupMessage === "success") {
        window.location.href = "/login";
      }else if(signupMessage == "error"){
          alertStatus = "d-block";
      }
      else{
        setWarningEmail(signupMessage);
      }
    } catch (error) {
      alertStatus = "d-block";
    }
  };

  return (
    <div className="d-flex vh-100 vw-100 justify-content-center align-items-center loginPanel">
      <div className="text-center">
        <div className="d-flex">
          <div className="container p-2 rounded bg-light">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={AutThumb}
                  alt=""
                  className="img-fluid hide-on-mobile"
                />
              </div>
              <div className="col-md-6 loginContent position-relative">
                <div className="position-relative w-100 ">
                  <div
                    className={`failLoginAlert alert alert-danger p-0 position-absolute top-0 start-0 w-100 ${alertStatus}`}
                    role="alert"
                  >
                    Lỗi hệ thống! <br />
                    vui lòng liên hệ cho chúng tôi qua số: 0123456789. <br />
                    Xin cảm ơn
                  </div>
                </div>
                <div className="loginTitle">
                  <h2 className="fw-bold">ĐĂNG KÝ</h2>
                </div>

                <button
                  type="button"
                  className="googleLoginBtn btn d-flex align-items-center justify-content-center mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"></path>
                  </svg>
                  Đăng ký bằng Google
                </button>
                <hr />
                <span>Hoặc</span>
                <hr />

                <span className="fw-bold mb-2">Đăng ký bằng tài khoản</span>

                <div className="mt-2 inputGroup">
                  <div className="d-flex">
                    <span id="alertEmail" className="me-auto ms-1 text-danger">
                      {warningEmail}
                    </span>
                  </div>
                  <input
                    type="text"
                    id="Email"
                    className="form-control mb-2"
                    placeholder="Tên đăng nhập"
                  />
                  <div className="d-flex">
                    <span id="alertPass" className="me-auto ms-1 text-danger">
                      {warningPass}
                    </span>
                  </div>
                  <input
                    type="password"
                    id="Password"
                    className="form-control mb-2"
                    placeholder="Mật khẩu"
                  />

                  <div className="d-flex">
                    <span id="alertRePass" className="me-auto ms-1 text-danger">
                      {warningRePass}
                    </span>
                  </div>
                  <input
                    type="password"
                    id="rePassword"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                  />

                  <button
                    id="loginBtn"
                    className="btn loginBtn mt-4"
                    onClick={handleClick}
                  >
                    Đăng ký
                  </button>
                  <br />

                  <div className="mt-4">
                    Bạn đã có tài khoản ?&ensp;
                    <a className="text-decoration-none" href="/login">
                      Đăng nhập
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
