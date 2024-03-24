import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, } from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../store/slices/AdminSlice'; 
import Swal from 'sweetalert2';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap();
      localStorage.removeItem('tokenAdmin');
      Swal.fire({
        title: 'تم تسجيل الخروج',
        text: 'لقد تم تسجيل خروجك بنجاح.',
        icon: 'success',
        confirmButtonText: 'حسنًا'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/login"); 
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
          <a href="/admin/order-list-admin" className="text-decoration-none" style={{ color: 'inherit',textAlign:'center' }}>
            لوحة تحكم النظام
            <br />
            (رفيق السيارة)  
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
      
            <NavLink exact to="/admin/order-list-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">الصفحة الرئيسية </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/order-list-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">قائمة الطلبات</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/maintenance-centers-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">مراكز الصيانة</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/list-customers-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="user">قائمة العملاء</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/settings-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="user">قائمة المستخدمين</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="user"> الملف الشخصي</CDBSidebarMenuItem>
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

export default Sidebar;
