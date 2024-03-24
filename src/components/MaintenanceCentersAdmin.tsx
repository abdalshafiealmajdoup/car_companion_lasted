import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceCenters,deleteServiceCenter } from "../store/slices/ServiceCenter"; 
import Swal from 'sweetalert2';
function ServiceCenterListAdmin() {
  const dispatch = useDispatch();
  const { serviceCenters, status, error } = useSelector((state) => state.serviceCenters);

  useEffect(() => {
    dispatch(fetchServiceCenters());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading service centers...</p>;
  if (error) return <p>Error loading service centers: {error}</p>;
  const handleDelete = (CenterID) => {
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
            dispatch(deleteServiceCenter(CenterID));
            Swal.fire(
                'تم الحذف!',
                'تم حذف مركز الصيانة.',
                'success'
            );
        }
    });
};
  return (
    <div className="p-4 w-100">
        <div className="p-4 border border-2 rounded">
            <section className="bg-light p-3">
                <div className="bg-white shadow-sm rounded overflow-hidden">
                    <div className="d-flex align-items-center p-3">
                        <h2 className="text-primary fw-bold">قائمة مراكز الصيانة</h2>
                    </div>

                    <div className="table-responsive">
                        <table className="table text-right text-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>اسم المركز</th>
                                    <th>الهاتف</th>
                                    <th>البريد الإلكتروني</th>
                                    <th>المدينة</th>
                                    <th>الخدمات المقدمة</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceCenters.map((center, index) => (
                                    <tr key={center.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{center.Name}</td>
                                        <td>{center.Phone}</td>
                                        <td>{center.Email}</td>
                                        <td>{center.City}</td>
                                        <td>{center.services_list}</td>
                                        <td className="d-flex justify-content-end">
                        {/* <button className="btn btn-primary me-1 m-1">عرض</button>
                        <button className="btn btn-warning me-1 m-1">تعديل</button> */}
                        <button className="btn btn-danger" onClick={() => handleDelete(center.CenterID)}>حذف</button>
                      </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}

export default ServiceCenterListAdmin;
