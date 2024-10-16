import axios from "axios"
import store from "./store";
import user from "./store/user";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
    const token = user.getters.getToken
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if(error.response.status === 401){
            user.dispatch('updateLogin', {expires:-1})

            window.location.href = "/login"
        }
        else {
            return Promise.reject(error);
        }
    } 
)
export default jwtInterceptor;