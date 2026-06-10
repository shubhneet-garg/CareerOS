import bcrypt from 'bcryptjs';
import { logger } from '@/infrastructure/logger';

const SALT_ROUNDS = 10;

export class PasswordService {
  /**
   * Hash password
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      return bcrypt.hash(password, salt);
    } catch (error) {
      logger.error('Error hashing password', error);
      throw new Error('Failed to hash password');
    }
  }

  /**
   * Compare password with hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, hash);
    } catch (error) {
      logger.error('Error comparing password', error);
      return false;
    }
  }

  /**
   * Check password strength
   */
  static isPasswordStrong(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}
