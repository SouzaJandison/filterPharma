import { Request, Response } from 'express';

import HandleFiles from '../utils/handleFiles'; 

class ProductController {
  async show(req: Request, res: Response) {
    const data = await HandleFiles.readFile();

    return res.json(data);
  }
};

export default new ProductController();