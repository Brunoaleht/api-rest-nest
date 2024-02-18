import { SetMetadata } from '@nestjs/common';
import { UserTypes } from 'src/modules/user/enum/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypes[]) => SetMetadata(ROLES_KEY, roles);
