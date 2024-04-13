import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const errorTranslations: Record<string, string> = {
  "The Password field is required.": "حقل كلمة المرور مطلوب.",
  "The Confirm Password field is required.": "حقل تأكيد كلمة المرور مطلوب.",
  "The Confirm Password field must match the Password field.": "يجب أن يتطابق حقل تأكيد كلمة المرور مع حقل كلمة المرور."
};
const placeholders = {
  Password: 'كلمة المرور',
  ConfirmPassword: 'تأكيد كلمة المرور'
};
const translateError = (error: string) => errorTranslations[error] || error;

function ResetPasswordCusomer() {
  const phone = localStorage.getItem('customerPhone') || '';
  const [formData, setFormData] = useState({
    new_password: '',
    ConfirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/customers/reset-password", {
        Phone: phone,
        new_password: formData.new_password,
        ConfirmPassword: formData.ConfirmPassword
      });
      if (response.status === 200) {
        Swal.fire(
          'تمت إعادة تعيين كلمة المرور بنجاح!',
          '',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            navigate('/login-gest-user'); // Redirect to login page
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
            <h3>إعادة تعيين كلمة المرور</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <div className="">
              <form onSubmit={handleSubmit} className="formRe">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="form-group mb-3 inpo">
                    <input
                      type={key === 'Password' || key === 'ConfirmPassword' ? 'password' : 'text'}
                      name={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={placeholders[key as keyof typeof placeholders]}
                    />
                    {errors[key] && <div style={{ color: 'red', fontSize: 'small' }}>{translateError(errors[key][0])}</div>}
                  </div>
                ))}
                <input type="submit" className="btnRegister btnr" value="إعادة تعيين كلمة المرور" />
              </form>
              <p>لديك حساب؟ <Link to="/login">تسجيل الدخول</Link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordCusomer;
