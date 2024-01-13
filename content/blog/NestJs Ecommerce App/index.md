---
title: NestJs E-commerce App
date: "2024-01-13T17:41:37.121Z"
---

# Creating a NestJS E-commerce App

<img width="900" alt="selfDrivingCar" src="./image.webp">
In this blog, we'll embark on a journey to build a robust NestJS e-commerce application. To kick things off, we'll start by setting up our project and laying the foundation for the product management feature.

#### [GithubRepo Link](https://github.com/RudeSoul/NestJs-Ecommerce-app)

## Initializing a New Nest Project

Firstly, let's initialize a new Nest project by installing the Nest CLI and creating a project.

```bash
npm install -g @nestjs/cli
nest new nestjs-ecommerce
cd nestjs-ecommerce
npm run start:dev
```

Once the installation is complete, you can access your app in the browser at http://localhost:3000/, where you should see a welcoming "Hello World!" message.

The app will automatically reload upon any changes. If you prefer manual restarts, use `npm run start` instead.

## Creating the Store Product Feature

Let's dive into the core of our e-commerce platform by focusing on product management. This feature will enable us to retrieve, add, edit, and delete store products.

### Creating Product Resources

To set up the necessary resources, execute the following commands:

```bash
nest g module product
nest g service product --no-spec
nest g controller product --no-spec
```

These commands generate a product module along with service and controller files, creating a basic structure for our NestJS e-commerce store product feature.

### Configuring the MongoDB Database

As we're utilizing MongoDB, install the required packages:

```bash
npm install --save @nestjs/mongoose mongoose
```

Next, modify the `app.module.ts` file as follows:

```typescript
// app.module.ts

import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProductModule } from "./product/product.module"

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/store"), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

This setup establishes the Mongoose module for our MongoDB connection and includes the product module.

### Creating a Product Model Schema

Now, let's define a schema for our product model. In the product directory, create a new `schemas` directory and a `product.schema.ts` file within it:

```typescript
// product/schemas/product.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  price: number

  @Prop()
  category: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
```

This schema outlines the product properties such as name, description, price, and category.

Now, update the `product.module.ts` file:

```typescript
// product/product.module.ts

import { Module } from "@nestjs/common"
import { ProductController } from "./product.controller"
import { ProductService } from "./product.service"
import { MongooseModule } from "@nestjs/mongoose"
import { ProductSchema } from "./schemas/product.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
```

This modification ensures the Mongoose module uses our product schema.

### Creating Product DTO Files

In addition to the product schema, we require two Data Transfer Object (DTO) files for our NestJS e-commerce app. These DTOs define the data received from form submissions or search queries.

Create a new `dtos` directory in the product folder and add a `create-product.dto.ts` file:

```typescript
// product/dtos/create-product.dto.ts

export class CreateProductDTO {
  name: string
  description: string
  price: number
  category: string
}
```

Now, create a `filter-product.dto.ts` file in the same directory:

```typescript
// product/dtos/filter-product.dto.ts

export class FilterProductDTO {
  search: string
  category: string
}
```

These DTOs define the structure for creating a new product and filtering products.

### Creating Product Service Methods

Let's implement the actual code for product management. Replace the content of the `product.service.ts` file:

```typescript
// product/product.service.ts

