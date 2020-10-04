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

  @OneToMany(() => MaterialList, materialList => materialList.material)
  material_list: MaterialList[];

  @Column()
  name: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Material;
