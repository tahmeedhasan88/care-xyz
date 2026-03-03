import { NextResponse } from 'next/server'
 
const privateRoute = ["/serviceDetails",]
export async function proxy(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/serviceDetails/:path*',],
}