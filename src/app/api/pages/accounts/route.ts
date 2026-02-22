import {NextRequest} from 'next/server';
import flexxNextApiService from '@/app/api/FlexxNextApiService/FlexxNextApiService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams.toString();
  return flexxNextApiService().get({url: `account?${queryParams}`, req});
}
