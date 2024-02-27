import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { ProductModule } from './product/product.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';

export const FeatureModule = [
  UserModule,
  StateModule,
  CityModule,
  AddressModule,
  AuthModule,
  CategoryModule,
  ProductModule,
];
