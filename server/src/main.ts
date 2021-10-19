import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5050;
    const config = new DocumentBuilder()
      .setTitle('Music platform')
      .setDescription('Documentation for Music platform API')
      .setVersion('1.0.0')
      .addTag('DurnitsinSimon')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/api/docs', app, document);

    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
