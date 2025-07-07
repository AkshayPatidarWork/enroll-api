export const configuration = () => {
  const dbSSLRaw = process.env.DB_SSL?.toLowerCase() ?? 'false';

  return {
    environment: process.env.NODE_ENV || 'development',

    apiHost: process.env.API_HOST || '127.0.0.1',
    apiPort: Number(process.env.API_PORT) || 3000,

    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'collegedb',
    dbSSL: dbSSLRaw === 'true',

    jwtPrivateKey: process.env.JWT_PRIVATE_KEY || '',
    jwtPublicKey: process.env.JWT_PUBLIC_KEY || '',
    jwtExpiry: process.env.JWT_EXPIRY || '1d',
    jwtIssuer: process.env.JWT_ISSUER || 'enroll-api',
    jwtAlgorithm: process.env.JWT_ALGORITHM || 'RS256',
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',

    throttleTimeout: process.env['THROTTLE_TTL'] || '60',
    throttleLimit: process.env['THROTTLE_LIMIT'] || '5',

    logLevel: process.env.LOG_LEVEL || 'DEBUG',
  };
};
