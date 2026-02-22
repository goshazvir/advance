import {NextRequest} from 'next/server';
import flexxNextApiService from '@/app/api/FlexxNextApiService/FlexxNextApiService';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return flexxNextApiService().post({url: 'move-money', req, body});
}
