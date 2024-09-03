/**
 * Ejercicio 3: Una empresa de software está desarrollando un sistema de gestión de usuarios 
 * que permite registrar, autenticar, bloquear y gestionar usuarios. El sistema debe ser robusto, 
 * seguro y eficiente bajo diferentes condiciones de uso.
 * 
 * John Del Rosario               1106940
 * Rayfel Ogando Soler            1107535
 * Donato Machado Santos          1104816
 * 
 * Repositorio GitHub:  https://github.com/D0N4T0-24/tecnicas-de-pruebas/tree/main
 */

import { register, authenticate, reset } from './userService';

/**
 * Describe el conjunto de pruebas que verifican el manejo de errores.
 */
describe('Fail Based Tests', () => {
    /**
     * Configura el entorno antes de cada prueba, reiniciando el sistema.
     */
    beforeEach(() => {
      reset();
    });
  
    /**
     * Prueba que verifica que se lanza un error cuando se intenta registrar un usuario sin nombre de usuario.
     */
    it('should throw an error when trying to register a user with missing username', () => {
      expect(() => register('', 'password123')).toThrow('Username and password are required');
    });
  
    /**
     * Prueba que verifica que se lanza un error cuando se intenta registrar un usuario sin contraseña.
     */
    it('should throw an error when trying to register a user with missing password', () => {
      expect(() => register('user1', '')).toThrow('Username and password are required');
    });
  
    /**
     * Prueba que verifica que se lanza un error cuando se intenta registrar un usuario que ya existe.
     */
    it('should throw an error when trying to register a user that already exists', () => {
      register('user1', 'password123');
      expect(() => register('user1', 'password123')).toThrow('User already exists');
    });
});

/**
 * Describe el conjunto de pruebas que verifican el uso funcional del sistema.
 */
describe('Use Based Tests', () => {

  /**
   * Prueba que verifica la autenticación exitosa de un usuario registrado.
   */
  test('should authenticate a registered user', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra al usuario "user1"
    const isAuthenticated = authenticate('user1', 'password1'); // Intenta autenticar al usuario
    expect(isAuthenticated).toBe(true); // Verifica que la autenticación fue exitosa
  });

  /**
   * Prueba que verifica que un usuario no registrado no puede ser autenticado.
   */
  test('should not authenticate a non-registered user', () => {
    reset(); // Reinicia el sistema
    const isAuthenticated = authenticate('user2', 'password2'); // Intenta autenticar al usuario "user2" que no está registrado
    expect(isAuthenticated).toBe(false); // Verifica que la autenticación falla
  });

});

/**
 * Describe el conjunto de pruebas que verifican las transiciones de estado del sistema.
 */
describe('Model Based Tests', () => {
  /**
   * Prueba que verifica la transición del estado "No registrado" a "Registrado".
   */
  test('should transition from Not Registered to Registered', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra un nuevo usuario
    expect(authenticate('user1', 'password1')).toBe(true); // Verifica que el usuario puede autenticarse
  });

  /**
   * Prueba que verifica la transición del estado "Registrado" a "Autenticado".
   */
  test('should transition from Registered to Authenticated', () => {
    reset(); // Reinicia el sistema
    register('user1', 'password1'); // Registra un nuevo usuario
    const isAuthenticated = authenticate('user1', 'password1'); // Autentica al usuario
    expect(isAuthenticated).toBe(true); // Verifica que el usuario está autenticado
  });
});
