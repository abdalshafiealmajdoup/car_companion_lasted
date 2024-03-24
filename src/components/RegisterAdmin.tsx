import { useState } from "react";
import "../assets/css/LoginGestUser.css"; // Ensure the CSS path is correct.
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../store/slices/AdminSlice'; // Make sure to import the correct action from the admin slice.
import { Link } from "react-router-dom";

const errorTranslations = {
  "The name field is required.": "حقل الاسم مطلوب.",
  "The email field is required.": "حقل البريد الإلكتروني مطلوب.",
  "The password field is required.": "حقل كلمة المرور مطلوب.",
  "The email must be a valid email address.": "يجب أن يكون البريد الإلكتروني عنوانًا صالحًا.",
};

const placeholders = {
  Name: 'الإسم الكامل',
  Email: 'البريد الإلكتروني',
  Password: 'كلمة المرور',
  ConfirmPassword: 'تأكيد كلمة المرور',
};

function RegisterAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '', 
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.Password !== formData.ConfirmPassword) {
      setErrors(prevErrors => ({...prevErrors, ConfirmPassword: ["كلمتا المرور غير متطابقتين"]}));
      Swal.fire({
        icon: 'error',
        title: 'خطأ في التسجيل',
        text: 'كلمة المرور وتأكيدها غير متطابقين. يرجى التحقق وإعادة المحاولة.',
      });
      return; 
    }

    try {
      const { ConfirmPassword, ...dataToSubmit } = formData;
      await dispatch(registerAdmin(dataToSubmit)).unwrap();
      Swal.fire('تم التسجيل بنجاح!', 'تم تسجيل الإداري بنجاح.', 'success')
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/login"); // Make sure the route is correct.
          }
        });
    } catch (error) {
      Swal.fire(
        'خطأ!',
        'حدث خطأ، يرجى المحاولة مرة أخرى.',
        'error'
      );
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
            <h3>إنشاء حساب إداري جديد</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <form onSubmit={handleSubmit} className="formRe">
              {Object.keys(formData).map((key) => (
                <div key={key} className="form-group mb-3 inpo">
                  <input
                    type={key === 'Password' || key === 'ConfirmPassword' ? 'password' : key === 'Email' ? 'email' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={placeholders[key]}
                  />
                  {errors[key] && <div style={{ color: 'red', fontSize: 'small' }}>{errors[key][0]}</div>}
                </div>
              ))}
              <input type="submit" className="btnRegister btnr" value="إنشاء حساب جديد" />
              <p>هل لديك حساب بالفعل؟ <strong><Link to="/admin/login">تسجيل الدخول</Link></strong></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterAdmin;
