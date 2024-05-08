import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiKeysService } from 'src/api-keys/api-keys.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private apiKeysService: ApiKeysService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api_key']?.toString();

    if (!apiKey) {
      res.status(401).send('API Key is required');
      return;
    }

    try {
      const { storeId, livemode } =
        await this.apiKeysService.validateApiKey(apiKey);
      req['store'] = { storeId, livemode };
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}
