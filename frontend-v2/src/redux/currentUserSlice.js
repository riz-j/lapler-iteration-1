import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateIssue } from './currentProjectSlice';

export const registerUser = createAsyncThunk('currentUser/registerUser', async (input) => {
    const { firstName, lastName, email, password } = input;
    return await fetch('http://localhost:5080/api/UsersAuth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        })
    })
})

export const getCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async (input) => {
    const { email, password } = input;
    return await fetch('http://localhost:5080/api/UsersAuth/login', {
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

export const updateUser = createAsyncThunk('currentUser/updateUser', async (input) => {
    const { userId, firstName, lastName, profilePicture, email } = input;
    return await fetch(`http://localhost:5080/api/Users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'profilePicture': profilePicture,
            'email': email
        })
    })
})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {},
    reducers: {},
    extraReducers: {
        /*  getCurrentUser   */
        [getCurrentUser.pending]: (state) => {
            state.isLoading = true;
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.id = action.payload.userWithProjectDetailsDTO.id; 
            state.firstName = action.payload.userWithProjectDetailsDTO.firstName;
            state.lastName = action.payload.userWithProjectDetailsDTO.lastName;
            state.email = action.payload.userWithProjectDetailsDTO.email;
            state.profilePicture = action.payload.userWithProjectDetailsDTO.profilePicture;
            state.projects = action.payload.userWithProjectDetailsDTO.projectIdProjectDetails;
            state.token = action.payload.token;
        },
        [getCurrentUser.rejected]: (state) => {
            state.isLoading = false;
        },

        /*  registerUser   */
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        },
        [registerUser.rejected]: (state) => {
            state.isLoading = false;
        },

        /*  refetchCurrentUser   */
        [refetchCurrentUser.pending]: (state) => {
            state.isLoading = true;
        },
        [refetchCurrentUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.projects = action.payload.projectIdProjectDetails;
        },
        [refetchCurrentUser.rejected]: (state) => {
            state.isLoading = false;
        },

        /* updateIssue */
        [updateIssue.pending]: (state) => {
            state.isLoading = true;
        },
        [updateIssue.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [updateIssue.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
export default currentUserSlice.reducer;