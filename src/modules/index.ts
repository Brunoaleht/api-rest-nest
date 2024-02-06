import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { UserModule } from './user/user.module';

export const FeatureModule = [
  UserModule,
  StateModule,
  CityModule,
  AddressModule,
];