import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Product, ProductDocument } from "./schemas/product.schema"
import { CreateProductDTO } from "./dtos/create-product.dto"
import { FilterProductDTO } from "./dtos/filter-product.dto"

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product")
    private readonly productModel: Model<ProductDocument>
  ) {}

  async getFilteredProducts(
    filterProductDTO: FilterProductDTO
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO
    let products = await this.getAllProducts()

    if (search) {
      products = products.filter(
        product =>
          product.name.includes(search) || product.description.includes(search)
      )
    }

    if (category) {
      products = products.filter(product => product.category === category)
    }

    return products
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec()
    return products
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec()
    return product
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO)
    return newProduct.save()
  }

  async updateProduct(
    id: string,
    createProductDTO: CreateProductDTO
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true }
    )
    return updatedProduct
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id)
    return deletedProduct
  }
}
```

Let's break down the key sections of the code:

1. **Dependency Injection and Constructor:**

   ```typescript
   @Injectable()
   export class ProductService {
     constructor(
       @InjectModel("Product")
       private readonly productModel: Model<ProductDocument>
     ) {}
   }
   ```

   Here, we inject the necessary dependencies, specifically the product model, using the `@InjectModel` decorator.

2. **Methods for Product Management:**

   ```typescript
   async getAllProducts(): Promise<Product[]> {
     // ...
   }

   async getProduct(id: string): Promise<Product> {
     // ...
   }

   async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
     // ...
   }

   async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
     // ...
   }

   async deleteProduct(id: string): Promise<any> {
     // ...
   }
   ```

   These methods handle various product-related operations, such as retrieving all products, getting a specific product by ID, adding a

new product, updating a product, and deleting a product.

### Creating Product Controller Methods

The final step for the product module is to create the API endpoints. We'll establish the following endpoints:

- `POST store/products/` — Add a new product
- `GET store/products/` — Get all products
- `GET store/products/:id` — Get a single product
- `PUT store/products/:id` — Edit a single product
- `DELETE store/products/:id` — Remove a single product

Open the `product.controller.ts` file and replace its content with the following:

```typescript
// product/product.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDTO } from "./dtos/create-product.dto"
import { FilterProductDTO } from "./dtos/filter-product.dto"

@Controller("store/products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get("/")
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDTO
      )
      return filteredProducts
    } else {
      const allProducts = await this.productService.getAllProducts()
      return allProducts
    }
  }

  @Get("/:id")
  async getProduct(@Param("id") id: string) {
    const product = await this.productService.getProduct(id)
    if (!product) throw new NotFoundException("Product does not exist!")
    return product
  }

  @Post("/")
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO)
    return product
  }

  @Put("/:id")
  async updateProduct(
    @Param("id") id: string,
    @Body() createProductDTO: CreateProductDTO
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO
    )
    if (!product) throw new NotFoundException("Product does not exist!")
    return product
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: string) {
    const product = await this.productService.deleteProduct(id)
    if (!product) throw new NotFoundException("Product does not exist")
    return product
  }
}
```

Let's dissect the code:

1. **Controller Setup:**

   ```typescript
   @Controller("store/products")
   export class ProductController {
     constructor(private productService: ProductService) {}
   }
   ```

   The `@Controller` decorator defines the base URL for our product-related endpoints.

2. **Endpoint for Getting Products:**

   ```typescript
   @Get('/')
   async getProducts(@Query() filterProductDTO: FilterProductDTO) {
     // ...
   }
   ```

   This endpoint handles the retrieval of products, allowing for optional filtering based on search queries or categories.

3. **Endpoints for Managing Single Products:**

   ```typescript
   @Get('/:id')
   async getProduct(@Param('id') id: string) {
     // ...
   }

   @Post('/')
   async addProduct(@Body() createProductDTO: CreateProductDTO) {
     // ...
   }

   @Put('/:id')
   async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
     // ...
   }

   @Delete('/:id')
   async deleteProduct(@Param('id') id: string) {
     // ...
   }
   ```

   These endpoints cover operations such as getting a single product, adding a new product, updating an existing product, and deleting a product. The appropriate methods from the product service are utilized for each operation.

Now that we've successfully implemented the product management feature, we can move on to creating the user management feature.

now we will explore the implementation of authentication and authorization strategies using JSON Web Tokens (JWT) in a NestJS E-commerce application. Additionally, we'll enhance the application by adding a basic cart functionality to provide users with a seamless shopping experience.

### Setting Up JWT Authentication

To implement JWT authentication, we start by installing the required packages:

```bash
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

Now, create a `jwt.strategy.ts` file in the strategies directory with the following content:

