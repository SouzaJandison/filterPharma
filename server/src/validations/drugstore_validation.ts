import * as yup from 'yup';

const schemaDrugstoreCreate = yup.object().shape({
  name: yup.string().required().min(3),
  cnpj: yup.string().required().max(18).min(18),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required().max(15),
  cep: yup.string().required().max(9),
  city: yup.string().required(),
  uf: yup.string().required().max(2),
  neighborhood: yup.string().required(),
  password: yup.string().required()
});

export {
  schemaDrugstoreCreate
}