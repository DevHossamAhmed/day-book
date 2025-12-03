import axios from "axios";
import { getOrg, getToken, refreshToken } from "../utils/auth";

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
        const token = getToken();
        const orgId = getOrg();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            config.headers["Authorization"] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5pYS5lZHUuc2EvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3NjA4NzU3MDgsIm5iZiI6MTc2MDg3NTcwOCwianRpIjoiMVNwTDJBQzB2RTBJRnl2dSIsInN1YiI6IjMzNzgiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.mC0sK1Yvu3jYxkye8ybaVsFvVjyVTBoJKwAdPpLMhLg`;
        }

        if (orgId) {
            config.headers["OrgId"] = orgId;
        } else {
            config.headers["OrgId"] = 1;
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