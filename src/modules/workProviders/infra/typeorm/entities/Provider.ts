import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  fantasyName: string;

  @Column()
  documentNumber: string;

  @Column()
  phone: string;

  @Column()
  bio: string;

  @Column()
  email: string;

  @Column()
  CEP: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  verified_email: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Provider;