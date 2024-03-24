import '../assets/css/ChooseLogins.css'
import { Link } from "react-router-dom";
function ChooseLogins() {
  return (
    <section id="hero-tow" className="d-flex align-items-center next-style-hero ">
    <div className=" next-style-heroo " >
      <div className= " container  position-relative">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9 text-center">
          <h1>قم بتحديد صفة الدخول </h1>
        </div>
      </div>


      <div className="row icon-boxes">
        <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-5 mb-lg-0 item-hero-login" >
          <div className="icon-box loginhero-ls">
            <div className="icon d-flex justify-content-center "><i className="bi bi-people"></i></div>
            <h4 className="title d-flex justify-content-center"><a href="">زبون</a></h4>
            <p className="description">انضم إلينا بصفتك زبون أو قم بتسجيل الدخول، واستمتع بمجموعة خدماتنا الرائعة المصمَّمة خصيصًا لك</p>
            <div className="text-center">
            <Link className="btn-get-started scrollto new-style-btn mx-2" to="/register-gest-user">حساب جديد</Link>
            <Link className="btn-get-started scrollto new-style-btn mx-2" to="/login-gest-user">لديك حساب</Link>


      </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-5 mb-lg-0">
          <div className="icon-box loginhero-ls">
            <div className="icon icon d-flex justify-content-center "><i className="bi bi-gear-wide-connected" ></i></div>
            <h4 className="title d-flex justify-content-center"><a href="">مركز صيانة</a></h4>
            <p className="description">هل تبحث عن مركز صيانة موثوق؟ قدّم خدمات صيانتك الآن واستفد من خبرتنا في تقديم أعلى مستويات الجودة لعملائنا.</p>
            <div className="text-center">
            <Link className="btn-get-started scrollto new-style-btn mx-2" to="/register-maintenance-center-user">حساب مركز جديد</Link>
            <Link className="btn-get-started scrollto new-style-btn mx-2" to="/login-maintenance-center-user">لديك حساب</Link>


      </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
  )
}

export default ChooseLogins