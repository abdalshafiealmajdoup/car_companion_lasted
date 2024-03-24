import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/OrderRequestSlice"; 
function RequestProcessing() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders); 
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

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
                    <th>المدينة</th>
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
                      <td>{order.City}</td>
                      <td className="d-flex justify-content-end">
                        <button className="btn btn-primary me-1 m-1">عرض</button>
                        <button className="btn btn-warning me-1 m-1">تعديل</button>
                        <button className="btn btn-danger m-1">حذف</button>
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

export default RequestProcessing;
