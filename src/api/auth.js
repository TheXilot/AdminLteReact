import axios from 'axios';

const API_ENDPOINTS = {
    ADD_USER: () => 'http://localhost:5000/auth/',
    LOGIN_USER: () => 'http://localhost:5000/auth/login/',
    LOGGEDIN_USER: () => 'http://localhost:5000/auth/loggedIn/',
    LOGOUT_USER: () => 'http://localhost:5000/auth/logout/'
};

// async function getClasses() {
//   const years = await axios.get(
//     API_ENDPOINTS.GET_CLASSES(getSchoolYear().split(":")[0])
//   );
//   return years;
// }
// async function AddUser({email, password, passwordVerify}) {
//     const body = {
//         email,
//         password,
//         passwordVerify
//     };

//     return await axios.post(API_ENDPOINTS.ADD_USER(), body);
// }

async function LoginUSER(email, password) {
    const body = {
        email,
        password
    };
    console.log(body);
    const r = await axios.post(API_ENDPOINTS.LOGIN_USER(), body, {
        withCredentials: true
    });
    return r.data;
}
async function getProfile() {
    const r = await axios.get(API_ENDPOINTS.LOGGEDIN_USER(), {
        withCredentials: true
    });
    console.log('in getProfile :', r);
    return r.data;
}
// async function LoggedInUser() {
//     return await axios.get(API_ENDPOINTS.LOGGEDIN_USER(), {
//         withCredentials: true
//     });
// }

// async function LogOutUser() {
//     return await axios.get(API_ENDPOINTS.LOGOUT_USER(), {
//         withCredentials: true
//     });
// }
// export {AddUser, LoginUSER, LoggedInUser, LogOutUser};
export {LoginUSER, getProfile};
