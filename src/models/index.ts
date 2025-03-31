import { AvailabilityModel } from './Availability';
import { SkillModel } from './Skill';
import { UserModel } from './User';
import { CategoryModel } from './Category';
import { ReviewModel } from './Review';
import { MessageModel } from './Message';
import { BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { UserSkill } from './UserSkill';
import { UserInterest } from './UserInterest';

export class User extends UserModel {
  @BelongsToMany(
    () => Skill,
    () => UserSkill,
    'user_id',
    'skill_id',
  )
  skills?: Skill[];
  @BelongsToMany(
    () => Skill,
    () => UserInterest,
    'user_id',
    'interest_id',
  )
  interests?: Skill[];
  @BelongsToMany(() => User, 'user_has_follower', 'user_id', 'follower_id')
  followers?: User[];
  @BelongsToMany(() => User, 'user_has_follower', 'follower_id', 'user_id')
  following?: User[];
  @HasMany(() => ReviewModel, 'reviewee_id')
  reviewsReceived?: ReviewModel[];
  @HasMany(() => ReviewModel, 'reviewer_id')
  reviewsGiven?: ReviewModel[];
  @HasMany(() => MessageModel, 'sender_id')
  messagesSent?: MessageModel[];
  @HasMany(() => MessageModel, 'receiver_id')
  messagesReceived?: MessageModel[];
  @HasMany(() => AvailabilityModel, 'user_id')
  availabilities?: AvailabilityModel[];
}
export class Skill extends SkillModel {
  @BelongsToMany(
    () => User,
    () => UserSkill,
    'skill_id',
    'user_id',
  )
  skillsUsers?: User[];
  @BelongsToMany(
    () => User,
    () => UserInterest,
    'interest_id',
    'user_id',
  )
  interestsUsers?: User[];
  @BelongsTo(() => Category, 'category_id')
  category?: Category;
}
export class Review extends ReviewModel {
  @BelongsTo(() => User, 'reviewer_id')
  reviewer?: User;
  @BelongsTo(() => User, 'reviewee_id')
  reviewee?: User;
}
export class Message extends MessageModel {
  @BelongsTo(() => User, 'sender_id')
  sender?: User;
  @BelongsTo(() => User, 'receiver_id')
  receiver?: User;
}
export class Availability extends AvailabilityModel {
  @BelongsTo(() => User, 'user_id')
  user?: User;
}
export class Category extends CategoryModel {
  @HasMany(() => Skill, 'category_id')
  skills?: Skill[];
}
export { UserSkill, UserInterest };
