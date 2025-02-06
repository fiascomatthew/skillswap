import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "message",
})
export class MessageModel extends Model {
  @Column(DataType.TEXT)
  content!: string;
}
