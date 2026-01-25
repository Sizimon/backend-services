type NotoDbConfig = {
  connectionString: string;
  schema: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  poolSize: number;
};

export const notoDbConfig: NotoDbConfig = {
  connectionString: process.env.DATABASE_URL || '',
  schema: 'app_noto',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  poolSize: 20,
};