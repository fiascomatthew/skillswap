import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'availability',
})
export class AvailabilityModel extends Model {
  @Column(DataType.DATEONLY)
  date!: string;
  @Column(DataType.TIME)
  start_time!: string;
  @Column(DataType.TIME)
  end_time!: string;
}
