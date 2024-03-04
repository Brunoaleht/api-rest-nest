import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserTypes } from '../user/enum/user-type.enum';
import { ApiDocGenericPost } from '../../app/common/api-doc-generic-post.decorator';
import { CreateProductDto } from './dtos/product.created.dto';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { ApiDocGenericGetAll } from '../../app/common/api-doc-generic-get-all.decorator';
import { UpdateResult } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @Roles(UserTypes.Admin)
  @ApiDocGenericPost('product-created', CreateProductDto, ReturnProductDto)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<ReturnProductDto> {
    const createdProduct = await this.productService.createProduct(product);
    return new ReturnProductDto(createdProduct);
  }

  @Put('update/:productId')
  @Roles(UserTypes.Admin)
  @ApiDocGenericPost('product-update', CreateProductDto)
  @UsePipes(ValidationPipe)
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: CreateProductDto,
  ): Promise<UpdateResult> {
    if (!Number(productId)) 'Id invalido';
    return await this.productService.updateProduct(productId, product);
  }

  // @Get(':productId')
  // @Roles(UserTypes.Admin, UserTypes.User)
  // @ApiDocGenericGetAll('product-get-one', ReturnProductDto)
  // async findOneProduct(
  //   @Param('productId', ParseIntPipe) productId: number,
  // ): Promise<ReturnProductDto> {
  //   const product = await this.productService.getProductById(productId);
  //   return new ReturnProductDto(product);
  // }

  @Get('category/:categoryId')
  @Roles(UserTypes.Admin, UserTypes.User)
  @ApiDocGenericGetAll('product-get-all-by-category', ReturnProductDto)
  async findAllProductsByCategoryId(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ReturnProductDto[]> {
    const products =
      await this.productService.getAllProductByCategoryId(categoryId);
    return products.map((product) => new ReturnProductDto(product));
  }

  @Get()
  @Roles(UserTypes.Admin, UserTypes.User)
  @ApiDocGenericGetAll('product-get-all', ReturnProductDto)
  async findAllProducts(): Promise<ReturnProductDto[]> {
    const products = await this.productService.getAllProducts();
    return products.map((product) => new ReturnProductDto(product));
  }
}
