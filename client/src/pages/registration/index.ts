import './index.css';

interface IRegistrationData {
    name: string;
    email: string;
    login: string;
    phone: string;
    password: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    login: string;
    phone: string;
    avatar: string | null;
    cartId: string | null;
    sessionId: string | null;
    sessionExpires: string | null;
    createdAt: string;
    updatedAt: string;
}

interface IRegistrationResponse {
    success: boolean;
    message: string;
    user: IUser;
}

export class RegistrationPage {
    public render(): string {
        return `
            <div class="registration-page">
                <div class="registration-container">
                    <div class="registration-card">
                        <h1 class="registration-title">Регистрация</h1>
                        <p class="registration-subtitle">Создайте аккаунт в RoyalSeconds</p>
                        
                        <form class="registration-form" data-registration id="registration-form">
                            <div class="form-group">
                                <label for="reg-name">Ваше имя</label>
                                <input type="text" id="reg-name" name="name" placeholder="Ферстаппен" required>
                            </div>

                            <div class="form-group">
                                <label for="reg-login">Логин</label>
                                <input type="text" id="reg-login" name="login" placeholder="max_verstappen" required>
                            </div>

                            <div class="form-group">
                                <label for="reg-email">Электронная почта</label>
                                <input type="email" id="reg-email" name="email" placeholder="example@mail.com" required>
                            </div>

                            <div class="form-group">
                                <label for="reg-phone">Номер телефона</label>
                                <input type="tel" id="reg-phone" name="phone" placeholder="+375 (__) ___-__-__" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="reg-password">Пароль</label>
                                <input type="password" id="reg-password" name="password" placeholder="••••••••" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="reg-confirm">Подтвердите пароль</label>
                                <input type="password" id="reg-confirm" name="confirm" placeholder="••••••••" required>
                            </div>
                            
                            <button type="submit" class="registration-btn" id="submit-btn">Зарегистрироваться</button>
                        </form>
                        
                        <div class="registration-footer">
                            <p>Уже есть аккаунт? <a href="/login" class="login-link">Войти</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    public init(): void {
        const form = document.getElementById('registration-form') as HTMLFormElement | null;
        if (!form) return;

        const emailInput = document.getElementById('reg-email') as HTMLInputElement;
        const savedEmail = localStorage.getItem('pendingEmail');
        if (savedEmail && emailInput) {
            emailInput.value = savedEmail;
            localStorage.removeItem('pendingEmail');
        }

        form.addEventListener('submit', async (event: Event) => {
            event.preventDefault();
            
            const formData = new FormData(form);
            const password = formData.get('password') as string;
            const confirm = formData.get('confirm') as string;

            if (password !== confirm) {
                alert("Пароли не совпадают!");
                return;
            }

            const userData: IRegistrationData = {
                name: formData.get('name') as string,
                login: formData.get('login') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                password: password,
            };

            await this.registerUser(userData);
        });
    }

    private async registerUser(data: IRegistrationData): Promise<void> {
        const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Загрузка...';

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include' 
            });

            const result: IRegistrationResponse = await response.json();

            if (response.ok && result.success) {
                alert(`${result.message}, ${result.user.name}!`);
                window.location.hash = '#/';
            } else {
                alert(`Ошибка: ${result.message || 'Не удалось зарегистрироваться'}`);
            }
        } catch (error) {
            console.error(error);
            alert('Сетевая ошибка. Попробуйте позже.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться';
        }
    }
}