import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../store/slices/CustomerSlice';
import { fetchServiceCenters } from '../store/slices/ServiceCenter';
import { fetchAllAdmins } from '../store/slices/AdminSlice';
import { fetchOrders } from '../store/slices/OrderRequestSlice';
import { fetchContacts } from '../store/slices/ContactSlice';
function ReportAdmin() {
  const dispatch = useDispatch();

  const { orders, status: ordersStatus } = useSelector((state) => state.orders);
  const { customers } = useSelector((state) => state.customers);
  const { serviceCenters } = useSelector((state) => state.serviceCenters);
  const { list: admins } = useSelector((state) => state.admins);
  const { contacts } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCustomers());
    dispatch(fetchServiceCenters());
    dispatch(fetchAllAdmins());
    dispatch(fetchContacts());
  }, [dispatch]);

  const completedOrders = orders.filter(order => order.StatusOrder === 'completed').length;
  const pendingOrders = orders.filter(order => order.StatusOrder === 'waiting').length;
  
  return (
<section class="container">
  <div class="row">
  <div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div className="card border-primary">
        <div className="card-body bg-primary text-white">
          <div className="row">
            <div className="col-3">
              <i className="bi bi-list-ul fa-5x"></i>
            </div>
            <div className="col-9 text-right">
              <h1>{orders.length}</h1>
              <h4>كل الطلبات</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
    </div>

    <div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div className="card border-warning">
        <div className="card-body bg-warning text-white">
          <div className="row">
            <div className="col-3">
              <i className="bi bi-alarm-fill fa-5x"></i>
            </div>
            <div className="col-9 text-right">
              <h1>{pendingOrders}</h1>
              <h4>طلبات قيد الإنتظار</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
    </div>

<div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div className="card border-success">
        <div className="card-body bg-success text-white">
          <div className="row">
            <div className="col-3">
              <i className="bi bi-bag-check fa-5x"></i>
            </div>
            <div className="col-9 text-right">
              <h1>{completedOrders}</h1>
              <h4>الطلبات المكتملة</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
    </div>

 <div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div className="card border-info">
        <div className="card-body bg-info text-white">
          <div className="row">
            <div className="col-3">
              <i className="bi bi-people-fill fa-5x"></i>
            </div>
            <div className="col-9 text-right">
              <h1>{admins.length}</h1>
              <h4>إجمالي الإداريين</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
    </div>

  <div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div className="card border-secondary">
        <div className="card-body bg-secondary text-white">
          <div className="row">
            <div className="col-3">
              <i className="bi bi-people-fill fa-5x"></i>
            </div>
            <div className="col-9 text-right">
              <h1>{customers.length}</h1>
              <h4>إجمالي الزبائن</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
      
    </div>

    <div class="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
      <div class="card border-info">
        <div class="card-body bg-info text-white">
          <div class="row">
            <div class="col-3">
              <i class="bi bi-car-front fa-5x"></i>
            </div>
            <div class="col-9 text-right">
<h1>{serviceCenters.length}</h1>
              <h4>إجمالي مراكز الصيانة</h4>
            </div>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/younes-elmorabit" target="_blank">
          <div class="card-footer bg-light text-info">
            <span class="float-left">عرض الكل</span>
            <span class="float-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
          </div>
        </a>
      </div>
    </div>
    <div className="col-lg-4 col-md-6" style={{ marginTop: "20px" }}>
  {/* <div className="card border-dark">
    <div className="card-body bg-dark text-white">
      <div className="row">
        <div className="col-3">
          <i className="bi bi-envelope-fill fa-5x"></i>
        </div>
        <div className="col-9 text-right">
          <h1>{contacts.length}</h1>
          <h4>إجمالي الاستفسارات</h4>
        </div>
      </div>
    </div>
    <a href="#" target="_blank">
      <div className="card-footer bg-light text-dark">
        <span className="float-left">عرض الكل</span>
        <span className="float-right"><i className="fa fa-arrow-circle-right"></i></span>
        <div className="clearfix"></div>
      </div>
    </a>
  </div> */}
</div>
  </div>
</section>
  );
}

export default ReportAdmin;
