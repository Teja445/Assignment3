export function validateDatabaseConfig() {
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
  ];

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Database configuration error: Missing required environment variables: ${missingVars.join(
        ', ',
      )}. Please check your .env file.`,
    );
  }
} 