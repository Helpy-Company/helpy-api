import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Provider from '@modules/workProviders/infra/typeorm/entities/Provider';
import Material from './Material';

@Entity('materials_lists')
class MaterialList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider, provider => provider.materials_lists, {
    cascade: true,
  })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  provider_id: string;

  @Column()
  material_id: string;

  @ManyToOne(() => Material, material => material.material_list)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MaterialList;
