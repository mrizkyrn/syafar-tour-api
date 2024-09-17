import { web } from './application/web';
import { logger } from './application/logger';

web.listen(3000, () => {
   logger.info('Server is running');
});

export default web;
