import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, } from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutServiceCenter } from '../store/slices/ServiceCenter'; 
import Swal from 'sweetalert2';

const SideBarCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            {/* <NavLink exact to="/maintenance-center/request-processing" activeClassName="activeClicked"> */}
              {/* <CDBSidebarMenuItem icon="columns"> معالجة الطلبات </CDBSidebarMenuItem> */}
            {/* </NavLink> */}
            <NavLink exact to="/maintenance-center/list-Notifications" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">الإشعارات <i class="bi bi-bell-fill"></i></CDBSidebarMenuItem>
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
