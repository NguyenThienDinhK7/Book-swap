import React, { useState } from "react";
import AutThumb from "../../../public/images/site/AuthThumb.jpg";
import "../login/login.css";

const API_URL = "http://localhost:5038/api/";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warningEmail, setWarningEmail] = useState<string>("");
  const [warningPass, setWarningPass] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State để kiểm soát trạng thái loading

  const handleClick = async () => {
    const emailValue = email.trim();
    const passValue = password.trim();

    if (emailValue === "") {
      setWarningEmail("*Vui lòng nhập Email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setWarningEmail("*Định dạng email không hợp lệ");
      return;
    } else {
      setWarningEmail("");
    }

    if (passValue === "") {
      setWarningPass("*Vui lòng nhập mật khẩu");
      return;
    } else if (passValue.length < 8 || passValue.length > 30) {
      setWarningPass("*Mật khẩu phải có từ 8 đến 30 ký tự");
      return;
    } else {
      setWarningPass("");
    }

    try {
      setLoading(true); // Bắt đầu loading khi gửi yêu cầu
      const response = await fetch(API_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies)
        body: JSON.stringify({ email: emailValue, pass: passValue }),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false); // Kết thúc loading khi nhận được phản hồi

      if (data.message === "admin") {
        window.location.href = "/admin";
      } else if (data.message === "client") {
        window.location.href = "/";
      } else if (data.message === "error") {
        setMessage("*Lỗi đăng nhập");
      } else {
        setWarningPass(data.message);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      setLoading(false); // Dừng loading nếu có lỗi xảy ra
      setMessage("*Lỗi đăng nhập");
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
                <div className="loginTitle">
                  <h2 className="fw-bold">ĐĂNG NHẬP</h2>
                </div>

                {/* Hiển thị spinner nếu đang loading */}
                {loading && (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}

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
                  Đăng nhập bằng Google
                </button>
                <hr />
                <span>Hoặc</span>
                <hr />

                <span className="fw-bold mb-2">
                  Đăng nhập bằng tài khoản của bạn
                </span>

                <div className="mt-2 inputGroup">
                  <div className="d-flex">
                    <span id="alertEmail" className="me-auto ms-1 text-danger">
                      {warningEmail}&ensp;
                    </span>
                  </div>
                  <input
                    type="text"
                    id="Email"
                    className="form-control mb-2"
                    placeholder="Tên đăng nhập"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="d-flex">
                    <span id="alertRePass" className="me-auto ms-1 text-danger">
                      {warningPass}&ensp;
                    </span>
                  </div>
                  <input
                    type="password"
                    id="Password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="d-flex">
                    <a href="" className="ms-auto me-2 text-decoration-none">
                      Quên mật khẩu ?
                    </a>
                    <br />
                  </div>

                  <button
                    id="loginBtn"
                    className="btn loginBtn mt-4"
                    onClick={handleClick}
                  >
                    Đăng nhập
                  </button>
                  <br />

                  <div className="mt-4">
                    Bạn chưa có tài khoản ?&ensp;
                    <a className="text-decoration-none" href="/signup">
                      Đăng ký
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

export default Login;
  