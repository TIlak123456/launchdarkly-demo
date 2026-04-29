export const demoUsers = [
  {
    key: 'alice-internal',
    name: 'Alice (Internal)',
    email: 'alice@abccompany.com',
    country: 'US',
    plan: 'enterprise',
    userType: 'internal',
    avatar: '👩‍💼',
    description: 'Internal employee - sees all new features'
  },
  {
    key: 'bob-external',
    name: 'Bob (US Customer)',
    email: 'bob@gmail.com',
    country: 'US',
    plan: 'free',
    userType: 'external',
    avatar: '👨',
    description: 'US free tier customer'
  },
  {
    key: 'charlie-uk',
    name: 'Charlie (UK Customer)',
    email: 'charlie@customer.co.uk',
    country: 'UK',
    plan: 'pro',
    userType: 'external',
    avatar: '🧑',
    description: 'UK pro tier customer'
  },
  {
    key: 'diana-enterprise',
    name: 'Diana (Enterprise)',
    email: 'diana@bigcorp.com',
    country: 'US',
    plan: 'enterprise',
    userType: 'external',
    avatar: '👩‍💻',
    description: 'US enterprise customer'
  },
  {
    key: 'user-ext-001',
    name: 'Emma (US Pro)',
    email: 'emma@test.com',
    country: 'US',
    plan: 'pro',
    userType: 'external',
    avatar: '👱‍♀️',
    description: 'US pro tier customer'
  },
  {
    key: 'user-ext-002',
    name: 'Frank (US Free)',
    email: 'frank@test.com',
    country: 'US',
    plan: 'free',
    userType: 'external',
    avatar: '👴',
    description: 'US free tier customer'
  },
  {
    key: 'user-ext-003',
    name: 'Grace (UK Enterprise)',
    email: 'grace@bigcorp.co.uk',
    country: 'UK',
    plan: 'enterprise',
    userType: 'external',
    avatar: '👩‍🦰',
    description: 'UK enterprise customer'
  }
];

export const getUserContext = (user) => ({
  kind: 'user',
  key: user.key,
  name: user.name,
  email: user.email,
  country: user.country,
  plan: user.plan,
  userType: user.userType,
  custom: {
    country: user.country,
    plan: user.plan,
    userType: user.userType
  }
});
