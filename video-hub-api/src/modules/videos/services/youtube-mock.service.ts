export const youtubeMockData = [
  {
    id: 'youtubeId-1',
    snippet: {
      title: 'Video 1',
      description: 'Description 1',
    },
    statistics: {
      viewCount: '100',
      likeCount: '10',
      favoriteCount: '5',
      commentCount: '3',
    },
  },
  {
    id: 'youtubeId-2',
    snippet: {
      title: 'Video 2',
      description: 'Description 2',
    },
    statistics: {
      viewCount: '200',
      likeCount: '20',
      favoriteCount: '10',
      commentCount: '6',
    },
  },
  {
    id: 'youtubeId-3',
    snippet: {
      title: 'Video 3',
      description: 'Description 3',
    },
    statistics: {
      viewCount: '300',
      likeCount: '30',
      favoriteCount: '15',
      commentCount: '9',
    },
  },
  {
    id: 'youtubeId-4',
    snippet: {
      title: 'Video 4',
      description: 'Description 4',
    },
    statistics: {
      viewCount: '400',
      likeCount: '40',
      favoriteCount: '20',
      commentCount: '12',
    },
  },
  {
    id: 'youtubeId-5',
    snippet: {
      title: 'Video 5',
      description: 'Description 5',
    },
    statistics: {
      viewCount: '500',
      likeCount: '50',
      favoriteCount: '25',
      commentCount: '15',
    },
  },
  {
    id: 'youtubeId-6',
    snippet: {
      title: 'Video 6',
      description: 'Description 6',
    },
    statistics: {
      viewCount: '600',
      likeCount: '60',
      favoriteCount: '30',
      commentCount: '18',
    },
  },
  {
    id: 'youtubeId-7',
    snippet: {
      title: 'Video 7',
      description: 'Description 7',
    },
    statistics: {
      viewCount: '700',
      likeCount: '70',
      favoriteCount: '35',
      commentCount: '21',
    },
  },
  {
    id: 'youtubeId-8',
    snippet: {
      title: 'Video 8',
      description: 'Description 8',
    },
    statistics: {
      viewCount: '800',
      likeCount: '80',
      favoriteCount: '40',
      commentCount: '24',
    },
  },
  {
    id: 'youtubeId-9',
    snippet: {
      title: 'Video 9',
      description: 'Description 9',
    },
    statistics: {
      viewCount: '900',
      likeCount: '90',
      favoriteCount: '45',
      commentCount: '27',
    },
  },
];

export const youtubeMockService = {
  getVideoInfoById: jest.fn((id) => {
    return youtubeMockData.find((video) => video.id === id);
  }),
};
