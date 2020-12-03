import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import HandleFiles from '../utils/handleFiles'; 

interface IDatabase {
  id: number;
  code: string;
  description: string;
  quantity: string;
  stock: string;
  value: number;
  category: string;
  laboratory: string;
}

class ProductController {
  async index(req: Request, res: Response) {
    const { name, laboratory, category } = req.body;
    let data: IDatabase[] = await HandleFiles.readFile();

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

  async add(req: Request, res: Response) {
    const {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore
    } = req.body;
    const productRepository = getRepository(Product);

    let data = {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore,
      amount: 1
    };

    const listProduct = await productRepository.find({ id_drugstore });

    if(listProduct.length > 0) {
      var update = false;
      listProduct.forEach(item => {
        if(item.code === code) {
          update = true;
          data.amount = item.amount + 1;
        }
      });
    }

    if(update) {
      await productRepository.update({ code }, data);
      return res.status(201).json({ message: 'update successful' });
    }

    const product = productRepository.create(data);
    productRepository.save(product);
    
    return res.status(201).json({ message: 'created with successful' });
  }

  async remove(req: Request, res: Response) {
    const {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore
    } = req.body;
    const productRepository = getRepository(Product);

    let data = {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore,
      drugstore,
      amount: 0
    };

    const listProduct = await productRepository.find({ id_drugstore });

    if(listProduct.length === 0) return res.json({ message: 'no product for delete' });

    if(listProduct.length > 0) {
      let del = false;
      listProduct.forEach(item => {
        if(item.code === code && item.amount <= 1) {
          del = true;
        }else if(item.code === code) {
          data.amount = item.amount - 1;
        };
      });

      del 
        ? await productRepository.delete({ code })
        : await productRepository.update({ code }, data);

      return res.status(201).json({ message: 'delete successful' });
    }
    
    return res.json({ message: 'no product found' });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const productRepository = getRepository(Product);

    const product = await productRepository.find({ id_drugstore: id });

    return res.json(product);
  }
};

export default new ProductController();