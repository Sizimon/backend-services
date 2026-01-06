import { Pool } from 'pg';
import { oktzyDbConfig } from '../config/oktzy.config.js';

const pool = new Pool({
  connectionString: oktzyDbConfig.connectionString,
  ssl: oktzyDbConfig.ssl,
  max: oktzyDbConfig.poolSize,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Set the schema for all connections in this pool
pool.on('connect', (client) => {
  client.query(`SET search_path TO ${oktzyDbConfig.schema}, public`);
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;