import { logger } from '../Utils/logger.js';
export class BaseEmbeddingProvider {
    logger;
    constructor(name) {
        this.logger = logger.child(name);
    }
}
//# sourceMappingURL=provider.js.map