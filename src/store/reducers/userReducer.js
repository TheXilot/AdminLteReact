import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    password: '',
    experience: '',
    competence: '',
    imageFile: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, {payload}) => {
            state.name = payload.name;
            state.email = payload.email;
            state.password = payload.password;
            state.experience = payload.experience;
            state.competence = payload.competence;
            state.imageFile = payload.imageFile;
            console.log(payload);
        }
    }
});

export const {getUser} = userSlice.actions;

export default userSlice.reducer;
