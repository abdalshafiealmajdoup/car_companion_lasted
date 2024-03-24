import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders,deleteOrder } from "../store/slices/OrderRequestSlice"; 
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  const printOrders = () => {
    const tableHtml = document.querySelector('.table-responsive').outerHTML;
    const html = `
      <html>
        <head>
          <title>طباعة الطلبات</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${tableHtml}
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  
  const downloadPdfDocument = () => {
    const input = document.getElementById('pdfTableContainer');
    if (input) {
   
      const actionColumns = input.querySelectorAll('.action-column'); 
      actionColumns.forEach(col => col.style.display = 'none');
  
      html2canvas(input, { scale: 2 })
      .then((canvas) => {
        actionColumns.forEach(col => col.style.display = ''); 
  
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: 'a4'
        });
  
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      })
      .catch(error => {
        actionColumns.forEach(col => col.style.display = ''); 
        console.error("Error generating PDF: ", error);
      });
    } else {
      console.error("Element with ID 'pdfTableContainer' not found.");
    }
  };
  
useEffect(() => {
  if (document.getElementById('pdfTableContainer')) {
  }
}, []);
useEffect(() => {
  // تحقق من وجود العنصر قبل تنفيذ الكود
  if (document.getElementById('pdfTableContainer')) {
    // العنصر موجود، يمكنك الآن تنفيذ الكود لتحميل الPDF
  } else {
    console.error("Element with ID 'pdfTableContainer' not found.");
  }
}, []);
  return (
    <div className="p-4 w-100">
      <div className="p-4 border border-2 rounded">
        <section className="bg-light p-3">
          <div className="bg-white shadow-sm rounded overflow-hidden">
            <div className="d-flex align-items-center p-3">
              <h2 className="text-primary fw-bold">قائمة الطلبات</h2>
              <button className="btn btn-success m-1 " onClick={printOrders}>طباعة البيانات </button>
              <button  className="btn btn-success m-1" onClick={downloadPdfDocument}>تحميل البيانات PDF</button>


            </div>

            <div className="table-responsive" id="pdfTableContainer">
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
                    <th className="action-column">الإجراءات</th>
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

                      <td className="d-flex justify-content-end action-column" >
                        {/* <button className="btn btn-primary me-1 m-1">عرض</button>
                        <button className="btn btn-warning me-1 m-1">تعديل</button> */}
                        <button  className="btn btn-danger m-1 action-column" onClick={() => handleDelete(order.OrderID)}>حذف</button>
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
