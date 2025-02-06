import { Model, Table, Column, DataType, Unique } from "sequelize-typescript";

@Table({
  tableName: "category",
})
export class CategoryModel extends Model {
  @Unique(true)
  @Column(DataType.STRING(100))
  name!: string;
}
