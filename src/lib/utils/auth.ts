export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
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
