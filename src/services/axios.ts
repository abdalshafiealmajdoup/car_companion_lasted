// axios.ts
import axios from 'axios';
import { CustomerToken, ServiceCenterToken, AdminToken } from './types';

export const axiosCustomerInstance = axios.create();
export const axiosServiceCenterInstance = axios.create();
export const axiosAdminInstance = axios.create();

axiosCustomerInstance.interceptors.request.use((config) => {
  const token: CustomerToken = localStorage.getItem('customerToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosServiceCenterInstance.interceptors.request.use((config) => {
  const token: ServiceCenterToken = localStorage.getItem('serviceCenterToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosAdminInstance.interceptors.request.use((config) => {
  const token: AdminToken = localStorage.getItem('adminToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
