import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { accessToken } = await req.json();
  if (!accessToken) {
    return NextResponse.json(
      {
        error: 'Token missing',
      },
      {
        status: 400,
      }
    );
  }
  const response = NextResponse.json({
    message: 'Logged in successfully!',
  });
  const expiresIn7Days = new Date();
  expiresIn7Days.setDate(expiresIn7Days.getDate() + 7);
  response.cookies.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: expiresIn7Days,
  });
  return response;
}

export async function DELETE() {
  // Clear the access_token cookie
  const response = NextResponse.json({
    message: 'Logged out successfully!',
  });

  // Set the access_token cookie with an expiration in the past to delete it
  response.cookies.set('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });

  return response;
}
