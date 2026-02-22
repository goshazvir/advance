/**
 * Stub for getBackendToken — the mock provider has no auth,
 * so we return a dummy token.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getBackendToken(_req: any): Promise<{token: string}> {
  return {token: 'no-auth'};
}
