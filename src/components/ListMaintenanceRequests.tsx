import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../store/slices/OrderRequestSlice";
import Swal from 'sweetalert2';
import { fetchCities } from "../store/slices/citiesSlice";

import {
  fetchCarTypes,
  selectAllCarTypes,
} from "../store/slices/carTypesSlice";
function ListMaintenanceRequests() {
  const cities = useSelector((state) => state.cities.cities);
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [areas, setAreas] = useState([]);

  const carTypes = useSelector(selectAllCarTypes);


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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchCarTypes());
  }, [dispatch]);
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = parseInt(e.target.value);
    setSelectedCity(selectedCityId);
    const selectedCityData = cities.find((city) => city.id === selectedCityId);
    setAreas(selectedCityData ? selectedCityData.areas : []);
    setSelectedArea("");
  };
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                        <button className="btn btn-primary me-1 m-1">عرض</button>
                        <button className="btn btn-warning me-1 m-1" data-bs-toggle="modal" data-bs-target="#editOrderModal" onClick={() => handleEdit(order)}>تعديل</button>                     
                        <button className="btn btn-danger m-1" onClick={() => handleDelete(order.OrderID)}>حذف</button>                      </td>
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
                <label htmlFor="Email" className="form-label">البريد الإلكتروني</label>
                <input  type="email" className="form-control" id="Email" name="Email" value={currentOrder.Email} onChange={(e) => setCurrentOrder({ ...currentOrder, Email: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="PhoneNumber" className="form-label"> رقم الهاتف</label>
                <input type="phone" className="form-control" id="PhoneNumber" name="EmaPhoneNumberil" value={currentOrder.PhoneNumber} onChange={(e) => setCurrentOrder({ ...currentOrder, PhoneNumber: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="GooglePlaceID" className="form-label">Google Place ID</label>
                <input type="text" className="form-control" id="GooglePlaceID" name="GooglePlaceID" value={currentOrder.GooglePlaceID} onChange={(e) => setCurrentOrder({ ...currentOrder, GooglePlaceID: e.target.value })} />
              </div>
                  <div className="mb-3">
                    <label htmlFor="carType" className="form-label">نوع السيارة</label>
                    <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>اختر نوع السيارة</option>
                    {filteredCarTypes.map((carType) => (
                      <option key={carType.id} value={carType.name}>
                        {carType.name}
                      </option>
                    ))}
                  </select>                </div>
                                <div className="mb-3">
                    <label htmlFor="city" className="form-label">المدينة </label>
                    <select
                    className="form-select"
                    value={currentOrder.City === selectedCity ? selectedCity : currentOrder.City}
                    onChange={handleCityChange}
                  >
                    <option value="">اختر مدينة</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select> 
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">المنطقة </label>
                    <select
                      className="form-select mt-3"
                      value={currentOrder.Region === selectedArea ? selectedArea : currentOrder.Region}
                      onChange={handleAreaChange}
                    >
                      <option value="">اختر منطقة</option>
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select> 
                  </div>
                  <div className="mb-3">
                <label htmlFor="CustomerNotes" className="form-label">ملاحظات العميل</label>
                <textarea className="form-control" id="CustomerNotes" name="CustomerNotes" value={currentOrder.CustomerNotes} onChange={(e) => setCurrentOrder({ ...currentOrder, CustomerNotes: e.target.value })}></textarea>
              </div>               
                  <div className="mb-3">
                    <label htmlFor="statusOrder" className="form-label">الحالة</label>
                    <input type="text" className="form-control" id="statusOrder" value={currentOrder.StatusOrder || ''} onChange={(e) => setCurrentOrder({ ...currentOrder, StatusOrder: e.target.value })} />
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