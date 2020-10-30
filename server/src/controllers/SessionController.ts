import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Drugstore from '../app/models/Drugstore';
import { schemaSessionCreate } from '../validations/session_validation';
import drugstore_view from '../views/drugstore_view';

class SessionController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    await schemaSessionCreate.validate({ email, password }, {
      abortEarly: false
    })

    const repository = getRepository(Drugstore);

    const drugstore = await repository.findOne({ where: { email } });
    if(!drugstore) {
      return res.status(401).json({ message: 'No drugstore found with this E-mail' });
    };

    const isValidPassword = await bcrypt.compare(password, drugstore.password);
    if(!isValidPassword) {
      return res.status(401).json({ message: 'password is incorrect' });
    };

    const token = jwt.sign({ id: drugstore.id }, process.env.APP_SECRET, { expiresIn: '1d' });
    
    return res.json({
      drugstore: drugstore_view.render(drugstore),
      token
    });
  }
}

export default new SessionController();
