import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(req.user.id);
  }
}
