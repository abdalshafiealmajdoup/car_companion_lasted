import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders,deleteOrder } from "../store/slices/OrderRequestSlice"; 
import Swal from 'sweetalert2';

function OrderListAdmin() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders); 
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);
  const handleDelete = (orderId) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "لن تتمكن من التراجع عن هذا!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(orderId));
        Swal.fire('تم الحذف!', 'تم حذف الطلب.', 'success');
      }
    });
  };
  return (
    <div className="p-4 w-100">
      <div className="p-4 border border-2 rounded">
        <section className="bg-light p-3">
          <div className="bg-white shadow-sm rounded overflow-hidden">
            <div className="d-flex align-items-center p-3">
              <h2 className="text-primary fw-bold">قائمة الطلبات</h2>
            </div>

            <div className="table-responsive">
              <table className="table text-right text-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نوع السيارة</th>
                    <th>الحالة</th>
                    <th>رقم الهاتف</th>
                    <th>البريد الإلكتروني</th>
                    <th>الخدمة المطلوبة</th>
                    <th>المدينة</th>
                    <th>المنطقة</th>
                    <th>ملاحظات</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.OrderID}>
                      <th scope="row">{index + 1}</th>
                      <td>{order.CarType}</td>
                      <td>{order.StatusOrder}</td>
                      <td>{order.PhoneNumber}</td>
                      <td>{order.Email}</td>
                      <td>{order.service_name}</td>  
                      <td>{order.City}</td>
                      <td>{order.Region}</td>
                      <td>{order.CustomerNotes}</td>
                      <td className="d-flex justify-content-end">
                        {/* <button className="btn btn-primary me-1 m-1">عرض</button>
                        <button className="btn btn-warning me-1 m-1">تعديل</button> */}
                        <button className="btn btn-danger m-1" onClick={() => handleDelete(order.OrderID)}>حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {status === 'loading' && <p>Loading...</p>}
              {error && <p>{error}</p>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OrderListAdmin;
