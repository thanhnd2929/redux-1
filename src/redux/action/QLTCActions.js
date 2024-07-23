import { createAsyncThunk } from "@reduxjs/toolkit";
import { addThuChi } from "../reducer/QLCTReducer";

const api_url = 'https://667002680900b5f8724901d9.mockapi.io/server'

export const fetchThuChis = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            console.log('Fetched Thu Chi:', data);
            data.forEach(row => {
                dispatch(addThuChi(row));
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }
}

export const deleteThuChiApi = createAsyncThunk('ThuChi/deleteThuChiApi',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const addThuChiAPI = createAsyncThunk(
    'ThuChi/addThuChiAPI',
    async (objThuChi, thunkAPI) => {
        console.log(objThuChi);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objThuChi)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateThuChiAPI = createAsyncThunk(
    'ThuChi/updateThuChiAPI',
    async (objUpdate, thunkAPI) => {
       try {
        const response = await fetch(`${api_url}/${objUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objUpdate.data)
        });
        const data = await response.json();
        if (response.ok) {
           return data; 
        } else {
          const errorData = await response.json();
          return thunkAPI.rejectWithValue(errorData);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );