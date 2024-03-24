import { useState } from "react";
import "../assets/css/LoginGestUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const errorTranslations: Record<string, string> = {
  "The email field is required.": "حقل البريد الإلكتروني مطلوب.",
  "The password field is required.": "حقل كلمة المرور مطلوب.",

};
const placeholders = {
  Email: 'البريد الإلكتروني',
  Password: 'كلمة المرور',

};
const translateError = (error: string) => errorTranslations[error] || error;

function RegisterGestUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/customers/login", {
        Email: formData.Email,
        Password: formData.Password,
      });
      if (response.status === 200) {
        // console.log(response.data)
        localStorage.setItem('tokenCustomer', response.data.access_token);
        localStorage.setItem('customerID', response.data.CustomerID);
        localStorage.setItem('customerPhone', response.data.Phone);
        localStorage.setItem('customerEmail', response.data.Email);
        localStorage.setItem('customerName', response.data.Name);


        Swal.fire(
          'تم تسجيل الدخول بنجاح!'

          ).then((result) => {
          if (result.isConfirmed) {
            navigate("/client-interface"); 
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
      <div
        className="container position-relative"
        
        
      >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تسجيل دخول</h3>
          </div>
        </div>
        <div className="register-style">
        <div className=" register-form">
                    <div className="">
                      <form onSubmit={handleSubmit} className="formRe">
                        {Object.keys(formData).map((key) => (
                          <div key={key} className="form-group mb-3 inpo">
                            <input
                              type={key === 'Password' ? 'password' : 'text' && key === 'Email' ? 'email' : 'text' &&  key === 'ConfirmPassword' ? 'password' : 'text'}
                              name={key}
                              value={formData[key as keyof typeof formData]}
                              onChange={handleChange}
                              className="form-control "
                              placeholder={placeholders[key as keyof typeof placeholders]}
                              />
                            {errors[key] && <div style={{ color: 'red', fontSize: 'small' }}>{translateError(errors[key][0])}</div>}
                          </div>
                        ))}
                        <input type="submit" className="btnRegister btnr" value="تسجيل الدخول" />
                        <br />
                        <p> ليس لديك حساب : <strong><Link to="/register-gest-user"> إنشاء حساب جديد
              </Link> </strong></p>
                      </form>
                    </div>
                  </div>
        </div>

      </div>
    </section>
  );
}

export default RegisterGestUser;
