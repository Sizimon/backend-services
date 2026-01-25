import { Pool } from 'pg';
import { notoDbConfig } from '../config/noto.config.js';

const pool = new Pool({
  connectionString: notoDbConfig.connectionString,
  ssl: notoDbConfig.ssl,
  max: notoDbConfig.poolSize,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Set the schema for all connections in this pool
pool.on('connect', (client) => {
  client.query(`SET search_path TO ${notoDbConfig.schema}, public`);
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;