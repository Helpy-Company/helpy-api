import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import ServiceCategory from '@modules/workService/infra/typeorm/entities/ServiceCategory';
import List from '@modules/lists/infra/typeorm/entities/List';

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

  @Column()
  accept_terms: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => List, list => list.provider)
  lists: List[];

  @ManyToMany(() => ServiceCategory, { eager: true, cascade: true })
  @JoinTable({
    name: 'providers_services_categories',
    joinColumns: [{ name: 'provider_id' }],
    inverseJoinColumns: [{ name: 'service_category_id' }],
  })
  service_categories: ServiceCategory[];
}

export default Provider;
