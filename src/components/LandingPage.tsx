import heroImage1 from "../assets/img/Team goals-bro.png";
import heroImage2 from "../assets/img/viosn1.jpeg";
import heroImage3 from "../assets/img/vison2.jpeg";
import heroImage5 from "../assets/img/Car accesories-bro.png";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../store/slices/ContactSlice';
import Footer from './Footer';
import Swal from 'sweetalert2';
const MainSection = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createContact(formData));
      Swal.fire('Success', 'تم إرسال الرسالة بنجاح!', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        description: ''
      });
    } catch (error) {
      console.error('حدث خطأ أثناء إرسال الرسالة:', error);
      Swal.fire('Error', 'حدث خطأ أثناء إرسال الرسالة', 'error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main id="main" style={{ background: "#05042C" }}>
      <section id="details" className="details">
        <div className="container">
          {/* الكود هنا للتفاصيل الأولى */}
        </div>
      </section>
      <section id="contact" className="d-flex justify-content-around align-content-center ">
        <div style={{ width: "70%" }}>
          <div className="section-title text-center">
            <p style={{ color: "#FFF" }}>تواصل معنا</p>
          </div>
          <div className="">
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="إسمك كامل"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="بريدك الإلكتروني"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="العنوان"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="نص الرسالة"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn-submit-contactus">إرسال البريد الإلكتروني</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MainSection;
