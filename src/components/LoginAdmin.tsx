import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginAdmin } from "../store/slices/AdminSlice"; 
import { Link } from "react-router-dom";
import "../assets/css/LoginGestUser.css"; // Ensure the CSS path is correct.
const errorTranslations = {
  "The email field is required.": "حقل البريد الإلكتروني مطلوب.",
  "The password field is required.": "حقل كلمة المرور مطلوب.",
};

const placeholders = {
  Email: "البريد الإلكتروني",
  Password: "كلمة المرور",
};

const translateError = (error: string) => errorTranslations[error] || error;

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginAdmin({ Email: formData.Email, Password: formData.Password })).unwrap();
      Swal.fire("تم تسجيل الدخول بنجاح!", "أهلاً بعودتك إلى لوحة التحكم.", "success").then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/maintenance-centers-admin"); 
        }
      });
    } catch (error) {
      Swal.fire("خطأ!", "تعذر تسجيل الدخول، يرجى التحقق من بياناتك والمحاولة مرة أخرى.", "error");
      if (error.response && error.response.data && error.response.data.errors) {
        const updatedErrors = Object.keys(error.response.data.errors).reduce((acc, key) => ({
          ...acc,
          [key]: error.response.data.errors[key].map(translateError),
        }), {});
        setErrors(updatedErrors);
      }
    }
  };

  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div className="container position-relative" >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تسجيل دخول الإدارة</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <form onSubmit={handleSubmit} className="formRe">
              {Object.keys(formData).map((key) => (
                <div key={key} className="form-group mb-3 inpo">
                  <input
                    type={key === "Password" ? "password" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={placeholders[key]}
                  />
                  {errors[key] && <div style={{ color: "red", fontSize: "small" }}>{translateError(errors[key][0])}</div>}
                </div>
              ))}
              <input type="submit" className="btnRegister btnr" value="تسجيل الدخول" />
              <br />
              <p>ليس لديك حساب؟ <strong><Link to="/admin/register">إنشاء حساب إداري</Link></strong></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginAdmin;
