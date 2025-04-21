var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model, Table, Column, DataType, AllowNull, Unique, Validate, BelongsToMany, } from 'sequelize-typescript';
let UserModel = class UserModel extends Model {
    isFollowing(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield this.$get('following', { where: { id: user.id } });
            return following && following.length > 0;
        });
    }
    addFollower(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$add('followers', user);
        });
    }
    removeFollower(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.$remove('followers', user);
        });
    }
};
__decorate([
    Validate({ notEmpty: true }),
    Column(DataType.STRING(50)),
    __metadata("design:type", String)
], UserModel.prototype, "firstname", void 0);
__decorate([
    Validate({ notEmpty: true }),
    Column(DataType.STRING(50)),
    __metadata("design:type", String)
], UserModel.prototype, "lastname", void 0);
__decorate([
    Unique(true),
    Column(DataType.STRING),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.STRING),
    __metadata("design:type", String)
], UserModel.prototype, "image", void 0);
__decorate([
    Column(DataType.STRING(100)),
    __metadata("design:type", String)
], UserModel.prototype, "location", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], UserModel.prototype, "bio", void 0);
__decorate([
    BelongsToMany(() => UserModel, 'user_has_follower', 'user_id', 'follower_id'),
    __metadata("design:type", Array)
], UserModel.prototype, "followers", void 0);
__decorate([
    BelongsToMany(() => UserModel, 'user_has_follower', 'follower_id', 'user_id'),
    __metadata("design:type", Array)
], UserModel.prototype, "following", void 0);
UserModel = __decorate([
    Table({
        tableName: 'user',
    })
], UserModel);
export { UserModel };
