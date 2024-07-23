import { configureStore } from "@reduxjs/toolkit";
import thuChiSlice from "../reducer/QLCTReducer"

export default configureStore({
    reducer: {
        listThuChi: thuChiSlice,
    }
});