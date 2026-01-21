import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Product Title',
    example: 'T-shirt Teslo',
    uniqueItems: true,
    nullable: false,
  })
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'Product Price',
    example: 100,
    uniqueItems: true,
    nullable: false,
  })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Product Description',
    example: 'This is a description of the product',
    uniqueItems: true,
    nullable: false,
  })
  description?: string;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    description: 'Product Sizes',
    example: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    uniqueItems: true,
    nullable: false,
  })
  sizes: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Product Slug',
    example: 't-shirt-teslo',
    uniqueItems: true,
    nullable: false,
  })
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'Product Stock',
    example: 100,
    uniqueItems: true,
    nullable: false,
  })
  stock?: number;

  @IsIn(['men', 'women', 'kid', 'unisex'])
  @ApiProperty({
    description: 'Product Gender',
    example: 'men',
    uniqueItems: true,
    nullable: false,
  })
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Product Tags',
    example: ['tag1', 'tag2', 'tag3'],
    uniqueItems: true,
    nullable: false,
  })
  tags: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Product Images',
    example: ['image1.jpg', 'image2.jpg'],
    uniqueItems: true,
    nullable: false,
  })
  images?: string[];
}
