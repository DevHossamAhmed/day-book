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
            config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJmdWxsbmFtZSI6Ik1haG1vdWQgQWhtZWQiLCJleHAiOjE5ODEwNTM1NDIsImlhdCI6MTc2NTA1MzU0Mn0.AfKCWh4rqXVXMaZgT7xbrBjuHP2Nuu67Hq6yi6eg1vo`;
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