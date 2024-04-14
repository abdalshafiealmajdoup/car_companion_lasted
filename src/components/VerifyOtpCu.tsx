import { useState } from "react";
import "../assets/css/LoginGestUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const errorTranslations: Record<string, string> = {
  "The OTP field is required.": "حقل OTP مطلوب.",
};
const placeholders = {
  OTP: 'OTP',
};
const translateError = (error: string) => errorTranslations[error] || error;

function VerifyOtpCu() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    OTP: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const customerPhone = localStorage.getItem('customerPhone');
      if (!customerPhone) {
        throw new Error('Customer phone not found in localStorage');
      }
      
      const response = await axios.post("http://localhost:8000/api/customers/verify-otp", {
        Phone: customerPhone,
        otp: formData.OTP,
      });
      if (response.status === 200) {
        Swal.fire(
          'تم التحقق من OTP بنجاح!'
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/reset-password-customer"); 

          }
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Swal.fire(
          'خطأ بالخادم!',
          'حدث خطأ بالخادم، يرجى المحاولة لاحقًا.',
          'error'
        );
      } else {
        Swal.fire(
          'خطأ!',
          'حدث خطأ، يرجى المحاولة مرة أخرى.',
          'error'
        );
      }
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3> الرجاء إدخال رمز التحقق OTP</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <div className="">
              <form onSubmit={handleSubmit} className="formRe">
                <div className="form-group mb-3 inpo">
                  <input
                    type="text"
                    name="OTP"
                    value={formData.OTP}
                    onChange={handleChange}
                    className="form-control "
                    placeholder={placeholders.OTP}
                  />
                  {errors.OTP && <div style={{ color: 'red', fontSize: 'small' }}>{translateError(errors.OTP[0])}</div>}
                </div>
                <input type="submit" className="btnRegister btnr" value="تاكيد الطلب " />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyOtpCu;
