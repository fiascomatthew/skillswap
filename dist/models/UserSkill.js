var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Table, Column, DataType, Default, } from 'sequelize-typescript';
let UserSkill = class UserSkill extends Model {
};
__decorate([
    Default(null),
    Column(DataType.TEXT),
    __metadata("design:type", String)
], UserSkill.prototype, "description", void 0);
__decorate([
    Column(DataType.TINYINT),
    __metadata("design:type", Number)
], UserSkill.prototype, "priority", void 0);
UserSkill = __decorate([
    Table({
        tableName: 'user_has_skill',
    })
], UserSkill);
export { UserSkill };
