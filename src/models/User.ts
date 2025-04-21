import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Unique,
  Validate,
  BelongsToMany,
} from 'sequelize-typescript';
import type { SkillModel } from './Skill.js';

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

  @BelongsToMany(() => UserModel, 'user_has_follower', 'user_id', 'follower_id')
  followers?: UserModel[];
  @BelongsToMany(() => UserModel, 'user_has_follower', 'follower_id', 'user_id')
  following?: UserModel[];

  async isFollowing(user: UserModel): Promise<boolean> {
    const following = await this.$get('following', { where: { id: user.id } });
    return following && following.length > 0;
  }

  async addFollower(user: UserModel): Promise<void> {
    await this.$add('followers', user);
  }

  async removeFollower(user: UserModel): Promise<void> {
    await this.$remove('followers', user);
  }
}