```typescript
// jwt.strategy.ts

import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import "dotenv/config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    }
  }
}
```

In this code, we define a JWT strategy using Passport, extracting the token from the bearer header. The `validate()` method decodes the JWT and returns a user object.

Next, update the `auth.service.ts` file:

```typescript
// auth.service.ts

import { Injectable } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username)
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (user && isPasswordMatch) {
      return user
    }

    return null
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
```

In the `login` method, we sign a JWT using the `JwtService`.

Update `auth.module.ts` to include the new configurations:

```typescript
// auth.module.ts

import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UserModule } from "src/user/user.module"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import "dotenv/config"

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```

Here, we added `UserModule`, `PassportModule`, and configured `JwtModule` with the secret key and token expiration.

### Creating Local and JWT Guards

To utilize the strategies, create guards for local and JWT authentication:

In the guards directory, create `local.guard.ts`:

```typescript
// local.guard.ts

import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
```

Also, create `jwt.guard.ts`:

```typescript
// jwt.guard.ts

import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

These guards will be used to protect routes.

### User Roles Management

Implementing role-based access control requires creating three files: `role.enum.ts`, `roles.decorator.ts`, and `roles.guard.ts`.

Start with `role.enum.ts`:

```typescript
// role.enum.ts

export enum Role {
  User = "user",
  Admin = "admin",
}
```

Now, create `roles.decorator.ts` in the decorators folder:

```typescript
// roles.decorator.ts

import { SetMetadata } from "@nestjs/common"
import { Role } from "../enums/role.enum"

export const ROLES_KEY = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
```

Finally, in the guards directory, add `roles.guard.ts`:

```typescript
// roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Role } from "../enums/role.enum"
import { ROLES_KEY } from "../decorators/roles.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some(role => user.roles?.includes(role))
  }
}
```

This guard checks if the user has the required roles specified in the route's metadata.

### Controller Methods

Update `auth.controller.ts` to include the new endpoints:

```typescript
// auth.controller.ts

import { Controller, Request, Get, Post, Body, UseGuards } from "@nestjs/common"
import { CreateUserDTO } from "src/user/dtos/create-user.dto"
import { UserService } from "src/user/user.service"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { Roles } from "./decorators/roles.decorator"
import { Role } from "./enums/role.enum"
import { RolesGuard } from "./guards/roles.guard"

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("/register")
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO)
    return user
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get("/user")
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get("/admin")
  getDashboard(@Request() req) {
    return req.user
  }
}
```

This controller now includes four endpoints: registration, login, user profile, and admin

dashboard. The guards and roles are applied accordingly.

## Implementing a Store Cart Feature

### Setting Up Cart Resources

Create the necessary resources for the cart feature:

```bash
nest g module cart
nest g service cart --no-spec
nest g controller cart --no-spec
```

### Creating Schemas and DTOs

For the cart functionality, define two schemas: `item.schema.ts` and `cart.schema.ts`.

In the schemas directory, create `item.schema.ts`:

```typescript
// item.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes } from "mongoose"

export type ItemDocument = Item & Document

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Product" })
  productId: string

  @Prop()
  name: string

  @Prop()
  quantity: number

  @Prop()
  price: number

  @Prop()
  subTotalPrice: number
}

export const ItemSchema = SchemaFactory.createForClass(Item)
```

Now, create `cart.schema.ts`:

```typescript
// cart.schema.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes } from "mongoose"
import { Item } from "./item.schema"

export type CartDocument = Cart & Document

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  userId: string

  @Prop()
  items: Item[]

  @Prop()
  totalPrice: number
}

