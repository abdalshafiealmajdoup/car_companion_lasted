import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers ,deleteCustomer} from "../store/slices/CustomerSlice"; 
import Swal from 'sweetalert2';
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
function ListCustomersAdmin() {
    const dispatch = useDispatch();
    const { customers, status, error } = useSelector((state) => state.customers);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading customers...</p>;
    if (error) return <p>There was an error loading the customers: {error}</p>;
    const handleDelete = (customerId) => {
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
            dispatch(deleteCustomer(customerId));
            Swal.fire('تم الحذف!', 'تم حذف العميل.', 'success');
          }
        });
      };
    return (
        <div className="p-4 w-100">
          <div className="p-4 border border-2 rounded">
            <section className="bg-light p-3">
                <div className="bg-white shadow-sm rounded overflow-hidden">
                    <div className="d-flex align-items-center p-3">
                        <h2 className="text-primary fw-bold">قائمة العملاء</h2>
                    </div>
  
                    <div className="table-responsive">
                        <table className="table text-right text-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>الاسم</th>
                                    <th>الهاتف</th>
                                    <th>البريد الإلكتروني</th>
                                    <th>تاريخ الإنشاء</th>
                                    <th>تاريخ التحديث</th>
                                    <th>الإجراءات</th>

                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index) => (
                                    <tr key={customer.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{customer.Name}</td>
                                        <td>{customer.Phone}</td>
                                        <td>{customer.Email}</td>
                                        <td>{formatDateString(customer.created_at)}</td>
                                            <td>{formatDateString(customer.updated_at)}</td>
                                        <td className="d-flex justify-content-end">
                              {/* <button className="btn btn-primary me-1 m-1">عرض</button>
                              <button className="btn btn-warning me-1 m-1">تعديل</button> */}
                              <button className="btn btn-danger m-1" onClick={() => handleDelete(customer.CustomerID)}>حذف</button>
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

export default ListCustomersAdmin;
