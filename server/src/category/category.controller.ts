import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() CategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.categoryCreate(CategoryDto, req.user.id);
  }

  @Get("findall")
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(req.user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string) {
    return this.categoryService.update(+id);
  }
}
