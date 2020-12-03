interface IMedicine {
  id: number;
  code: string;
  description: string;
  quantity: string;
  stock: string;
  value: string;
  category: string;
  laboratory: string;
}

interface IProduct {
  id: number,
  code: string,
  description: string,
  value: number,
  category: string,
  laboratory: string,
  amount: number,
  id_drugstore: string
}

interface IListProduct {
  id: number,
  code: string,
  description: string,
  value: number,
  category: string,
  laboratory: string,
  amount: number,
  id_drugstore: string
}

export type {
  IMedicine,
  IProduct,
  IListProduct
}