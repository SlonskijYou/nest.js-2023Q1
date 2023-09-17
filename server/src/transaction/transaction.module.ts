import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "src/category/category.model";
import { User } from "src/users/users.model";
import { Transaction } from "./transaction.model";

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [SequelizeModule.forFeature([User, Category, Transaction])],
})
export class TransactionModule {}
