import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BeforeInsert, 
  BeforeUpdate, 
  OneToMany, 
  JoinColumn 
} from 'typeorm';
import bcrypt from 'bcryptjs';

import Product from './Product';

@Entity('drugstores')
class Drugstore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  neighborhood: string;

  @Column()
  password: string;

  @OneToMany(() => Product, product => product.drugstore, {
    cascade: ['insert', 'update']
  })

  @JoinColumn({ name: 'drugstore_id' })
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default Drugstore;