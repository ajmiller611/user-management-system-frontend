import { http, HttpResponse } from 'msw';

export const mockUser = {
  userId: 1,
  username: 'user1',
  email: 'user1@example.com',
};

export const handlers = [
  http.post('*/users', async () => {
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
