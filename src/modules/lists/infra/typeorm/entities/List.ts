import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Provider from '@modules/workProviders/infra/typeorm/entities/Provider';
import MaterialList from '@modules/materials/infra/typeorm/entities/MaterialList';

@Entity('lists')
class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Provider, provider => provider.lists)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @OneToMany(() => MaterialList, materialList => materialList.list, {
    cascade: true,
  })
  materials_lists: MaterialList[];

  @Column()
  provider_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default List;
