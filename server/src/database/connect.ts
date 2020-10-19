import { createConnection } from 'typeorm';

import { config } from '../config/database';

createConnection(config).then(() => console.log('🔥 successfully connected with database'));