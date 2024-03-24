import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts ,deleteContact} from "../store/slices/ContactSlice"; 
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
function ContactUS() {
    const dispatch = useDispatch();
    const { contacts, status, error } = useSelector((state) => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading contacts...</p>;
    if (error) return <p>There was an error loading the contacts: {error}</p>;

    const handleDelete = (contactId) => {
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
            dispatch(deleteContact(contactId));
            Swal.fire('تم الحذف!', 'تم حذف الاستفسار.', 'success');
          }
        });
    };

    return (
        <div className="p-4 w-100">
          <div className="p-4 border border-2 rounded">
            <section className="bg-light p-3">
                <div className="bg-white shadow-sm rounded overflow-hidden">
                    <div className="d-flex align-items-center p-3">
                        <h2 className="text-primary fw-bold">قائمة الاستفسارات</h2>
                    </div>
  
                    <div className="table-responsive">
                        <table className="table text-right text-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>الاسم</th>
                                    <th>البريد الإلكتروني</th>
                                    <th>الموضوع</th>
                                    <th>الرسالة</th>
                                    <th>تاريخ الإنشاء</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact, index) => (
                                    <tr key={contact.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        <td>{contact.description}</td>
                                        <td>{formatDateString(contact.created_at)}</td>
                                        <td className="d-flex justify-content-end">
                                            <button className="btn btn-danger m-1" onClick={() => handleDelete(contact.id)}>حذف</button>
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

export default ContactUS;
