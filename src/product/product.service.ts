import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne({
      where: { id },
    });
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.description)
      product.description = updateProductDto.description;
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('Продукта не существует!');
    return await this.productRepository.delete(id);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(query: FindOneOptions<Product>) {
    return this.productRepository.findOne(query);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
  
    return this.productRepository.save(createProductDto);
  }
}
