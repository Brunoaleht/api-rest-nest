import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericGetOne(value: string, modelType: any) {
  return applyDecorators(
    ApiOperation({ summary: `Get the ${value} by id` }),
    ApiOkResponse({
      type: modelType,
      description: `The ${value} has been successfully retrieved.`,
    }),
    ApiBadRequestResponse({
      description: `Bad request`,
    }),
    ApiForbiddenResponse({ description: `Forbidden.` }),
    ApiNotFoundResponse({ description: `The ${value} could not be found.` }),
    ApiBearerAuth('JWT'),
  );
}
