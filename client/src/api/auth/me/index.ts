interface IUser {
    id: string;
    name: string;
    email: string;
    login: string;
    phone: string;
    avatar: string | null;
    cartId: string;
    sessionId: string | null;
    sessionExpires: string | null;
    createdAt: string;
    updatedAt: string;
}

interface IAuthMeResponse {
    success: boolean;
    user: IUser;
}

export const checkAuth = async (): Promise<IUser | null> => {
    try {
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include'
        });

        const result: IAuthMeResponse = await response.json();
        return (response.ok && result.success) ? result.user : null;
    } catch (error) {
        console.error('CheckAuth Error:', error);
        return null;
    }
};