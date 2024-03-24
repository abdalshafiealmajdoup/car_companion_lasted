import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutCustomer } from '../store/slices/CustomerSlice'; 


import '../styles/App.css';
function Navbar() {
  const dispatch = useDispatch();
  // const tokenCustomer = useSelector((state) => state.customers.tokenCustomer);
  const tokenCustomer = useSelector(() =>  localStorage.getItem('tokenCustomer'))

 
  const handleLogout = async () => {
    await dispatch(logoutCustomer());
  };
  return (
<header id="header" class="fixed-top">
<div class="container d-flex align-items-center justify-content-between">

<h1><a href="/"><span className="logo-name">رفيق السيارة</span></a></h1>

  <a href="/" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"/></a>

  <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="/">الصفحة الرئيسية </a></li>
            <li className="dropdown"><a href="/client-interface">الخدمات<i className="nav-link scrollto"></i></a>
              {/* <ul> */}
                {/* <li><a href="/client-interface">سحب السايرة</a></li> */}
                {/* <li><a href="/client-interface"> تعبئة وقود</a></li> */}
                {/* <li><a href="/client-interface">شحن البطارية</a></li> */}
                {/* <li><a href="/client-interface">فتح الأقفال</a></li> */}
              {/* </ul> */}
            </li>`
            <li><a className="nav-link scrollto" href="#contact">تواصل معنا</a></li>
            <li><a className="nav-link scrollto" href="#details">حول</a></li>
            <li><a className="nav-link scrollto" href="/request-success">طلباتي</a></li>
            {!tokenCustomer && (
              <>
              
              <li> <button className="btn-login btn-signup"><Link className="nav-link btn btn-primary scrollto btn-login-link " to="/choose-logins">إنشاء حساب جديد</Link></button></li>  
              <li> <button className="btn-login"><Link className="nav-link btn btn-primary scrollto btn-login-link" to="/choose-logins">تسجيل الدخول</Link></button></li>
              </>
            )}
            {tokenCustomer && (
              
              
              <li> <button className="btn btn-primary" onClick={handleLogout}>تسجيل الخروج</button></li>  
            )}
            

          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

</div>
</header>
  );
}

export default Navbar;




