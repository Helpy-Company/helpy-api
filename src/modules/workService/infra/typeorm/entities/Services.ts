import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import ServiceCategory from './ServiceCategory';

@Entity('services')
class Services {
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

  @OneToOne((_type) => User, { eager: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @OneToOne((_type) => ServiceCategory)
  @JoinColumn({ name: 'service_category' })
  category: ServiceCategory;

  @Column()
  service_category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Services;
