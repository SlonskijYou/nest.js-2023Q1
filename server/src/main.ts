import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors();
  await app.listen(port, () => console.log(`server work on port: ${port}`));
}

start();
