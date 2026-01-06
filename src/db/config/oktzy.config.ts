type OktzyDbConfig = {
  connectionString: string;
  schema: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  poolSize: number;
};

export const oktzyDbConfig: OktzyDbConfig = {
  connectionString: process.env.OKTZY_DATABASE_URL || 'postgresql://user:password@localhost:5432/database',
  schema: 'app_oktzy',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  poolSize: 20,
};