import { http, HttpResponse } from 'msw';
import { CreateUserInput, createUserSchema } from '@/schemas/userSchema';

export const mockUser = {
  userId: 1,
  username: 'user1',
  email: 'user1@example.com',
};

export const handlers = [
  http.post('*/users', async ({ request }) => {
    const userData: CreateUserInput = createUserSchema.parse(
      await request.json(),
    );
    if (userData.username === 'existingUser') {
      return HttpResponse.json(
        { message: 'Username already taken' },
        { status: 409 },
      );
    } else if (userData.username === 'invalidUsername') {
      return HttpResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    return HttpResponse.json(
      { message: 'User created successfully!' },
      { status: 201 },
    );
  }),
  http.get('*/users/:userId', () => {
    return HttpResponse.json({ data: mockUser });
  }),
  http.put('*/users/:userId', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ data: body });
  }),
];
