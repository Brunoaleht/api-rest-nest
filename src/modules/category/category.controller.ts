import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dtos/category.created.dto';
import { CategoryEntity } from './entity/category.entity';
import { ApiDocGenericPost } from '../../app/common/api-doc-generic-post.decorator';
import { ApiDocGenericGetAll } from 'src/app/common/api-doc-generic-get-all.decorator';
import { ApiDocGenericGetOne } from 'src/app/common/api-doc-generic-get-one.decorator';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserTypes } from '../user/enum/user-type.enum';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @Roles(UserTypes.Admin)
  @ApiDocGenericPost('category-created', CreateCategoryDto, CategoryEntity)
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    const createdCategory = await this.categoryService.createCategory(category);
    return new ReturnCategoryDto(createdCategory);
  }

  @Get(':categoryId')
  @Roles(UserTypes.Admin, UserTypes.User)
  @ApiDocGenericGetOne('category-get-one', ReturnCategoryDto)
  async findOneCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ReturnCategoryDto> {
    const category = await this.categoryService.getCategoryId(+categoryId);
    return new ReturnCategoryDto(category);
  }

  @Get()
  @Roles(UserTypes.Admin, UserTypes.User)
  @ApiDocGenericGetAll('category-get-all', CategoryEntity)
  async getAllCategory(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.getAllCategory()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }
}
