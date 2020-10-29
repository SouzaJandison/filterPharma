import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Drugstore from '../app/models/Drugstore';
import drugstore_view from '../views/drugstore_view';

class DrugstoreController {
  // index(req: Request, res: Response) {
  //   return res.json({ userId: req.userId });
  // }

  async create(req: Request, res: Response) {
    const repository = getRepository(Drugstore);
    const { 
      name,
      cnpj,
      email,
      phoneNumber,
      cep,
      city,
      uf,
      neighborhood,
      password 
    } = req.body;

    const drugstoreEmailExists = await repository.findOne({ where: { email } });
    if(drugstoreEmailExists) {
      return res.status(409).json({ message: 'E-mail already registered' });
    };

    const drugstoreCnpjExists = await repository.findOne({ where: { cnpj } })
    if(drugstoreCnpjExists) {
      return res.status(409).json({ message: 'CNPJ already registered' })
    }

    const drugstore = repository.create({
      name,
      cnpj,
      email,
      phoneNumber,
      cep,
      city,
      uf,
      neighborhood,
      password
    });
    await repository.save(drugstore);

    return res.json(drugstore_view.render(drugstore));
  }
}

export default new DrugstoreController();
