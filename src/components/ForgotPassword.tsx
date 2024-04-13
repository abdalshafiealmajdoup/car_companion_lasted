import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../store/slices/CustomerSlice'; 
import Swal from 'sweetalert2';
import "../assets/css/LoginGestUser.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(forgetPassword(phone))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'تم الإرسال!',
          text: 'تحقق من هاتفك للحصول على تعليمات إعادة تعيين كلمة المرور.',
          icon: 'success',
          confirmButtonText: 'حسنًا'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/verify-otp-customer"); 
          }
        });
      })
      .catch((err) => {
        setError(err.message || 'حدث خطأ ما.');
        Swal.fire({
          title: 'فشل الإرسال!',
          text: err.message || 'لا يمكن إرسال إعادة تعيين كلمة المرور، يرجى المحاولة لاحقًا.',
          icon: 'error',
          confirmButtonText: 'حسنًا'
        });
      });
  };

  return (
    <section className="d-flex align-items-center">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>نسيت كلمة المرور</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <form onSubmit={handleSubmit} className="formRe">
              <div className="form-group mb-3 inpo">
                <input
                  type="tel"
                  name="Phone"
                  value={phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="رقم الهاتف"
                />
                {error && <div style={{ color: 'red', fontSize: 'small' }}>{error}</div>}
              </div>
              <input type="submit" className="btnRegister btnr" value="إرسال رابط إعادة تعيين" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
