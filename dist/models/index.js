var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AvailabilityModel } from './Availability.js';
import { SkillModel } from './Skill.js';
import { UserModel } from './User.js';
import { CategoryModel } from './Category.js';
import { ReviewModel } from './Review.js';
import { MessageModel } from './Message.js';
import { BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { UserSkill } from './UserSkill.js';
import { UserInterest } from './UserInterest.js';
export class User extends UserModel {
}
__decorate([
    BelongsToMany(() => Skill, () => UserSkill, 'user_id', 'skill_id'),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
__decorate([
    BelongsToMany(() => Skill, () => UserInterest, 'user_id', 'interest_id'),
    __metadata("design:type", Array)
], User.prototype, "interests", void 0);
__decorate([
    HasMany(() => ReviewModel, 'reviewee_id'),
    __metadata("design:type", Array)
], User.prototype, "reviewsReceived", void 0);
__decorate([
    HasMany(() => ReviewModel, 'reviewer_id'),
    __metadata("design:type", Array)
], User.prototype, "reviewsGiven", void 0);
__decorate([
    HasMany(() => MessageModel, 'sender_id'),
    __metadata("design:type", Array)
], User.prototype, "messagesSent", void 0);
__decorate([
    HasMany(() => MessageModel, 'receiver_id'),
    __metadata("design:type", Array)
], User.prototype, "messagesReceived", void 0);
__decorate([
    HasMany(() => AvailabilityModel, 'user_id'),
    __metadata("design:type", Array)
], User.prototype, "availabilities", void 0);
export class Skill extends SkillModel {
}
__decorate([
    BelongsToMany(() => User, () => UserSkill, 'skill_id', 'user_id'),
    __metadata("design:type", Array)
], Skill.prototype, "skillsUsers", void 0);
__decorate([
    BelongsToMany(() => User, () => UserInterest, 'interest_id', 'user_id'),
    __metadata("design:type", Array)
], Skill.prototype, "interestsUsers", void 0);
__decorate([
    BelongsTo(() => CategoryModel, 'category_id'),
    __metadata("design:type", CategoryModel)
], Skill.prototype, "category", void 0);
export class Review extends ReviewModel {
}
__decorate([
    BelongsTo(() => User, 'reviewer_id'),
    __metadata("design:type", User)
], Review.prototype, "reviewer", void 0);
__decorate([
    BelongsTo(() => User, 'reviewee_id'),
    __metadata("design:type", User)
], Review.prototype, "reviewee", void 0);
export class Message extends MessageModel {
}
__decorate([
    BelongsTo(() => User, 'sender_id'),
    __metadata("design:type", User)
], Message.prototype, "sender", void 0);
__decorate([
    BelongsTo(() => User, 'receiver_id'),
    __metadata("design:type", User)
], Message.prototype, "receiver", void 0);
export class Availability extends AvailabilityModel {
}
__decorate([
    BelongsTo(() => User, 'user_id'),
    __metadata("design:type", User)
], Availability.prototype, "user", void 0);
export class Category extends CategoryModel {
}
__decorate([
    HasMany(() => Skill, 'category_id'),
    __metadata("design:type", Array)
], Category.prototype, "skills", void 0);
export { UserSkill, UserInterest };
