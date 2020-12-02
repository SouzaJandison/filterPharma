import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Drugstore from '../models/Drugstore';
import { schemaDrugstoreCreate } from  '../validations/drugstore_validation';
import drugstore_view from '../views/drugstore_view';
import HandleFiles from '../utils/handleFiles'; 

class DrugstoreController {
  async index(req: Request, res: Response) {
    const id = req.headers.authorization;
    const repository = getRepository(Drugstore);

    const drugstore = await repository.findOne({ where: { id }});
    
    if(!drugstore) return res.sendStatus(401).json({ message: 'unauthorized access' });

    const medicine = await HandleFiles.readFile();

    return res.json(medicine);
  }
  
  async create(req: Request, res: Response) {
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
    const repository = getRepository(Drugstore);

    const data = {
      name,
      cnpj,
      email,
      phoneNumber,
      cep,
      city,
      uf,
      neighborhood,
      password
    }

    await schemaDrugstoreCreate.validate(data, {
      abortEarly: false
    })

    const drugstoreEmailExists = await repository.findOne({ where: { email } });
    if(drugstoreEmailExists) {
      return res.status(409).json({
        error: 'email',
        message: 'E-mail already registered'
      });
    };

    const drugstoreCnpjExists = await repository.findOne({ where: { cnpj } });
    if(drugstoreCnpjExists) {
      return res.status(409).json({
        error: 'cnpj',
        message: 'CNPJ already registered'
      });
    };

    const drugstore = repository.create(data);
    await repository.save(drugstore);

    return res.json(drugstore_view.render(drugstore));
  }
};

export default new DrugstoreController();
