function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidPassword(password) {
  return password && password.length >= 6;
}

function isValidLogin(login) {
  const loginRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return loginRegex.test(login);
}

function isValidName(name) {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
}

function validateRegistration(userData) {
  const errors = [];
  
  if (!userData.name || !isValidName(userData.name)) {
    errors.push('Имя должно содержать от 2 до 100 символов');
  }
  
  if (!userData.email || !isValidEmail(userData.email)) {
    errors.push('Некорректный email');
  }
  
  if (!userData.login || !isValidLogin(userData.login)) {
    errors.push('Логин должен содержать от 3 до 20 символов (буквы, цифры, подчеркивание)');
  }
  
  if (!userData.phone || !isValidPhone(userData.phone)) {
    errors.push('Некорректный номер телефона');
  }
  
  if (!userData.password || !isValidPassword(userData.password)) {
    errors.push('Пароль должен содержать минимум 6 символов');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function validateLogin(loginData) {
  const errors = [];
  
  if (!loginData.login) {
    errors.push('Не указан логин');
  }
  
  if (!loginData.password) {
    errors.push('Не указан пароль');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function validateAddress(address) {
  const errors = [];
  
  if (!address || typeof address !== 'object') {
    errors.push('Не указан адрес доставки');
    return { valid: false, errors };
  }
  
  if (!address.city || address.city.trim().length < 2) {
    errors.push('Укажите город');
  }
  
  if (!address.street || address.street.trim().length < 2) {
    errors.push('Укажите улицу');
  }
  
  if (!address.house || address.house.trim().length < 1) {
    errors.push('Укажите номер дома');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

function validateOrder(orderData) {
  const errors = [];
  
  const addressValidation = validateAddress(orderData.address);
  if (!addressValidation.valid) {
    errors.push(...addressValidation.errors);
  }
  
  if (!orderData.phone || !isValidPhone(orderData.phone)) {
    errors.push('Некорректный номер телефона');
  }
  
  if (!orderData.email || !isValidEmail(orderData.email)) {
    errors.push('Некорректный email');
  }
  
  if (!orderData.deliveryDate) {
    errors.push('Укажите дату доставки');
  }
  
  if (!orderData.deliveryTime) {
    errors.push('Укажите время доставки');
  }
  
  if (!orderData.paymentMethod) {
    errors.push('Укажите способ оплаты');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidLogin,
  isValidName,
  validateRegistration,
  validateLogin,
  validateAddress,
  validateOrder
};