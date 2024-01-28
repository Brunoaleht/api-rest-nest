import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericPatch(
  value: string,
  modelType: any,
  modelResponseType: any,
) {
  return applyDecorators(
    ApiOperation({ summary: `Update the ${value} by id` }),
    ApiBody({ type: modelType }),
    ApiOkResponse({
      type: modelResponseType,
      description: `Data from ${value} has been successfully updated.`,
    }),
    ApiBadRequestResponse({
      description: `Bad request`,
    }),

    ApiForbiddenResponse({ description: `Forbidden.` }),
    ApiNotFoundResponse({ description: `The ${value} could not be found.` }),
    ApiBearerAuth('JWT'),
  );
}
