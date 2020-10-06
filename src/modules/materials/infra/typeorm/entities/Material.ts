import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MaterialList from './MaterialList';

@Entity('materials')
class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => MaterialList, materialList => materialList.material, {
    cascade: true,
  })
  material_list: MaterialList;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default Material;
