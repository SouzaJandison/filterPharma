import { Request, Response } from 'express';

import HandleFiles from '../utils/handleFiles'; 

interface IDatabase {
  id: number;
  code: string;
  description: string;
  quantity: string;
  stock: string;
  value: string;
  category: string;
  laboratory: string;
}

class ProductController {
  async show(req: Request, res: Response) {
    let data: IDatabase[] = await HandleFiles.readFile();
    const { name, laboratory, category } = req.body;

    if(name) {
      data = data.filter(item => {
        return item.description.toUpperCase().search(name.toUpperCase()) === 0
      });
    }

    if(laboratory) {
      data = data.filter(item => item.laboratory === laboratory);
    }

    if(category) {
      data = data.filter(item => item.category === category);
    }

    return res.json(data);
  }
};

export default new ProductController();