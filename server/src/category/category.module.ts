import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./category.model";
import { User } from "src/users/users.model";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category, User])],
})
export class CategoryModule {}
