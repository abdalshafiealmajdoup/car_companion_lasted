// routes.ts
import { HomePage, ChooseLoginsPage, LoginGestUserPage, LoginMaintenanceCenterUserPage, RegisterGestUserPage, RegisterMaintenanceCenterUserPage, 
  ForgotPasswordMaintenanceCenterPage, ForgotPasswordGestUserPage ,ClientInterfacePage,ServiceRequestPage,ConfirmServiceRequestPage,
  RequestSuccessPage,ListMaintenanceRequestsPage,RequestProcessingPage,
  SettingsMaintenancePage,ReportAdminPage,ForgotPasswordPage,verifyOtpPage,ListNotificationsPage,ResetPasswordCusomerPage,ContactUsPage,RegisterAdminPage,ProfileCustomerPage,ProfileMaintenancePage ,LoginAdminPage,MaintenanceCentersAdminPage,ListCustomersAdminPage,OrderListAdminPage,SettingsAdminPage,ProfileAdminPage} from "../pages";
  import { ProtectedRoute } from "../components";
const routesConfig = [
  //Admin
  { path: "admin/register", element: RegisterAdminPage },
  { path: "admin/login", element: LoginAdminPage },
  { path: "admin/maintenance-centers-admin", element: MaintenanceCentersAdminPage },
  { path: "admin/list-customers-admin", element: ListCustomersAdminPage },
  { path: "admin/order-list-admin", element: OrderListAdminPage },
  { path: "admin/settings-admin", element: SettingsAdminPage },
  { path: "admin/profile", element: ProfileAdminPage },
  { path: "admin/report", element: ReportAdminPage },

//maintenance center
  { path: "/register-maintenance-center-user", element: RegisterMaintenanceCenterUserPage },
  { path: "/login-maintenance-center-user", element: LoginMaintenanceCenterUserPage },
  { path: "/forgot-password-maintenance-center", element: ForgotPasswordMaintenanceCenterPage },
  { path: "/maintenance-center/request-processing", element: RequestProcessingPage },
  { path: "/maintenance-center/list-maintenance-requests", element: ListMaintenanceRequestsPage },
  { path: "/maintenance-center/list-Notifications", element: ListNotificationsPage },
  { path: "/maintenance-center/settings-maintenance", element: SettingsMaintenancePage },
  { path: "/maintenance-center/profile", element: ProfileMaintenancePage },

//Customer
  { path: "/", element: HomePage },
  { path: "/choose-logins", element: ChooseLoginsPage },
  { path: "/login-gest-user", element: LoginGestUserPage },
  { path: "/register-gest-user", element: RegisterGestUserPage },
  { path: "/forgot-password-gest-user", element: ForgotPasswordGestUserPage },
  { path: "/client-interface", element: ClientInterfacePage },
  { path: "/service-request", element: ServiceRequestPage },
  { path: "/confirm-service-request", element: ConfirmServiceRequestPage },
  { path: "/request-success", element: RequestSuccessPage },
  { path: "/confirm-service-request/:serviceName", element: ConfirmServiceRequestPage },
  { path: "/client-interface", element: <ProtectedRoute element={ClientInterfacePage} /> },
  { path: "/service-request", element: <ProtectedRoute element={ServiceRequestPage} /> },
  { path: "/confirm-service-request", element: <ProtectedRoute element={ConfirmServiceRequestPage} /> },
  { path: "/request-success", element: <ProtectedRoute element={RequestSuccessPage} /> },
  { path: "/confirm-service-request/:serviceName", element: <ProtectedRoute element={ConfirmServiceRequestPage} /> },
  { path: "/customer/profile", element: ProfileCustomerPage },
  { path: "/admin/contacts", element: ContactUsPage },
  { path: "/forgot-password-customer", element: ForgotPasswordPage },
  { path: "/verify-otp-customer", element: verifyOtpPage },
  { path: "/reset-password-customer", element: ResetPasswordCusomerPage },

];

export default routesConfig;

