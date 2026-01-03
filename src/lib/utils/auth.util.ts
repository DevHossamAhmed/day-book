/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "next-auth/react";

export const getToken = async (): Promise<string | null> => {
    // Check localStorage first
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
            return token;
        }
    }

    // If localStorage is empty, get from session
    const session = await getSession();
    const sessionToken = (session as any)?.accessToken ?? null;
    
    // Save to localStorage for future use
    if (sessionToken && typeof window !== "undefined") {
        localStorage.setItem("access_token", sessionToken);
    }
    
    return sessionToken;
};

export const getOrg = async (): Promise<string | null> => {
    // Check localStorage first
    if (typeof window !== "undefined") {
        const orgId = localStorage.getItem("org_id");
        if (orgId) {
            return orgId;
        }
    }

    // If localStorage is empty, get from session
    const session = await getSession();
    const sessionOrgId = (session as any)?.user?.org_id ?? null;
    
    // Save to localStorage for future use
    if (sessionOrgId && typeof window !== "undefined") {
        localStorage.setItem("org_id", sessionOrgId);
    }
    
    return sessionOrgId;
};

export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE}/v1/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    const data = await res.json();

    localStorage.setItem("access_token", data.access);
    return data.access;
};
