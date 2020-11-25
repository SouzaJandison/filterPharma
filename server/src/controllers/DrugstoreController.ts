import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Drugstore from '../app/models/Drugstore';
import { schemaDrugstoreCreate } from  '../validations/drugstore_validation';
import drugstore_view from '../views/drugstore_view';

class DrugstoreController {
  // index(req: Request, res: Response) {
  //   return res.json({ userId: req.userId });
  // }
  // async index(req: Request, res: Response) {
  //   const repository = getRepository(Drugstore);
  //   const {email, cnpj } = req.body;

  //   if(email) {
  //     const drugstoreEmailExists = await repository.findOne({ where: { email } });

  //     if(!drugstoreEmailExists) {
  //       return res.json({
  //         status: false,
  //         message: 'E-mail já cadastrado!'
  //       });
  //     };
  //   }

  //   if(cnpj) {
  //     const drugstoreCnpjExists = await repository.findOne({ where: { cnpj } });

  //     if(!drugstoreCnpjExists) {
  //       return res.json({
  //         status: false,
  //         message: 'CNPJ já cadastrado!'
  //       });
  //     };
  //   }

  //   return res.json({ status: true })
  // }

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

    const repository = getRepository(Drugstore);

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
  };
};

export default new DrugstoreController();
