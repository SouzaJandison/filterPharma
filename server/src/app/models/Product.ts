import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import Drugstore from './Drugstore';

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  value: string;
  
  @Column()
  category: string;
  
  @Column()
  laboratory: string;

  @Column()
  id_drugstore: string;

  @ManyToOne(() => Drugstore, drugstore => drugstore.products)

  @JoinColumn({ name: 'drugstore_id' })
  drugstore: Drugstore;
}

export default Product;