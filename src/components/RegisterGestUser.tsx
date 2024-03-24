import { useState } from "react";
import "../assets/css/LoginGestUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { registerCustomer } from '../store/slices/CustomerSlice';


const errorTranslations: Record<string, string> = {
  "The name field is required.": "حقل الاسم مطلوب.",
  "The phone field is required.": "حقل الهاتف مطلوب.",
  "The email field is required.": "حقل البريد الإلكتروني مطلوب.",
  "The password field is required.": "حقل كلمة المرور مطلوب.",
  "The email must be a valid email address.": "يجب أن يكون البريد الإلكتروني عنوانًا صالحًا.",
};
const placeholders = {
  Name: 'الإسم الكامل',
  Phone: 'رقم الهاتف',
  Email: 'البريد الإلكتروني',
  Password: 'كلمة المرور',
  ConfirmPassword: 'تأكيد كلمة المرور',
};

const translateError = (error: string) => errorTranslations[error] || error;

function RegisterGestUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Password: '',
    ConfirmPassword: '', 
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.Password !== formData.ConfirmPassword) {
      Swal.fire('خطأ!', 'كلمة المرور وتأكيدها غير متطابقتين.', 'error');
      return;
    }
  
    try {
      const { ConfirmPassword, ...dataToSubmit } = formData;
      const response = await dispatch(registerCustomer(dataToSubmit)).unwrap();
  
      if (response && response.access_token) {
        Swal.fire('نجاح!', 'تم التسجيل بنجاح!', 'success').then(() => {
          navigate("/login-gest-user");
        });
      } else {
        throw new Error('Registration failed with no error message.');
      }
    } catch (error) {
      Swal.fire('نجاح!', 'تم التسجيل بنجاح!', 'success'),
            navigate("/login-gest-user");
    }
  };
  
  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div
        className="container position-relative"
        
        
      >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>إنشاء زبون جديد </h3>
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
                              required={true}
                              />
                            {errors[key] && <div style={{ color: 'red', fontSize: 'small' }}>{translateError(errors[key][0])}</div>}
                          </div>
                        ))}
                        <input type="submit" className="btnRegister btnr" value="إنشاء حساب جديد" />
                        <br />
                        <p>هل تمتلك حساب بالفعل : <strong><Link to="/login-gest-user">تسجيل الدخول
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
