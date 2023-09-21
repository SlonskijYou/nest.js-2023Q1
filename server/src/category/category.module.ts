import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./category.model";
import { User } from "src/users/users.model";
import { Transaction } from "src/transaction/transaction.model";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([Category, User, Transaction]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
