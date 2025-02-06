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
  tableName: "user_has_interest",
})
export class UserInterest extends Model<UserInterest> {
  @Column(DataType.TINYINT)
  priority!: number;
}
