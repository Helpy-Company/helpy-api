import Provider from '@modules/workProviders/infra/typeorm/entities/Provider';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('services_categories')
class ServiceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Provider)
  @JoinTable({
    name: 'providers_services_categories',
    joinColumns: [{ name: 'service_category_id' }],
    inverseJoinColumns: [{ name: 'provider_id' }],
  })
  service_categories: ServiceCategory[];
}

export default ServiceCategory;
