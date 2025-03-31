import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'skill',
})
export class SkillModel extends Model {
  @Column(DataType.TEXT)
  description!: string;
}
