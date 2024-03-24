import heroImage1 from "../assets/img/Team goals-bro.png";
import heroImage2 from "../assets/img/viosn1.jpeg";
import heroImage3 from "../assets/img/vison2.jpeg";
import heroImage5 from "../assets/img/Car accesories-bro.png";
import Footer from './Footer';
const MainSection = () => {
    return (
        <main id="main " style={{"background": "#05042C"}}> 
            <section id="details" className="details">
                <div className="container">
                    <div className="row content">
                        <div className="col-md-4">
                            <img
                            src={heroImage3}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <div className="col-md-8 pt-4" >
                            <h3 style={{"color": "#FFF"}} >
                            رؤيتنا                            </h3>
                            <ul>
                                <li style={{"color": "#FFF"}}>
                                رؤيتنا هي أن نكون الشريك الأمثل لكل من يمتلك سيارة، حيث نسعى لتحقيق تجربة استخدام مميزة وسهلة في عالم صيانة السيارات. نهدف إلى أن نكون الخيار الأول للأفراد الذين يبحثون عن حلاً شاملاً لاحتياجات سياراتهم، سواء كان ذلك للصيانة الدورية أو إصلاحات الطوارئ.                                     </li>
                   
                            </ul>
                        </div>
                    </div>

                    <div className="row content">
                        <div className="col-md-4 order-1 order-md-2" >
                            <img
                                src={heroImage2}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <div
                            className="col-md-8 pt-5 order-2 order-md-1"
                            
                        >
                            <h3 style={{"color": "#FFF"}}> أهدافنا</h3>
                            <p style={{"color": "#FFF"}}>تقديم خدمات عالية الجودة: نهدف إلى تقديم خدمات صيانة وإصلاح سيارات عالية الجودة، تلبي احتياجات وتوقعات عملائنا بكفاءة واحترافية.
تسهيل تجربة المستخدم: نسعى لتوفير تجربة استخدام سهلة وميسرة من خلال تطبيق يتيح للعملاء حجز ومتابعة خدمات الصيانة والإصلاح بكل يسر.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className=" d-flex justify-content-around align-content-center ">
                <div style={{"width": "70%"}}>
                    <div className="section-title text-center" >
                        <p style={{"color": "#FFF"}}>تواصل معنا</p>
                    </div>
                    <div className="">
                        <div
                            className=""
                        >
                            <form
                                action="forms/contact.php"
                                method="post"
                                role="form"
                                className=""
                            >
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="إسمك كامل"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            id="email"
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
                                        id="subject"
                                        placeholder="العنوان"
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <textarea
                                        className="form-control"
                                        name="message"
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
<Footer/>
        </main>
    );
};

export default MainSection;
