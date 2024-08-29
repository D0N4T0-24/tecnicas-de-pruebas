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
 // Desarrollar aquí pruebas Basadas en el Uso
});
describe('Model Based Tests', () => {
 // Desarrollar aquí pruebas Basadas en Modelos
});
