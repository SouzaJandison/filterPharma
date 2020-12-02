import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import Drugstore from '../models/Drugstore';
import { schemaSessionCreate } from '../validations/session_validation';
import drugstore_view from '../views/drugstore_view';

class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const repository = getRepository(Drugstore);

    await schemaSessionCreate.validate({ email, password }, {
      abortEarly: false
    })

    const drugstore = await repository.findOne({ where: { email } });
    if(!drugstore) {
      return res.status(401).json({ message: 'No drugstore found with this E-mail' });
    };

    const isValidPassword = await bcrypt.compare(password, drugstore.password);
    if(!isValidPassword) {
      return res.status(401).json({ message: 'password is incorrect' });
    };
    
    return res.json(drugstore_view.render(drugstore));
  }
}

export default new SessionController();
