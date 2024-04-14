import React, { useEffect,useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate ,NavLink} from 'react-router-dom';
import Swal from 'sweetalert2';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { logoutServiceCenter } from '../store/slices/ServiceCenter'; 
import { fetchOrders } from '../store/slices/OrderRequestSlice';

const SideBarCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const ordersCount = orders.length; 

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutServiceCenter()).unwrap();
      localStorage.removeItem('tokenAdmin');
      Swal.fire({
        title: 'تم تسجيل الخروج',
        text: 'لقد تم تسجيل خروجك بنجاح.',
        icon: 'success',
        confirmButtonText: 'حسنًا'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-maintenance-center-user"); 
        }
      });
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.', 'error');
    }
  };

  const [showCount, setShowCount] = useState(true);

  const handleBellClick = () => {
    setShowCount(false);
  };
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/maintenance-center/list-maintenance-requests" className="text-decoration-none" style={{ color: 'inherit',textAlign:'center' }}>
            لوحة تحكم مركز الصيانة 
            <br />  <br />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/maintenance-center/list-Notifications" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">
  الإشعارات <i className="bi bi-bell-fill" onClick={handleBellClick}></i>
  {ordersCount > 0 && showCount && (
    <span className="notification-count" style={{
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '50%',
      padding: '0.25em 0.6em',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    }}>
      {ordersCount}
    </span>
  )}
</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/maintenance-center/list-maintenance-requests" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns"> قائمة الطلبات</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/maintenance-center/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">الملف الشخصي</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
              color:'#FFF'
            }}
            onClick={handleLogout} 
          >
            تسجيل الخروج
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBarCenter;
