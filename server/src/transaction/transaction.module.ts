import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "src/category/category.model";
import { User } from "src/users/users.model";
import { Transaction } from "./transaction.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [
    SequelizeModule.forFeature([User, Category, Transaction]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: { expiresIn: "24h" },
    }),
  ],
})
export class TransactionModule {}
