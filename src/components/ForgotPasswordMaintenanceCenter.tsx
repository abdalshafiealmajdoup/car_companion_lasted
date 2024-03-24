import "../assets/css/LoginGestUser.css";
import { Link } from "react-router-dom";
function ForgotPasswordMaintenanceCenter() {
  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div
        className="container position-relative"
        
        
      >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3> هل نسيت كلمة المرور </h3>
          </div>
        </div>
        <div className="container register">
          <div className="row">
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading"> إستعادة كلمة المرور</h3>
                  <div className="row register-form">
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="البريد الإلكتروني"
                          value=""
                        />
                      </div>
                      <div className="form-group">
                        <Link to="/login-maintenance-center-user" className="ForgetPwd">
                             تسجيل الدخول
                        </Link>
                      </div>
                      <input
                        type="submit"
                        className="btnRegister"
                        value="تأكيد إستعادة كلمة المرور"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>مرحبا بك</h3>
              <p>معاك في كل رحلة ، وفي كل مكان رفيق السيارة</p>
              <Link to="/register-maintenance-center-user">
                <input
                  type="submit"
                  name=""
                  value="إنشاء حساب جديد"
                  className="btnLogin"
                />
                <br />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordMaintenanceCenter;
