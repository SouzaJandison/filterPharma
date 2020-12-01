import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { number } from 'yup';

import Product from '../app/models/Product';
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
  async index(req: Request, res: Response) {
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

  async create(req: Request, res: Response) {
    const {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore
    } = req.body;

    const data = {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore
    };

    const productRepository = getRepository(Product);

    const product = productRepository.create(data);
    productRepository.save(product);
    
    return res.status(201).json(product);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const productRepository = getRepository(Product);

    const product = await productRepository.find({ id_drugstore: id });

    return res.json(product);
  }
};

export default new ProductController();