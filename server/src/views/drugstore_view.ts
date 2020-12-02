import Drugstore from '../models/Drugstore';

export default {
  render(drugstore:  Drugstore) {
    return {
      id: drugstore.id,
      name: drugstore.name,
      cnpj: drugstore.cnpj,
      email: drugstore.email,
      phoneNumber: drugstore.phoneNumber,
      cep: drugstore.cep,
      city: drugstore.city,
      uf: drugstore.uf,
      neighborhood: drugstore.neighborhood
    };
  }
}