export const CartSchema = SchemaFactory.createForClass(Cart)
```

These schemas represent the products in the cart and the cart itself.

Now we'll delve into the process of creating a robust shopping cart management system using NestJS, a powerful TypeScript framework for building scalable and maintainable server-side applications.

## Setting Up the Item DTO

Let's kick things off by creating a Data Transfer Object (DTO) for our items. In your user directory, establish a new folder named `dtos` and inside it, add a file named `item.dto.ts` with the following content:

```typescript
export class ItemDTO {
  productId: string
  name: string
  quantity: number
  price: number
}
```

## Configuring the Cart Module

Before diving into the business logic, we need to configure the cart schema in the cart module. Open the `cart.module.ts` file and set it up to use the cart schema:

```typescript
import { Module } from "@nestjs/common"
import { CartController } from "./cart.controller"
import { CartService } from "./cart.service"
import { MongooseModule } from "@nestjs/mongoose"
import { CartSchema } from "./schemas/cart.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: "Cart", schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
```

## Crafting Cart Service Methods

Now, let's delve into the core of cart management logic. Open the `cart.service.ts` file and replace its content with the following:

```typescript
import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Cart, CartDocument } from "./schemas/cart.schema"
import { ItemDTO } from "./dtos/item.dto"

@Injectable()
export class CartService {
  constructor(
    @InjectModel("Cart") private readonly cartModel: Model<CartDocument>
  ) {}

  async createCart(
    userId: string,
    itemDTO: ItemDTO,
    subTotalPrice: number,
    totalPrice: number
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    })
    return newCart
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId })
    return cart
  }

  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId })
    return deletedCart
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0
    cart.items.forEach(item => {
      cart.totalPrice += item.quantity * item.price
    })
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price } = itemDTO
    const subTotalPrice = quantity * price

    const cart = await this.getCart(userId)

    if (cart) {
      const itemIndex = cart.items.findIndex(
        item => item.productId == productId
      )

      if (itemIndex > -1) {
        let item = cart.items[itemIndex]
        item.quantity = Number(item.quantity) + Number(quantity)
        item.subTotalPrice = item.quantity * item.price

        cart.items[itemIndex] = item
        this.recalculateCart(cart)
        return cart.save()
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice })
        this.recalculateCart(cart)
        return cart.save()
      }
    } else {
      const newCart = await this.createCart(
        userId,
        itemDTO,
        subTotalPrice,
        price
      )
      return newCart
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCart(userId)

    const itemIndex = cart.items.findIndex(item => item.productId == productId)

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1)
      return cart.save()
    }
  }
}
```

The service methods cater to various aspects of cart management, such as creating a new cart, retrieving a cart, deleting a cart, recalculating cart totals, adding items to the cart, and removing items from the cart.

## Implementing Cart Controller Methods

The final step is to implement the cart controller methods. Open the `cart.controller.ts` file and update its content with the following:

```typescript
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  NotFoundException,
  Param,
} from "@nestjs/common"
import { Roles } from "src/auth/decorators/roles.decorator"
import { Role } from "src/auth/enums/role.enum"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard"
import { RolesGuard } from "src/auth/guards/roles.guard"
import { CartService } from "./cart.service"
import { ItemDTO } from "./dtos/item.dto"

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post("/")
  async addItemToCart(@Request() req, @Body() itemDTO: ItemDTO) {
    const userId = req.user.userId
    const cart = await this.cartService.addItemToCart(userId, itemDTO)
    return cart
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete("/")
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const userId = req.user.userId
    const cart = await this.cartService.removeItemFromCart(userId, productId)
    if (!cart) throw new NotFoundException("Item does not exist")
    return cart
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete("/:id")
  async deleteCart(@Param("id") userId: string) {
    const cart = await this.cartService.deleteCart(userId)
    if (!cart) throw new NotFoundException("Cart does not exist")
    return cart
  }
}
```

The controller methods enforce user authentication and role-based access to ensure that only authorized users can add or remove products from their carts.

## Conclusion

In this blog, we've walked through the process of building a robust shopping cart management system for an e-commerce app using NestJS. Leveraging TypeScript and NestJS's modular architecture, we've created a scalable and maintainable solution for handling user carts. Feel free to adapt and extend these concepts to suit the specific requirements of your e-commerce application. Happy coding!
