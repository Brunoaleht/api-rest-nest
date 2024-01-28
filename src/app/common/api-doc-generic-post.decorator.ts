import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericPost(
  value: string,
  modelType: any,
  modelResponseType?: any,
) {
  return applyDecorators(
    ApiOperation({ summary: `Create a new ${value}` }),
    ApiBody({ type: modelType }),
    ApiCreatedResponse({
      type: modelResponseType,
      status: 201,
      description: `The ${value} has been successfully created.`,
    }),
    ApiBadRequestResponse({
      description: `The ${value} could not be created.`,
    }),
    ApiForbiddenResponse({ description: `Forbidden.` }),
    ApiBearerAuth('JWT'),
  );
}
