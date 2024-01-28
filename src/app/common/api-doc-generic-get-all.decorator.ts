import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericGetAll(value: string, modelType: any) {
  return applyDecorators(
    ApiOperation({ summary: `Get all ${value}` }),
    ApiOkResponse({
      type: modelType,
      isArray: true,
      description: `The ${value} has been successfully retrieved.`,
    }),
    ApiBadRequestResponse({
      description: `The ${value} could not be retrieved.`,
    }),
    ApiForbiddenResponse({ description: `Forbidden.` }),
    ApiBearerAuth('JWT'),
  );
}
