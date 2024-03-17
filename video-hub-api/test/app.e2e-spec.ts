import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { YoutubeService } from '@modules/videos/services';
import { UsersRepository } from '@modules/users/repositories';
import { VideosMongoRepository } from '@modules/videos/repositories';
import { youtubeMockService } from '@modules/videos/services/youtube-mock.service';
import { VideosGateway } from '@modules/videos/gateways';
import { usersMockRepository } from '@modules/users/repositories/users-mock.repository';
import { videosMockGateway } from '@modules/videos/gateways/videos-mock.gateway';
import { videosMockRepository } from '@modules/videos/repositories/videos-mock.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(usersMockRepository)
      .overrideProvider(VideosMongoRepository)
      .useValue(videosMockRepository)
      .overrideProvider(YoutubeService)
      .useValue(youtubeMockService)
      .overrideProvider(VideosGateway)
      .useValue(videosMockGateway)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/login 201 (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'user-1',
        password: 'psbt@123456',
      })
      .expect(201);
  });

  it('/login 401 (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'user-1',
        password: 'psbt@12345678',
      })
      .expect(401);
  });

  it('/login 404 (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'user-3',
        password: 'psbt@123456',
      })
      .expect(404);
  });

  it('/register 201 (POST)', async () => {
    const req = request(app.getHttpServer()).post('/register').send({
      username: 'user-3',
      password: 'psbt@123456',
    });

    return req.expect(201);
  });

  it('/videos 200 (GET)', () => {
    return request(app.getHttpServer())
      .get('/videos?page=1&limit=2')
      .expect(200)
      .expect({
        data: [
          {
            id: '1',
            title: 'Video 1',
            description: 'Description 1',
            youtubeId: 'youtubeId-1',
            url: 'https://www.youtube.com/watch?v=youtubeId-1',
            shareCount: 1,
            createdBy: 'user-1',
            statistics: {
              viewCount: 100,
              likeCount: 10,
              favoriteCount: 5,
              commentCount: 3,
            },
          },
          {
            id: '2',
            title: 'Video 2',
            description: 'Description 2',
            youtubeId: 'youtubeId-2',
            url: 'https://www.youtube.com/watch?v=youtubeId-2',
            shareCount: 10,
            createdBy: 'user-2',
            statistics: {
              viewCount: 200,
              likeCount: 20,
              favoriteCount: 10,
              commentCount: 6,
            },
          },
        ],
        total: 6,
        page: 1,
        limit: 2,
      });
  });

  it('/videos 201 (POST)', async () => {
    const loginRes = await request(app.getHttpServer()).post('/login').send({
      username: 'user-1',
      password: 'psbt@123456',
    });

    const token = loginRes.body.access_token;

    console.log('token', token);

    const req = request(app.getHttpServer()).post('/videos').set('Authorization', `Bearer ${token}`).send({
      url: 'https://www.youtube.com/watch?v=youtubeId-9',
    });

    return req.expect(201).expect({
      title: 'Video 9',
      description: 'Description 9',
      youtubeId: 'youtubeId-9',
      url: 'https://www.youtube.com/watch?v=youtubeId-9',
      shareCount: 1,
      statistics: {
        viewCount: 900,
        likeCount: 90,
        favoriteCount: 45,
        commentCount: 27,
      },
    });
  });

  it('/videos 401 (POST)', async () => {
    const req = request(app.getHttpServer()).post('/videos').send({
      url: 'https://www.youtube.com/watch?v=youtubeId-9',
    });

    return req.expect(401);
  });
});
