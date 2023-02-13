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

export const refetchCurrentUser = createAsyncThunk('currentUser/refetchCurrentUser', async (input) => {
    const { userId, token } = input;
    return await fetch(`http://localhost:5080/api/Users/${userId}`)
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
            state.id = action.payload.userWithIdAndNamesDTO.id; 
            state.firstName = action.payload.userWithIdAndNamesDTO.firstName;
            state.lastName = action.payload.userWithIdAndNamesDTO.lastName;
            state.email = action.payload.userWithIdAndNamesDTO.email;
            state.projects = action.payload.userWithIdAndNamesDTO.projectIdProjectNames;
            state.token = action.payload.token;
        },
        [getCurrentUser.rejected]: (state) => {
            state.isLoading = false;
        },

        [refetchCurrentUser.pending]: (state) => {
            state.isLoading = true;
        },
        [refetchCurrentUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.projects = action.payload.projectIdProjectNames;
        },
        [refetchCurrentUser.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})
export default currentUserSlice.reducer;