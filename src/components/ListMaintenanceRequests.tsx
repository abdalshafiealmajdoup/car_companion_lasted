import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../store/slices/OrderRequestSlice";
import Swal from 'sweetalert2';
import { fetchCities } from "../store/slices/citiesSlice";
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
import {
  fetchCarTypes,
  selectAllCarTypes,
} from "../store/slices/carTypesSlice";
function ListMaintenanceRequests() {
  const cities = useSelector((state) => state.cities.cities);
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAreaMapUrl, setSelectedAreaMapUrl] = useState("");

  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [areas, setAreas] = useState([]);

  const carTypes = useSelector(selectAllCarTypes);
  
  const statusOrders = [
    { key: "approved", name: "تم القبول" },
    { key: "rejected", name: "تم الرفض" },
    { key: "waiting", name: "قيد الإنتظار" },
    { key: "completed", name: "مكتمل" },
  ];

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

  const handleEdit = (order) => {
    setCurrentOrder(order);
  };

  const saveChanges = () => {
    if (currentOrder) {
      dispatch(updateOrder(currentOrder)).then(() => {
        dispatch(fetchOrders()).then(() => {
          setCurrentOrder(null); 
          Swal.fire('تم!', 'تم تعديل الطلب بنجاح.', 'success');
        });
      }).catch((error) => {
        Swal.fire('خطأ!', 'حدث خطأ أثناء تعديل الطلب.', 'error');
      });
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchCarTypes());
  }, [dispatch]);
  const handleCityChange = (e) => {
    const selectedCityId = parseInt(e.target.value);
    setSelectedCity(selectedCityId);
    const selectedCityData = cities.find((city) => city.id === selectedCityId);
    setAreas(selectedCityData ? selectedCityData.areas : []);
    setSelectedArea("");
  };
  const handleAreaChange = (e) => {
    const selectedAreaId = parseInt(e.target.value);
    setSelectedArea(selectedAreaId);
    const selectedAreaData = areas.find((area) => area.id === selectedAreaId);
    setSelectedAreaMapUrl(selectedAreaData ? selectedAreaData.addresIdMap : "");
  };
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);
  const filteredCarTypes = carTypes.filter((carType) =>
  carType.name.toLowerCase().includes(searchTerm.toLowerCase())
);
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
                  <th>تاريخ الإنشاء</th>
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
                    <td>{formatDateString(order.created_at)}</td>

                    <td className="d-flex justify-content-end">
                      {/* <button className="btn btn-primary me-1 m-1">عرض</button> */}
                      <button className="btn btn-warning me-1 m-1" data-bs-toggle="modal" data-bs-target="#editOrderModal" onClick={() => handleEdit(order)}>تحديث حالة الطلب</button>                     
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
      <div className={`modal fade ${currentOrder ? 'show' : ''}`} id="editOrderModal" tabIndex="-1" aria-labelledby="editOrderModalLabel" aria-hidden={!currentOrder}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editOrderModalLabel">تعديل الطلب</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {currentOrder && (
                <form>      
                  <div className="mb-3">
                    <label htmlFor="statusOrder" className="form-label"> تغيير الحالة </label>
                    <select
                      className="form-select"
                      id="statusOrder"
                      value={currentOrder.StatusOrder || ''}
                      onChange={(e) => setCurrentOrder({ ...currentOrder, StatusOrder: e.target.value })}
                    >
                      {statusOrders.map((statusItem) => (
                        <option key={statusItem.key} value={statusItem.key}>{statusItem.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="CustomerNotes" className="form-label"> إضافة ملاحظات</label>
                    <textarea className="form-control" id="CustomerNotes" name="CustomerNotes" value={currentOrder.CustomerNotes} onChange={(e) => setCurrentOrder({ ...currentOrder, CustomerNotes: e.target.value })}></textarea>
                  </div>  
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
              <button type="button" className="btn btn-primary" onClick={saveChanges}>حفظ التغييرات</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMaintenanceRequests;
