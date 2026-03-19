const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'http://localhost:3000';

// Цвета для вывода
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// HTTP запрос с cookies
function request(method, path, data = null, cookies = '') {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const setCookie = res.headers['set-cookie'] || [];
          resolve({
            status: res.statusCode,
            data: JSON.parse(body),
            cookies: setCookie
          });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, cookies: [] });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Извлечение session_token из cookies
function extractSessionToken(cookies) {
  for (const cookie of cookies) {
    const match = cookie.match(/session_token=([^;]+)/);
    if (match) return `session_token=${match[1]}`;
  }
  return '';
}

// Ожидание готовности сервера
async function waitForServer(maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await request('GET', '/health');
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error('Server not ready');
}

// Тесты
let testsPassed = 0;
let testsFailed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    testsFailed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Восстановление исходных данных
async function resetUsers() {
  const originalUsers = [
    {
      "id": "user-001",
      "name": "Иван Иванов",
      "email": "ivan@example.com",
      "login": "ivan_ivanov",
      "phone": "+79001234567",
      "password": "password123",
      "avatar": null,
      "cartId": null,
      "sessionId": null,
      "sessionExpires": null,
      "createdAt": "2026-03-13T18:00:00.000Z",
      "updatedAt": "2026-03-13T18:00:00.000Z"
    },
    {
      "id": "user-002",
      "name": "Петр Петров",
      "email": "petr@example.com",
      "login": "petr_petrov",
      "phone": "+79009876543",
      "password": "securePass456",
      "avatar": null,
      "cartId": null,
      "sessionId": null,
      "sessionExpires": null,
      "createdAt": "2026-03-14T10:30:00.000Z",
      "updatedAt": "2026-03-14T10:30:00.000Z"
    },
    {
      "id": "user-003",
      "name": "Мария Сидорова",
      "email": "maria@example.com",
      "login": "maria_sid",
      "phone": "+79005554433",
      "password": "mariaPass789",
      "avatar": null,
      "cartId": null,
      "sessionId": null,
      "sessionExpires": null,
      "createdAt": "2026-03-15T14:20:00.000Z",
      "updatedAt": "2026-03-15T14:20:00.000Z"
    }
  ];
  
  await fs.writeFile(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify(originalUsers, null, 2)
  );
}

