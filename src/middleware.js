import {NextResponse} from 'next/server';

export default function middleware(request) {
  const {pathname} = request.nextUrl;

  // Redirect root to /home
  if (pathname === '/') {
    const url = new URL('/home', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)',
  ],
};
