import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerOrders, selectAllOrders, getOrdersStatus } from '../store/slices/OrderRequestSlice';
import "../assets/css/LoginGestUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function formatDateString(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}

function RequestSuccess() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(getOrdersStatus);

  useEffect(() => {
    if (status === 'idle') {
      let customer_id = localStorage.getItem("customerID")
      dispatch(fetchCustomerOrders(customer_id));
    }
  }, [status, dispatch]);

  const services = [
    { id: "1", name: "الصيانة المتنقلة", cost: "50 دينار" },
    { id: "2", name: "السحب والنقل" , cost: "35 دينار"},
    { id: "3", name: "تعبئة الوقود", cost: "10 دينار" },
    { id: "4", name: "شحن البطارية" , cost: "15 دينار"},
    { id: "5", name: "فتح الأقفال" , cost: "20 دينار"},
  ];
  const statusOrders = [
    { key: "approved", name: "تم القبول" },
    { key: "rejected", name: "تم الرفض" },
    { key: "waiting", name: "قيد الإنتظار" },
    { key: "completed", name: "مكتمل" },
  ];
  function getStatusClass(statusOrder) {
    switch (statusOrder) {
      case "waiting":
        return "table-primary";
      case "rejected":
        return "table-danger";
      case "completed":
        return "table-success";
      case "approved":
        return "table-info";
    }
  }
  const getStatusNameByKey = (statusKey) => {
    const status = statusOrders.find(status => status.key === statusKey);
    return status ? status.name : "غير معروف";
  };
  const getServiceNameById = (serviceId) => {
    const service = services.find(service => service.id === serviceId.toString());
    return service ? service.name : "غير معروف";
  };
  const getServiceCostById = (serviceId) => {
    const service = services.find(service => service.id === serviceId.toString());
    return service ? service.cost : "غير محددة";
  };
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
      <section id="hero-tow" className="d-flex align-items-center">
        <div className="container position-relative" >
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 text-center">
              <h1>طلبــاتي</h1>
              {/*  <h2>سوف يتم التواصل معك من قبل مركز الصيانة</h2> */}
              {/* <i class="bi bi-check2-circle fs-1 text-success"></i> */}
            </div>
            
          </div>

        </div>
      </section>

      <section id="about-tow" className="about-tow">
        <div className="container" >

          <div className="section-title">
            <h2>طلباتي</h2>
          </div>

          <div className="container">
            <div >
              <div className="col-lg-12 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="card mb-3 w-100">

 <div className="card-body">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">رقم الطلب</th>
                        <th scope="col">نوع الطلب</th>
                        <th scope="col">حالة الطلب</th>
                        <th scope="col">تكلفة الطلب</th>
                        <th scope="col">تاريخ إنشاء الطلب</th>
                        <th scope="col">تاريخ تعديل الطلب</th>
                      </tr>
                    </thead>
                    <tbody>
  {orders.map((order, index) => (
    <tr key={index} className={getStatusClass(order.StatusOrder)}>
      <th scope="row">{index + 1}</th>
      <td>{order.OrderID}</td>
      <td>{getServiceNameById(order.ServiceID)}</td>
      <td>{getStatusNameByKey(order.StatusOrder)}</td>
      <td>{getServiceCostById(order.ServiceID)}</td>
      <td>{formatDateString(order.created_at)}</td>
      <td>{formatDateString(order.updated_at)}</td>

    </tr>
  ))}
</tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
            <div className="col-3">
            
            <button className="btn-back btn btn-primary"><a href="/client-interface" className="btn-back btn btn-primary">الرجوع إلى قائمة الخدمات</a></button>
        

          
          </div>
          </div>

        </div>
        
      </section>

    </div>


  )
}

export default RequestSuccess