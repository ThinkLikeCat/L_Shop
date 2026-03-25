interface ILogoutResponse {
    success: boolean;
    message: string;
}

export const logout = async (): Promise<boolean> => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result: ILogoutResponse = await response.json();

        if (response.ok && result.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Logout Error:', error);
        return false;
    }
};