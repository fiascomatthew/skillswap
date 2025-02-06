import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Validate,
} from "sequelize-typescript";

@Table({
  tableName: "review",
})
export class ReviewModel extends Model {
  @Validate({ min: 1, max: 5 })
  @Column(DataType.TINYINT)
  rating!: number;
  @Column(DataType.TEXT)
  review?: string;
}
