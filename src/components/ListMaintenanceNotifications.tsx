import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/OrderRequestSlice"; 
import "../assets/css/cards.css";
import images from "../assets/img/images.png"

function formatDateString(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}
function ListMaintenanceNotifications() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders); 
  const orderStatus = useSelector(state => state.orders.status);
  const [hiddenCards, setHiddenCards] = useState({});  

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders());
    }
  }, [dispatch, orderStatus]);
  const toggleCardVisibility = (orderId) => {
    const newHiddenCards = new Map(hiddenCards);
    newHiddenCards.set(orderId, !newHiddenCards.get(orderId));
    setHiddenCards(newHiddenCards);
  };
  return (
    <div className="p-4 w-100">
      <div className="p-4 border border-2 rounded">
        <section className="bg-light p-3">
          <div className="bg-white shadow-sm rounded overflow-hidden">
            <div className="d-flex align-items-center p-3">
              <h2 className="text-primary fw-bold">قائمة الإشعارات</h2>
            </div>
            <div className="table-responsive">
              {orders.map(order => (
                <div key={order.OrderID} className="cardss bg-light-subtle mt-4 p-3">
                  <div className="d-flex">
                    <img src={images} className="cards-img-top" alt="..."/>
                    <div className="cardss-body">
                      <div className="text-section">
                        <h5 className="cards-title fw-bold">{order.ServiceID}</h5>
                        <p className="cards-text">البريد الإلكتروني : {order.Email}</p>
                        <p className="cards-text">نوع الخدمة : {order.service_name}</p>
                        <p className="cards-text">رقم الهاتف : {order.PhoneNumber}</p>
                        <p className="cards-text">المكان : {order.City} - {order.Region}</p>
                        <p className="cards-text">الأحداثيات : <a href={`https://www.google.com/maps/place/?q=place_id:${order.GooglePlaceID}`} target="_blank" rel="noopener noreferrer">عرض على الخريطة</a></p>                        <p className="cards-text">تاريخ الطلب : {formatDateString(order.created_at)}</p>
                      </div>
                      <div className="cta-section">
                      {/* <button className="btn btn-dark" onClick={() => toggleCardVisibility(order.OrderID)}>إخفاء</button> */}
                        <a href="/maintenance-center/list-maintenance-requests" className="btn btn-dark">معالجة الطلب</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListMaintenanceNotifications;
