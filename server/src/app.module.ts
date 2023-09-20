import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModule } from "./category/category.module";
import { User } from "./users/users.model";
import { Category } from "./category/category.model";
import { TransactionModule } from "./transaction/transaction.module";
import { Transaction } from "./transaction/transaction.model";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Category, Transaction],
      autoLoadModels: true,
    }),
    UsersModule,
    CategoryModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
