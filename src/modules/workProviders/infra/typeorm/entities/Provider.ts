import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import ServiceCategory from '@modules/workService/infra/typeorm/entities/ServiceCategory';

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

  @ManyToMany(() => ServiceCategory, { eager: true, cascade: true })
  @JoinTable({
    name: 'providers_services_categories',
    joinColumns: [{ name: 'provider_id' }],
    inverseJoinColumns: [{ name: 'service_category_id' }],
  })
  service_categories: ServiceCategory[];
}

export default Provider;
