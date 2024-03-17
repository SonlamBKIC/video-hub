const usersMockData = [
  {
    id: 1,
    username: 'user-1',
    password: '$2b$10$oYWHjdpxVG03rNCynFSKVe96pSy.ckR58Om6dhKYM5InR6ZGOcKfy',
  },
  {
    id: 2,
    username: 'user-2',
    password: 'pass-2',
  },
];

export const usersMockRepository = {
  create: jest.fn((user) => user),
  findOneByUsername: jest.fn((username) => {
    return usersMockData.find((user) => user.username === username);
  }),
};
