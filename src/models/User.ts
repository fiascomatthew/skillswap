import { Model, Table, Column, DataType, AllowNull, Unique, Validate } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class UserModel extends Model<UserModel> {
  @Validate({ notEmpty: true })
  @Column(DataType.STRING(50))
  firstname!: string;
  @Validate({ notEmpty: true })
  @Column(DataType.STRING(50))
  lastname!: string;
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;
  @Column(DataType.STRING)
  password!: string;
  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string;
  @Column(DataType.STRING(100))
  location!: string;
  @Column(DataType.TEXT)
  bio!: string;
}
