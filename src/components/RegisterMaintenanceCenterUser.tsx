import  { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { registerServiceCenter } from '../store/slices/ServiceCenter';
import { fetchCarTypes, selectAllCarTypes } from '../store/slices/carTypesSlice';
import { Link } from "react-router-dom";

function RegisterServiceCenter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carTypesFromStore = useSelector(selectAllCarTypes); 
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    ServicesOffered: [],
    CarTypesServiced: [],
    City:  '',
    Region:  '',
    Password: '',
    ConfirmPassword: ''
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);

  useEffect(() => {
    dispatch(fetchCarTypes());
  }, [dispatch]);

  const servicesOptions = [
    { label: "الصيانة المتنقلة", value: "1" },
    { label: "السحب والنقل", value: "2" },
    { label: "تعبئة الوقود", value: "3" },
    { label: "شحن البطارية", value: "4" },
    { label: "فتح الأقفال", value: "5" },
  ];
  const placeholders = {
    Name: 'اسم مركز الصيانة',
    Phone: 'رقم الهاتف',
    Email: 'البريد الإلكتروني',
    ServicesOffered: 'الخدمات المقدمة',
    CarTypesServiced: 'أنواع السيارات المخدومة',
    Password: 'كلمة المرور',
    ConfirmPassword: 'تأكيد كلمة المرور'
  };

  const carTypesOptions = carTypesFromStore.map(carType => ({
    value: carType.id.toString(),
    label: carType.name
  }));

  const handleServiceChange = selectedOptions => {
    setSelectedServices(selectedOptions);
    setFormData({ ...formData, ServicesOffered: selectedOptions.map(option => option.value) });
  };

  const handleCarTypeChange = selectedOptions => {
    setSelectedCarTypes(selectedOptions);
    setFormData({ ...formData, CarTypesServiced: selectedOptions.map(option => option.value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.Password !== formData.ConfirmPassword) {
      Swal.fire('خطأ!', 'كلمة المرور وتأكيدها غير متطابقتين.', 'error');
      return;
    }
  
    try {
      const { ConfirmPassword, ...dataToSubmit } = formData;
      await dispatch(registerServiceCenter(dataToSubmit)).unwrap();
      Swal.fire('نجاح!', 'تم التسجيل بنجاح!', 'success').then(() => {
        navigate("/login-maintenance-center-user");
      });
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء محاولة التسجيل، يرجى المحاولة مرة أخرى.', 'error');
    }
  };
  
  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div className="container position-relative" >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تسجيل مركز الصيانة</h3>
          </div>
        </div>
        <div className="register-style">
          <div className="register-form">
          <form onSubmit={handleSubmit} className="formRe">
  <div className="form-group mb-3 inpo">
    <label className="p-1">اسم مركز الصيانة</label>
    <input
      type="text"
      name="Name"
      value={formData.Name}
      onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
      className="form-control"
      required
    />
  </div>

  <div className="form-group mb-3 inpo">
     <label className="p-1">رقم الهاتف</label>
    <input
      type="text"
      name="Phone"
      value={formData.Phone}
      onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
    label  className="form-control"
      required
    />
  </div>

  <div className="form-group mb-3 inpo">
     <label className="p-1">البريد الإلكتروني</label>
    <input
      type="email"
      name="Email"
      value={formData.Email}
      onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <div className="form-group mb-3 inpo">
  <label htmlFor="services">الخدمات المقدمة:</label>
  <Select
          options={servicesOptions}
          value={selectedServices}
          onChange={handleServiceChange}
          isMulti
          closeMenuOnSelect={false}
        />
  </div>

  <div className="form-group mb-3 inpo">
  <label htmlFor="carTypes">أنواع السيارات المخدومة:</label>
  <Select
          options={carTypesOptions}
          value={selectedCarTypes}
          onChange={handleCarTypeChange}
          isMulti
          closeMenuOnSelect={false}
        />
  </div>
  <div className="form-group mb-3 inpo">
    <label className="p-1">المدينة</label>
    <input
      type="text"
      name="Name"
      value={formData.City}
      onChange={(e) => setFormData({ ...formData, City: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <div className="form-group mb-3 inpo">
    <label className="p-1">المنطقة</label>
    <input
      type="text"
      name="Name"
      value={formData.Region}
      onChange={(e) => setFormData({ ...formData, Region: e.target.value })}
      className="form-control"
      required
    />
  </div>
  <div className="form-group mb-3 inpo">
     <label className="p-1">كلمة المرور</label>
    <input
      type="password"
      name="Password"
      value={formData.Password}
      onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
      className="form-control"
      required
    />
  </div>

  <div className="form-group mb-3 inpo">
     <label className="p-1">تأكيد كلمة المرور</label>
    <input
      type="password"
      name="ConfirmPassword"
      value={formData.ConfirmPassword}
      onChange={(e) => setFormData({ ...formData, ConfirmPassword: e.target.value })}
      className="form-control"
      required
    />
  </div>



  <input type="submit" className="btnRegister btnr" value="إنشاء حساب جديد" />

  <p>هل تمتلك حساب بالفعل : <strong><Link to="/login-maintenance-center-user">تسجيل الدخول</Link></strong></p>
</form>

          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterServiceCenter;
