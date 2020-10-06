import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('suppliers')
class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fantasyName: string;

  @Column()
  documentNumber: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  CEP: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  verified_email: boolean;

  @Column()
  accept_terms: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Supplier;
