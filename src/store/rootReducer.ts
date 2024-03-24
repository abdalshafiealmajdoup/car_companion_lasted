// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import carTypesReducer from './slices/carTypesSlice';
import CustomerSlice from './slices/CustomerSlice';
import citiesReducer from './slices/citiesSlice';
import OrderRequestSlice from './slices/OrderRequestSlice';
import ServiceCenter from './slices/ServiceCenter';
import AdminSlice from './slices/AdminSlice';


const rootReducer = combineReducers({
    carTypes: carTypesReducer,
    customers: CustomerSlice,
    cities: citiesReducer,
    orders: OrderRequestSlice,
    serviceCenters: ServiceCenter,
    admins: AdminSlice,

});

export default rootReducer;