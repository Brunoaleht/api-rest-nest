import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const addSwagger = (app: INestApplication) => {
  const configService = app.get<ConfigService>(ConfigService);

  const appName = configService.get<string>('API_NAME');
  const apiService = configService.get<string>('API_SERVICE');
  const apiVersion = configService.get<string>('API_VERSION');
  const appDescription = configService.get<string>('API_DESCRIPTION');
  const appTags = configService.get<string>('API_TAGS');

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .addServer(apiService ?? '')
    .setVersion(apiVersion ?? '1.0')
    .addTag(appTags);

  const configBuild = config.build();

  const document = SwaggerModule.createDocument(app, configBuild);
  SwaggerModule.setup('docs', app, document);
};
