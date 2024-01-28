import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiDocGenericDelete(value: string, modelResponseType?: any) {
  return applyDecorators(
    ApiOperation({ summary: `Remove the ${value} by id` }),
    ApiResponse({
      type: modelResponseType,
      status: 200,
      description: `The ${value} has been successfully deleted.`,
    }),
    ApiBadRequestResponse({
      description: `The ${value} could not be deleted.`,
    }),
    ApiForbiddenResponse({ description: `Forbidden.` }),
    ApiNotFoundResponse({ description: `The ${value} could not be found.` }),
    ApiBearerAuth('JWT'),
  );
}
