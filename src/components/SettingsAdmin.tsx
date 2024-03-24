import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins,deleteAdmin } from "../store/slices/AdminSlice"; 
import Swal from 'sweetalert2';

function SettingsMaintenance() {
    const dispatch = useDispatch();
    const { list: admins, status, error } = useSelector((state) => state.admins); 

    useEffect(() => {
        dispatch(fetchAllAdmins());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading admins...</p>;
    if (error) return <p>There was an error loading the admins: {error}</p>;
    const handleDelete = (AdminID) => {
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
                dispatch(deleteAdmin(AdminID));
                Swal.fire('تم الحذف!', 'تم حذف الأدمن.', 'success');
            }
        });
    };
    return (
        <div className="p-4 w-100">
            <div className="p-4 border border-2 rounded">
                <section className="bg-light p-3">
                    <div className="bg-white shadow-sm rounded overflow-hidden">
                        <div className="d-flex align-items-center p-3">
                            <h2 className="text-primary fw-bold">قائمة الإداريين</h2>
                        </div>

                        <div className="table-responsive">
                            <table className="table text-right text-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>الاسم</th>
                                        <th>البريد الإلكتروني</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin, index) => (
                                        <tr key={admin.AdminID}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{admin.Name}</td>
                                            <td>{admin.Email}</td>
                                            <td className="d-flex justify-content-end">
                                                {/* <button className="btn btn-primary me-1 m-1">عرض</button>
                                                <button className="btn btn-warning me-1 m-1">تعديل</button> */}
                                                <button disabled className="btn btn-danger m-1" onClick={() => handleDelete(admin.AdminID)}>حذف</button>
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

export default SettingsMaintenance;
