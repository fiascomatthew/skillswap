import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Unique,
  Validate,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "user_has_skill",
})
export class UserSkill extends Model<UserSkill> {
  @Default(null)
  @Column(DataType.TEXT)
  description!: string;
  @Column(DataType.TINYINT)
  priority!: number;
}
