import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { loginServiceCenter } from '../store/slices/ServiceCenter'; 
import { Link } from "react-router-dom";

function LoginServiceCenter() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginServiceCenter({ Email: formData.Email, Password: formData.Password })).unwrap();
      Swal.fire(
        'تم تسجيل الدخول بنجاح!',
        '',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/maintenance-center/list-maintenance-requests"); 
        }
      });
    } catch (error) {
      Swal.fire(
        'خطأ!',
        'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        'error'
      );
    }
  };

  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تسجيل دخول مركز الصيانة</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <form onSubmit={handleSubmit} className="formRe">
              <div className="form-group mb-3 inpo">
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="البريد الإلكتروني"
                  required
                />
              </div>
              <div className="form-group mb-3 inpo">
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <input type="submit" className="btnRegister btnr" value="تسجيل الدخول" />
              <p>ليس لديك حساب؟ <Link to="/register-maintenance-center-user">إنشاء حساب جديد</Link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginServiceCenter;
