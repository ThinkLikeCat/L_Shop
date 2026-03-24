import './index.css';

interface ILoginData {
    login: string;
    password: string;
}

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

interface ILoginResponse {
    success: boolean;
    message: string;
    user: IUser;
}

export class LoginPage {
    public render(): string {
        return `
            <div class="login-page">
                <div class="login-container">
                    <div class="login-card">
                        <h1 class="login-title">Вход</h1>
                        <p class="login-subtitle">Войдите в личный кабинет RoyalSeconds</p>
                        
                        <form class="login-form" id="login-form">
                            <div class="form-group">
                                <label for="login-name">Логин</label>
                                <input type="text" id="login-name" name="login" placeholder="Ваш логин" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="login-password">Пароль</label>
                                <input type="password" id="login-password" name="password" placeholder="••••••••" required>
                            </div>
                            
                            <button type="submit" class="login-btn" id="login-submit-btn">Войти</button>
                        </form>
                        
                        <div class="login-footer">
                            <p>Нет аккаунта? <a href="/registration" class="registration-link" id="link-to-reg">Зарегистрироваться</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    public init(onNavigateToReg?: () => void): void {
        const form = document.getElementById('login-form') as HTMLFormElement | null;
        const toRegLink = document.getElementById('link-to-reg');
        
        toRegLink?.addEventListener('click', (e) => {
            e.preventDefault();
            if (onNavigateToReg) onNavigateToReg();
        });

        if (!form) return;

        form.addEventListener('submit', async (event: Event) => {
            event.preventDefault();
            
            const formData = new FormData(form);
            const loginData: ILoginData = {
                login: formData.get('login') as string,
                password: formData.get('password') as string
            };

            await this.loginUser(loginData);
        });
    }

    private async loginUser(data: ILoginData): Promise<void> {
        const submitBtn = document.getElementById('login-submit-btn') as HTMLButtonElement;

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Вход...';

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const result: ILoginResponse = await response.json();

            if (response.ok && result.success) {
                alert(result.message);
                window.location.hash = '#/';
            } else {
                alert(`Ошибка: ${result.message || 'Неверный логин или пароль'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Сетевая ошибка. Попробуйте позже.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
        }
    }
}