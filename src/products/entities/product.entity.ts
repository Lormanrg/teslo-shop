import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductImage } from './product-image.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiPropertyOptional(
    {
      description: 'Product Title',
      example: 'T-shirt Teslo',
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty(
    {
      description: 'Product Price',
      example: 100,
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty(
    {
      description: 'Product Description',
      example: 'This is a description of the product',
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty(
    {
      description: 'Product Slug',
      example: 't-shirt-teslo',
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty(
    {
      description: 'Product Stock',
      example: 100,
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty(
    {
      description: 'Product Sizes',
      example: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty(
    {
      description: 'Product Gender',
      example: 'men',
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('text')
  gender: string;


  @ApiProperty(
    {
      description: 'Product Tags',
      example: ['tag1', 'tag2', 'tag3'],
      uniqueItems: true,
      nullable: false,
    }
  )
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  //tags
  //images


  @ApiProperty(
    {
      description: 'Product Images',
      example: ['image1.jpg', 'image2.jpg'],
      uniqueItems: true,
      nullable: false,
    }
  )
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  checkSlugCreate() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}


