import AuthService from '../backend/src/services/authService';
import * as FileManager from '../backend/src/utils/fileManager';

jest.mock('../backend/src/utils/fileManager', () => ({
  readJSON: jest.fn(),
  writeJSON: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}));

const mockedFileManager = FileManager as jest.Mocked<typeof FileManager>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register creates a new user when email and login are unique', async () => {
    mockedFileManager.findOne.mockResolvedValue(null);
    mockedFileManager.insert.mockImplementation(async (_path, item) => item);

    const result = await AuthService.register({
      name: 'Test User',
      email: 'test@example.com',
      login: 'testuser',
      phone: '1234567890',
      password: 'password'
    });

    expect(result).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      login: 'testuser',
      phone: '1234567890'
    });
    expect(result.id).toBeDefined();
    expect(mockedFileManager.insert).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ email: 'test@example.com' }));
  });

  test('register rejects when email already exists', async () => {
    mockedFileManager.findOne.mockResolvedValue({ id: '1', email: 'test@example.com', login: 'otherlogin' } as any);

    await expect(
      AuthService.register({
        name: 'Test User',
        email: 'test@example.com',
        login: 'testuser',
        phone: '1234567890',
        password: 'password'
      })
    ).rejects.toThrow('Пользователь с таким email уже существует');
  });

  test('login returns sessionId and user when credentials are correct', async () => {
    const user = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      login: 'testuser',
      phone: '1234567890',
      password: 'password',
      avatar: null,
      cartId: null,
      sessionId: null,
      sessionExpires: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as any;

    mockedFileManager.findOne.mockResolvedValue(user);
    mockedFileManager.update.mockResolvedValue({ ...user, sessionId: 'session', sessionExpires: new Date(Date.now() + 1000).toISOString() } as any);

    const result = await AuthService.login('testuser', 'password');

    expect(result.user).toEqual(user);
    expect(result.sessionId).toBeDefined();
    expect(mockedFileManager.update).toHaveBeenCalledWith(expect.any(String), expect.any(Function), expect.objectContaining({ sessionId: expect.any(String) }));
  });

  test('login rejects when credentials are wrong', async () => {
    mockedFileManager.findOne.mockResolvedValue(null);

    await expect(AuthService.login('testuser', 'wrongpassword')).rejects.toThrow('Неверный логин или пароль');
  });

  test('logout updates user session fields to null', async () => {
    mockedFileManager.update.mockResolvedValue({} as any);

    await AuthService.logout('1');

    expect(mockedFileManager.update).toHaveBeenCalledWith(expect.any(String), expect.any(Function), {
      sessionId: null,
      sessionExpires: null
    });
  });

  test('getUserBySessionId returns user for valid session', async () => {
    const user = {
      id: '1',
      sessionId: 'session123',
      sessionExpires: new Date(Date.now() + 10000).toISOString()
    } as any;

    mockedFileManager.findOne.mockResolvedValue(user);
    const result = await AuthService.getUserBySessionId('session123');

    expect(result).toEqual(user);
  });

  test('getUserById returns user by id', async () => {
    const user = { id: '1' } as any;
    mockedFileManager.findOne.mockResolvedValue(user);

    const result = await AuthService.getUserById('1');
    expect(result).toEqual(user);
  });
});
