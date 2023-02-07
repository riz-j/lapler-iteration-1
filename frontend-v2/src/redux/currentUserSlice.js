import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async (input) => {
    const { email, password } = input;
    return await fetch("http://localhost:5080/api/UsersAuth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {},
    reducers: {},
    extraReducers: {
        [getCurrentUser.pending]: (state) => {
            state.isLoading = true;
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentUserInfo = action.payload;
            // state.id = action.payload.userDTO.id;
            // state.firstName = action.payload.userDTO.firstName;
            // state.lastName = action.payload.userDTO.lastName;
            // state.email = action.payload.userDTO.email;
            // state.projects = action.payload.userDTO.projectId.$values;
            // state.token = action.payload.token;
        },
        [getCurrentUser.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})
export default currentUserSlice.reducer;