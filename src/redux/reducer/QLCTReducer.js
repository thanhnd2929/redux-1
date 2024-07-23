import { createSlice } from "@reduxjs/toolkit";
import { addThuChiAPI, deleteThuChiApi, updateThuChiAPI } from "../action/QLTCActions";

const initialState = {
    listThuChi: [],
    filteredThuChi: [],
    statistics: { totalThu: 0, totalChi: 0 }
}

const thuChiSlice = createSlice({
    name: 'ThuChi',
    initialState,
    reducers: {
        addThuChi(state, action) {
            state.listThuChi.push(action.payload);
            state.filteredThuChi = state.listThuChi;
        },
        statisticsThuChi(state) {
            const statistics = state.listThuChi.reduce((acc, item) => {
                if (item.catThuChi === 'Thu') {
                    acc.totalThu += parseFloat(item.amountMoney);
                } else if (item.catThuChi === 'Chi') {
                    acc.totalChi += parseFloat(item.amountMoney);
                }
                return acc;
            }, { totalThu: 0, totalChi: 0 });
            state.statistics = statistics;
        },
        searchThuChi(state, action) {
            const keySearch = action.payload.toLowerCase();
            state.filteredThuChi = state.listThuChi.filter(item => item.title.toLowerCase().includes(keySearch));
        },
    },
    extraReducers: builder => {
        builder.addCase(deleteThuChiApi.fulfilled, (state, action) => {
            state.listThuChi = state.listThuChi.filter(row => row.id !== action.payload);
            state.filteredThuChi = state.listThuChi;
        }).addCase(deleteThuChiApi.rejected, (state, action) => {
            console.log('Delete thu chi rejected:', action.error.message);
        });

        builder.addCase(addThuChiAPI.fulfilled, (state, action) => {
            state.listThuChi.push(action.payload);
            state.filteredThuChi = state.listThuChi;
        })
            .addCase(addThuChiAPI.rejected, (state, action) => {
                console.log('Add Thu Chi rejected: ', action.error.message);
            });
        builder.addCase(updateThuChiAPI.fulfilled, (state, action) => {
            const { id, title, description, dateThuChi, catThuChi, amountMoney } = action.payload;
            const thuChi = state.listThuChi.find(item => item.id === id);
            if (thuChi) {
                thuChi.title = title;
                thuChi.description = description;
                thuChi.dateThuChi = dateThuChi;
                thuChi.catThuChi = catThuChi;
                thuChi.amountMoney = amountMoney;
            }
            state.filteredThuChi = state.listThuChi;
        })
            .addCase(updateThuChiAPI.rejected, (state, action) => {
                console.log('Update thu chi rejected:', action.error.message);
            });


    }
});

export const { addThuChi, statisticsThuChi, searchThuChi } = thuChiSlice.actions;
export default thuChiSlice.reducer;