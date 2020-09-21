import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Contractor from '@modules/contractors/infra/typeorm/entities/Contractor';
import ServiceCategory from './ServiceCategory';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  intention: string;

  @Column()
  urgency: string;

  @Column()
  CEP: string;

  @Column()
  area: string;

  @Column()
  description: string;

  @OneToOne(_type => Contractor, { eager: true, cascade: true })
  @JoinColumn({ name: 'contractor_id' })
  contractor: Contractor;

  @Column()
  contractor_id: string;

  @OneToOne(_type => ServiceCategory)
  @JoinColumn({ name: 'service_category' })
  category: ServiceCategory;

  @Column()
  service_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Service;
