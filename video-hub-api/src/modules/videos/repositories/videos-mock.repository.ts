const videosMockData = [
  {
    id: '1',
    youtubeId: 'youtubeId-1',
    title: 'Video 1',
    description: 'Description 1',
    url: 'https://www.youtube.com/watch?v=youtubeId-1',
    createdBy: 'user-1',
    shareCount: 1,
    statistics: {
      viewCount: 100,
      likeCount: 10,
      favoriteCount: 5,
      commentCount: 3,
    },
  },
  {
    id: '2',
    youtubeId: 'youtubeId-2',
    title: 'Video 2',
    description: 'Description 2',
    url: 'https://www.youtube.com/watch?v=youtubeId-2',
    createdBy: 'user-2',
    shareCount: 10,
    statistics: {
      viewCount: 200,
      likeCount: 20,
      favoriteCount: 10,
      commentCount: 6,
    },
  },
  {
    id: '3',
    youtubeId: 'youtubeId-3',
    title: 'Video 3',
    description: 'Description 3',
    url: 'https://www.youtube.com/watch?v=youtubeId-3',
    createdBy: 'user-3',
    shareCount: 2,
    statistics: {
      viewCount: 300,
      likeCount: 30,
      favoriteCount: 15,
      commentCount: 9,
    },
  },
  {
    id: '4',
    youtubeId: 'youtubeId-4',
    title: 'Video 4',
    description: 'Description 4',
    url: 'https://www.youtube.com/watch?v=youtubeId-4',
    createdBy: 'user-4',
    shareCount: 13,
    statistics: {
      viewCount: 400,
      likeCount: 40,
      favoriteCount: 20,
      commentCount: 12,
    },
  },
  {
    id: '5',
    youtubeId: 'youtubeId-5',
    title: 'Video 5',
    description: 'Description 5',
    url: 'https://www.youtube.com/watch?v=youtubeId-5',
    shareCount: 20,
    createdBy: 'user-5',
    statistics: {
      viewCount: 500,
      likeCount: 50,
      favoriteCount: 25,
      commentCount: 15,
    },
  },
  {
    id: '6',
    youtubeId: 'youtubeId-6',
    title: 'Video 6',
    description: 'Description 6',
    url: 'https://www.youtube.com/watch?v=youtubeId-6',
    shareCount: 30,
    createdBy: 'user-6',
    statistics: {
      viewCount: 600,
      likeCount: 60,
      favoriteCount: 30,
      commentCount: 18,
    },
  },
];

export const videosMockRepository = {
  create: jest.fn((video) => video),
  findOneById: jest.fn((id) => {
    return videosMockData.find((video) => video.id === id);
  }),
  findAll: jest.fn(() => {
    return videosMockData;
  }),
  findOneByYoutubeId: jest.fn((youtubeId) => {
    return videosMockData.find((video) => video.youtubeId === youtubeId);
  }),
  findPagination: jest.fn((page, limit) => {
    return videosMockData.slice((page - 1) * limit, page * limit);
  }),
  update: jest.fn((video) => {
    const index = videosMockData.findIndex((v) => v.youtubeId === video.youtubeId);
    videosMockData[index] = {
      ...videosMockData[index],
      ...video,
    };
    return videosMockData[index];
  }),
  count: jest.fn(() => videosMockData.length),
};
