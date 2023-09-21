import {
  Body,
  Controller,
  Delete,
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
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { User } from "src/users/users.model";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post("createCategory")
  @UseGuards(JwtAuthGuard)
  create(@Body() CategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.categoryCreate(CategoryDto, +req.user.id);
  }

  @Get("findall")
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string, @Req() req) {
    return this.categoryService.findOne(+id, +req.user.id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateCategoryDto,
    @Req() req
  ) {
    return this.categoryService.update(+id, updateDto, +req.user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: string, @Req() req) {
    return this.categoryService.delete(+id, +req.user.id);
  }
}