async function runTests() {
  console.log('\n🧪 Запуск тестов авторизации/регистрации\n');
  
  // Ожидание готовности сервера
  console.log('Ожидание запуска сервера...');
  try {
    await waitForServer();
    console.log('Сервер готов!\n');
  } catch (e) {
    console.error('Не удалось подключиться к серверу');
    process.exit(1);
  }
  
  // Сброс данных перед тестами
  await resetUsers();
  
  // === ТЕСТЫ РЕГИСТРАЦИИ ===
  console.log(`${colors.yellow}📝 Регистрация${colors.reset}`);
  
  await test('Регистрация нового пользователя (успешно)', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Тестовый Пользователь',
      email: 'test@test.com',
      login: 'test_user',
      phone: '+79001112233',
      password: 'testPass123'
    });
    
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
    assert(res.data.user.name === 'Тестовый Пользователь', 'Wrong user name');
    assert(res.data.user.email === 'test@test.com', 'Wrong email');
    assert(res.cookies.length > 0, 'No cookie set');
  });
  
  await test('Регистрация с существующим email (ошибка)', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Дубликат',
      email: 'ivan@example.com',
      login: 'unique_login_123',
      phone: '+79001112244',
      password: 'pass123456'
    });
    
    assert(res.status === 409, `Expected 409, got ${res.status}`);
    assert(res.data.success === false, 'Expected success: false');
    assert(res.data.error.code === 'DUPLICATE_ENTRY', 'Wrong error code');
  });
  
  await test('Регистрация с существующим логином (ошибка)', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Дубликат',
      email: 'unique@email.com',
      login: 'ivan_ivanov',
      phone: '+79001112255',
      password: 'pass123456'
    });
    
    assert(res.status === 409, `Expected 409, got ${res.status}`);
    assert(res.data.success === false, 'Expected success: false');
  });
  
  await test('Регистрация с невалидными данными (ошибка)', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'А',
      email: 'invalid-email',
      login: 'ab',
      phone: '123',
      password: '123'
    });
    
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.error.code === 'VALIDATION_ERROR', 'Wrong error code');
    assert(res.data.error.details.errors.length > 0, 'No validation errors');
  });
  
  // === ТЕСТЫ АВТОРИЗАЦИИ ===
  console.log(`\n${colors.yellow}🔐 Авторизация${colors.reset}`);
  
  await test('Авторизация с правильными данными', async () => {
    const res = await request('POST', '/api/auth/login', {
      login: 'ivan_ivanov',
      password: 'password123'
    });
    
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
    assert(res.data.user.name === 'Иван Иванов', 'Wrong user name');
    assert(res.cookies.length > 0, 'No cookie set');
  });
  
  await test('Авторизация с неверным паролем', async () => {
    const res = await request('POST', '/api/auth/login', {
      login: 'ivan_ivanov',
      password: 'wrongpassword'
    });
    
    assert(res.status === 401, `Expected 401, got ${res.status}`);
    assert(res.data.success === false, 'Expected success: false');
    assert(res.data.error.code === 'UNAUTHORIZED', 'Wrong error code');
  });
  
  await test('Авторизация с несуществующим логином', async () => {
    const res = await request('POST', '/api/auth/login', {
      login: 'nonexistent_user',
      password: 'password123'
    });
    
    assert(res.status === 401, `Expected 401, got ${res.status}`);
    assert(res.data.success === false, 'Expected success: false');
  });
  
  await test('Авторизация без логина (ошибка валидации)', async () => {
    const res = await request('POST', '/api/auth/login', {
      password: 'password123'
    });
    
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    assert(res.data.error.code === 'VALIDATION_ERROR', 'Wrong error code');
  });
  
  // === ТЕСТЫ ПРОВЕРКИ АВТОРИЗАЦИИ ===
  console.log(`\n${colors.yellow}🔍 Проверка авторизации${colors.reset}`);
  
  await test('Проверка авторизации (авторизован)', async () => {
    // Сначала логинимся
    const loginRes = await request('POST', '/api/auth/login', {
      login: 'petr_petrov',
      password: 'securePass456'
    });
    
    const cookies = extractSessionToken(loginRes.cookies);
    
    // Проверяем авторизацию
    const res = await request('GET', '/api/auth/me', null, cookies);
    
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.authenticated === true, 'Expected authenticated: true');
    assert(res.data.user !== null, 'User should not be null');
  });
  
  await test('Проверка авторизации (не авторизован)', async () => {
    const res = await request('GET', '/api/auth/me');
    
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.authenticated === false, 'Expected authenticated: false');
    assert(res.data.user === null, 'User should be null');
  });
  
  // === ТЕСТЫ ВЫХОДА ===
  console.log(`\n${colors.yellow}🚪 Выход из системы${colors.reset}`);
  
  await test('Выход из системы (успешно)', async () => {
    // Сначала логинимся
    const loginRes = await request('POST', '/api/auth/login', {
      login: 'maria_sid',
      password: 'mariaPass789'
    });
    
    const cookies = extractSessionToken(loginRes.cookies);
    
    // Выходим
    const res = await request('POST', '/api/auth/logout', null, cookies);
    
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.success === true, 'Expected success: true');
  });
  
  await test('Выход без авторизации (ошибка)', async () => {
    const res = await request('POST', '/api/auth/logout');
    
    assert(res.status === 401, `Expected 401, got ${res.status}`);
    assert(res.data.error.code === 'UNAUTHORIZED', 'Wrong error code');
  });
  
  // === HEALTH CHECK ===
  console.log(`\n${colors.yellow}❤️ Health Check${colors.reset}`);
  
  await test('Health check endpoint', async () => {
    const res = await request('GET', '/health');
    
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.data.status === 'ok', 'Expected status: ok');
  });
  
  // === ИТОГИ ===
  console.log('\n' + '='.repeat(50));
  console.log(`${colors.green}Пройдено: ${testsPassed}${colors.reset}`);
  console.log(`${colors.red}Провалено: ${testsFailed}${colors.reset}`);
  console.log('='.repeat(50) + '\n');
  
  // Восстановление исходных данных
  await resetUsers();
  
  process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();