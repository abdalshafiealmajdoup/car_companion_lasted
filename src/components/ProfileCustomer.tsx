import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer } from '../store/slices/CustomerSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const placeholders = {
  Name: 'الإسم الكامل',
  Email: 'البريد الإلكتروني',
  Password: 'كلمة المرور',
  ConfirmPassword: 'تأكيد كلمة المرور',
};

function ProfileCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer);
  const customerID = localStorage.getItem('customerID');
  const customerName = localStorage.getItem('customerName');
  const customerEmail = localStorage.getItem('customerEmail');
  const customerPhone = localStorage.getItem('customerPhone');

  const [formData, setFormData] = useState({
    Name: customerName,
    Email: customerEmail,
    Phone: customerPhone,
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
      setErrors({ ConfirmPassword: ["كلمتا المرور غير متطابقتين"] });
      Swal.fire('خطأ!', 'كلمة المرور وتأكيدها غير متطابقتين.', 'error');
      return;
    }

    try {
      const { ConfirmPassword, ...dataToUpdate } = formData;
      await dispatch(updateCustomer({ id: customerID, ...dataToUpdate })).unwrap();
      Swal.fire('نجاح', 'تم تحديث الحساب بنجاح.', 'success').then(() => {
        navigate("/login-gest-user");
      });
    } catch (error) {
      console.log(error);
      Swal.fire('خطأ!', 'حدث خطأ أثناء تحديث الحساب.', 'error');
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(Object.entries(error.response.data.errors).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }), {}));
      }
    }
  };

  return (
    <section id="hero-tow" className="d-flex align-items-center" style={{ width: "100%" }}>
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تحديث حساب الزبون</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
            <form onSubmit={handleSubmit} className="formRe">
              {Object.keys(formData).map((key) => (
                key !== 'ConfirmPassword' && (
                  <div key={key} className="form-group mb-3 inpo">
                    <input
                      type={key === 'Password' ? 'password' : key === 'Email' ? 'email' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={placeholders[key]}
                    />
                    {errors[key] && <div style={{ color: 'red', fontSize: 'small' }}>{errors[key][0]}</div>}
                  </div>
                )
              ))}
              <div className="form-group mb-3 inpo">
                <input
                  type='password'
                  name='ConfirmPassword'
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder={placeholders.ConfirmPassword}
                />
                {errors.ConfirmPassword && <div style={{ color: 'red', fontSize: 'small' }}>{errors.ConfirmPassword[0]}</div>}
              </div>
              <input type="submit" className="btnRegister btnr" value="تحديث الحساب" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCustomer;
