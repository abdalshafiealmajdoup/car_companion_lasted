import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
  OrderID?: number;
  CustomerID: number;
  CenterID: number;
  ServiceID: number;
  StatusOrder: string;
  CarType: string;
  PhoneNumber: string;
  GooglePlaceID: string;
  Email: string;
  CustomerNotes: string;
  City: string;
  Region: string;
}

interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  status: 'idle',
  error: null,
};

// Fetch orders
export const fetchCustomerOrders = createAsyncThunk('orders/fetchOrders', async (customer_id) => {
  // const response = await axios.get('http://localhost:8000/api/orders');
  const response = await axios.get('http://localhost:8000/api/customer-orders/'+ customer_id);

  return response.data;
});

// Fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:8000/api/orders');

  return response.data;
});

// Add new order
export const addOrder = createAsyncThunk('orders/addOrder', async (order: Order) => {
  const response = await axios.post('http://localhost:8000/api/orders', order);
  return response.data;
});

// Update an order
export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ OrderID, ...order }: Order) => {
  const response = await axios.put(`http://localhost:8000/api/orders/${OrderID}`, order);
  return response.data;
});

// Delete an order
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (OrderID: number) => {
  await axios.delete(`http://localhost:8000/api/orders/${OrderID}`);
  return OrderID;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong fetching orders';
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      }) .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(order => order.OrderID !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong deleting the order';
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter(order => order.OrderID !== action.payload);
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong updating the order';
      });
  },
});

// Export selectors if needed
// Export selectors if needed
export const selectAllOrders = (state: RootState) => state.orders.orders;
export const getOrdersStatus = (state: RootState) => state.orders.status;
export const getOrdersError = (state: RootState) => state.orders.error;

export default ordersSlice.reducer;
