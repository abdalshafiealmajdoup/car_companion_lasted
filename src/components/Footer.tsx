function Footer() {
  return (
    <section id="footer">
    <div className="footer-top">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="info-class-all"><strong>رقم الهاتف :</strong>218919977055</div>
                    <div className="info-class-all"><strong>البريد الإلكتروني:</strong> car.companion@info.ly</div>
                    <div className="info-class-all"><strong>المكان :</strong>  ليبيا - طرابلس </div>
                </div>

                <div className="col-lg-2 col-md-6 footer-links">
                    <h4>روابط مفيدة</h4>
                    <ul>
                        <li>
                            <i className="bx bx-chevron-right"></i> <a href="/">الصفحة الرئيسية</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="#details">حول</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">الخدمات</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="#contact">تواصل معنا</a>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-6 footer-links">
                    <h4>حول خدماتنا</h4>
                    <ul>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">سحب ونقل</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">شحن البطارية</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">تصليح السيارة</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">تعبئة وقود</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right"></i>{" "}
                            <a href="/client-interface">فتح القفل</a>
                        </li>
                    </ul>
                </div>

               
            </div>
        </div>
    </div>

    <div className="container">
        <div className="copyright">
            &copy; جميع الحقوق{" "}
            <strong>
                <span>محفوظة</span>
            </strong>
            . لرفيق السيارة
        </div>
    </div>
</section>
  )
}

export default Footer