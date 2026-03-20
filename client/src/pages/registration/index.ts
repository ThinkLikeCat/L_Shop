import './index.css';

interface IRegistrationData {
    name: string;
    email: string;
    phone: string;
    password?: string; 
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
                                <input type="text" id="reg-name" name="name" placeholder="Иван Иванов" required>
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
                            
                            <button type="submit" class="registration-btn">Зарегистрироваться</button>
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

        form.addEventListener('submit', (event: Event) => {
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
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
            };

            console.log("Регистрация пользователя:", userData);
            alert(`Добро пожаловать, ${userData.name}!`);
        });
    }
}
