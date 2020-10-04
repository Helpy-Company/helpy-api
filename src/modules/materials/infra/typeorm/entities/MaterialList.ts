import List from '@modules/lists/infra/typeorm/entities/List';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Material from './Material';

@Entity('materials_lists')
class MaterialList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => List, list => list.materials_lists)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @Column()
  list_id: string;

  @Column()
  material_id: string;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MaterialList;
