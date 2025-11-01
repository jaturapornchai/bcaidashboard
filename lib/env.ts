// lib/env.ts - Environment configuration validation and access
import { z } from 'zod';

// Define the environment schema
const envSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1, 'OPENROUTER_API_KEY is required'),
  OPENROUTER_API_URL: z.string().url('Invalid OPENROUTER_API_URL'),
  ELEVENLABS_API_KEY: z.string().min(1, 'ELEVENLABS_API_KEY is required'),
  DASHBOARD_API_SECRET: z.string().min(16, 'DASHBOARD_API_SECRET must be at least 16 characters'),
  API_KEY_ENCRYPTION_KEY: z.string().length(32, 'API_KEY_ENCRYPTION_KEY must be exactly 32 characters'),
  RATE_LIMIT_ENABLED: z.string().transform((val: string) => val === 'true').default('true'),
  MAX_REQUESTS_PER_MINUTE: z.string().transform((val: string) => parseInt(val)).default('60'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Type for the validated environment
export type Env = z.infer<typeof envSchema>;

// Cache for validated environment
let cachedEnv: Env | null = null;

/**
 * Validate and return environment variables
 */
export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  try {
    const env = {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
      OPENROUTER_API_URL: process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
      ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || '',
      DASHBOARD_API_SECRET: process.env.DASHBOARD_API_SECRET || '',
      API_KEY_ENCRYPTION_KEY: process.env.API_KEY_ENCRYPTION_KEY || '',
      RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED || 'true',
      MAX_REQUESTS_PER_MINUTE: process.env.MAX_REQUESTS_PER_MINUTE || '60',
      NODE_ENV: process.env.NODE_ENV || 'development',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    };

    cachedEnv = envSchema.parse(env);
    return cachedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment validation failed:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === 'development';
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return getEnv().NODE_ENV === 'production';
}

/**
 * Get safe environment info for debugging (without exposing sensitive keys)
 */
export function getSafeEnvInfo() {
  const env = getEnv();
  return {
    NODE_ENV: env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    OPENROUTER_API_KEY_SET: !!env.OPENROUTER_API_KEY,
    ELEVENLABS_API_KEY_SET: !!env.ELEVENLABS_API_KEY,
    DASHBOARD_API_SECRET_SET: !!env.DASHBOARD_API_SECRET,
    API_KEY_ENCRYPTION_KEY_SET: !!env.API_KEY_ENCRYPTION_KEY,
    RATE_LIMIT_ENABLED: env.RATE_LIMIT_ENABLED,
    MAX_REQUESTS_PER_MINUTE: env.MAX_REQUESTS_PER_MINUTE,
  };
}