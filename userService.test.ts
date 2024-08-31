import { register, authenticate, blockUser, reset } from './userService';
describe('Fail Based Tests', () => {
    beforeEach(() => {
      reset();
    });
  
    it('should throw an error when trying to register a user with missing username', () => {
      expect(() => register('', 'password123')).toThrow('Username and password are required');
    });
  
    it('should throw an error when trying to register a user with missing password', () => {
      expect(() => register('user1', '')).toThrow('Username and password are required');
    });
  
    it('should throw an error when trying to register a user that already exists', () => {
      register('user1', 'password123');
      expect(() => register('user1', 'password123')).toThrow('User already exists');
    });
});
describe('Use Based Tests', () => {

  // Prueba 1: Autenticación de un usuario registrado
  test('should authenticate a registered user', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra al usuario "user1"
    const isAuthenticated = authenticate('user1', 'password1'); // Intenta autenticar al usuario
    expect(isAuthenticated).toBe(true); // Verifica que la autenticación fue exitosa
  });

  // Prueba 2: Intento de autenticación de un usuario no registrado
  test('should not authenticate a non-registered user', () => {
    reset(); // Reinicia el sistema
    const isAuthenticated = authenticate('user2', 'password2'); // Intenta autenticar al usuario "user2" que no está registrado
    expect(isAuthenticated).toBe(false); // Verifica que la autenticación falla
  });

});
describe('Model Based Tests', () => {
  // Prueba 1: Transición de "No registrado" a "Registrado"
  test('should transition from Not Registered to Registered', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra un nuevo usuario
    expect(authenticate('user1', 'password1')).toBe(true); // Verifica que el usuario puede autenticarse
  });

  // Prueba 2: Transición de "Registrado" a "Autenticado"
  test('should transition from Registered to Authenticated', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra un nuevo usuario
    const isAuthenticated = authenticate('user1', 'password1'); // Autentica al usuario
    expect(isAuthenticated).toBe(true); // Verifica que el usuario está autenticado
  });
});

