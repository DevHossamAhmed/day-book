import axios from "axios";
import { getOrg, getToken, refreshToken } from "../utils/auth.util";

const UserApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DAY_BOOK_SERVICE,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000
});

// REQUEST INTERCEPTOR
UserApi.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        const orgId = await getOrg();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (orgId) {
            config.headers["OrgId"] = orgId;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
UserApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        // token expired → try refresh
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            try {
                const newToken = await refreshToken();
                axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                original.headers["Authorization"] = `Bearer ${newToken}`;
                return UserApi(original);
            } catch (err) {
                console.error("Refresh token failed");
            }
        }
        return Promise.reject(error);
    }
);

export default UserApi;