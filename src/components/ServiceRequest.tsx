import "../assets/css/LoginGestUser.css";
import { useNavigate } from 'react-router-dom';

function ServiceRequest() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('tokenCustomer');
    if (!token) {
      navigate('/choose-logins'); 
      window.location.reload()
    }
  }, [navigate]);
  return (
    <div>
            <section id="hero-tow" class="d-flex align-items-center">
    <div class="container position-relative" >
      <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-9 text-center">
          <h1>خدمة شحن البطارية</h1>
          <h2>أشحن بطارية سيارتك وانت في أي مكان في ليبيا</h2>
        </div>
      </div>
      <div class="text-center">
        <a href="#about" class="btn-get-started scrollto">الإستمرار في طلب الخدمة</a>
      </div>
    
    </div>
  </section>

<section id="about-tow" class="about-tow">
      <div class="container" >

        <div class="section-title">
          <h2>حول الخدمة</h2>
          <p>شحن البطارية</p>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <p>
            ما هي خدمة شحن البطارية؟
خدمة شحن البطارية هي خدمة تقدمها مراكز الصيانة وورش الإصلاح لأجهزة محمولة وأجهزة إلكترونية تعتمد على بطاريات قابلة للشحن. هذه الخدمة تهدف إلى إعادة شحن البطارية بعد استنزافها نتيجة للاستخدام المكثف أو تلفها مما يساعد في استعادة أداء الجهاز بشكل طبيعي.
            </p>
            <ul>
              <li>ضعف أداء البطارية: عندما تلاحظ أن البطارية تفرغ بسرعة أو لا تحتفظ بالشحنة لفترة طويلة.
              <i class="ri-check-double-line"></i> </li>
              <li><i class="ri-check-double-line"></i> سخونة البطارية: عندما تصبح البطارية ساخنة بشكل غير عادي أثناء الشحن.
</li>
              <li><i class="ri-check-double-line"></i> 
تأثر أداء الجهاز: إذا بدأ أداء الجهاز في الانخفاض بشكل ملحوظ أو بدأ تشغيله أو إيقافه بشكل غير متوقع.</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p>
            تقييم الحالة: أولاً، يقوم فنيو الصيانة بتقييم حالة البطارية وجهازها لتحديد ما إذا كانت بحاجة إلى شحن أو استبدال.
الشحن: في حالة البطاريات التي يمكن شحنها، سيتم توصيل الجهاز بمصدر طاقة خاص لإعادة شحن البطارية.
            </p>
          </div>
        </div>

      </div>
    </section>
    <section id="counts-tow" class="counts-tow">
      <div class="container" >
      <h2 className="mb-3">مراكز الخدمة القريبة منك</h2>

        <div class="row no-gutters">

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div class="count-box">
            <i className="bi bi-tools"></i>

              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
              <strong>مركز الصيانة الممتاز</strong> 
              <a href="#">اكتشف المزيد &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div class="count-box">
            <i className="bi bi-tools"></i>

              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
              <strong>مركز الصيانة المحترف</strong> 
              <a href="#">اكتشف المزيد &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div class="count-box">
            <i className="bi bi-tools"></i>

              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
              <strong>مركز الصيانة اليبي</strong> 
              <a href="#">اكتشف المزيد &raquo;</a>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
          <div class="count-box">
            <i className="bi bi-tools"></i>

              <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" class="purecounter"></span>
              <strong>مركز  صيانة الشريف</strong> 
              <a href="#">اكتشف المزيد &raquo;</a>
            </div>
          </div>

        </div>

      </div>
    </section>

    </div>

  )
}

export default ServiceRequest