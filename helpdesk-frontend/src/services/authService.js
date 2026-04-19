import API_BASE_URL from "./api";

// Send login request to backend
export async function loginUser(loginData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    if (!response.ok) {
        throw new Error("Login request failed.");
    }

    return await response.json();
}