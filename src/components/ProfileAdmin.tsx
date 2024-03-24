import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { updateAdmin } from '../store/slices/AdminSlice'; 

const placeholders = {
    Name: 'الإسم الكامل',
    Email: 'البريد الإلكتروني',
    Password: 'كلمة المرور',
    ConfirmPassword: 'تأكيد كلمة المرور',
};

function UpdateAdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminID = localStorage.getItem('AdminID');
  const AdminName= localStorage.getItem('AdminName');
  const AdminEmail = localStorage.getItem('AdminEmail');

  const [formData, setFormData] = useState({
    Name: AdminName,
    Email: AdminEmail,
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
    const Response =  await dispatch(updateAdmin({ AdminID: Number(adminID), ...dataToUpdate })).unwrap();
      if (Response.data.status === 200) {
        Swal.fire('نجاح', 'تم تحديث الحساب بنجاح.', 'success').then(() => {
          navigate("/admin/profile");
        });
      }
    } catch (error) {
      Swal.fire('نجاح', 'تم تحديث الحساب بنجاح.', 'success');
      navigate("/admin/profile");
      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data;
        setErrors(Object.entries(errorData.errors).reduce((acc, [key, value]) => ({
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
            <h3>تحديث حساب الإداري</h3>
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

export default UpdateAdminProfile;
