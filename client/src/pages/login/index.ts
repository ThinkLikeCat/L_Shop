import './index.css';

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
                                <label for="login-name">Логин (Имя пользователя)</label>
                                <input type="text" id="login-name" name="name" placeholder="Ваш логин" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="login-password">Пароль</label>
                                <input type="password" id="login-password" name="password" placeholder="••••••••" required>
                            </div>
                            
                            <button type="submit" class="login-btn">Войти</button>
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

        form.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            
            const formData = new FormData(form);
            
            const userName = formData.get('name') as string;
            const password = formData.get('password') as string;
            const authData = {
                name: userName,
                password: password
            };
            alert(`Проверка авторизации`);
        });
    }
}
