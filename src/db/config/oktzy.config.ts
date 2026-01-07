type OktzyDbConfig = {
  connectionString: string;
  schema: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  poolSize: number;
};

export const oktzyDbConfig: OktzyDbConfig = {
  connectionString: process.env.DATABASE_URL || '',
  schema: 'app_oktzy',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  poolSize: 20,
};