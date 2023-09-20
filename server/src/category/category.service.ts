import { BadRequestException, Injectable } from "@nestjs/common";
import { Category } from "./category.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async categoryCreate(categoryDto: CreateCategoryDto, id: number) {
    const findCategory = await this.categoryRepository.findOne({
      where: { userId: id, title: categoryDto.title },
    });

    if (findCategory) {
      throw new BadRequestException("Данная категория уже существует!");
    }

    const create = await this.categoryRepository.create({
      title: categoryDto.title,
      userId: id,
    });

    return create;
  }

  async findAll(id: number) {
    const findall = await this.categoryRepository.findAll({
      where: { userId: id },
      include: ["transaction"],
    });

    return findall;
  }

  async findOne(id: number) {
    const oneCategory = await this.categoryRepository.findOne({
      where: { id: id },
      include: ["transaction", "user"],
    });

    if (!oneCategory) {
      throw new BadRequestException("Данной категории не существует");
    }

    return oneCategory;
  }

  async update(id: number) {}
}
