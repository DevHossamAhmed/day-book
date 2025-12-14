import { getSession } from "next-auth/react";

export const getToken = async (): Promise<string | null> => {
    const session = await getSession();
    return (session as any)?.accessToken ?? null;
};

export const getOrg = async (): Promise<string | null> => {
    const session = await getSession();
    console.log(session)
    return (session as any)?.user.org_id ?? null;
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
