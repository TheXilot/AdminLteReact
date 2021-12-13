import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    currentUser: {
        email: 'mail@example.com',
        picture: null
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {
            localStorage.setItem('token', payload);
            console.log('payload loginUser :', payload);
            state.isLoggedIn = true;
            state.token = payload;
        },
        logoutUser: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isLoggedIn = false;
            state.token = null;
        },
        loadUser: (state, {payload}) => {
            if (payload.token) {
                state.currentUser = payload.saveduser;
                localStorage.setItem('token', payload.token);
                state.token = payload.token;
            } else {
                state.currentUser = payload;
            }
            if (state.currentUser.picture) {
                state.currentUser.picture = `${process.env.REACT_APP_GATEKEEPER_URL}/${state.currentUser.picture}`;
            }
            console.log('loaduser : ', payload);
        }
    }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
