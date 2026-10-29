import { describe, expect, it, vi } from 'vitest';

const { send } = vi.hoisted(() => ({ send: vi.fn(async (_email: { html: string }) => ({ data: { id: 'test' }, error: null })) }));
vi.mock('resend', () => ({ Resend: class { emails = { send }; } }));
vi.mock('./supabase.server', () => ({ createClient: () => ({ rpc: async () => ({ data: 1, error: null }) }) }));
import { handler } from './send-contact-email.server';

describe('quote email selection', () => {
  it('includes the selected Original basket, size and headcount in the outgoing email', async () => {
    const response = await handler(new Request('https://vitaminkorgen.se', {
      method: 'POST', body: JSON.stringify({ formType: 'Offertförfrågan', name: 'Test', email: 'test@example.com', basketType: 'Original', basketSize: '6kg', employeeCount: 12 }),
    }));
    expect(response.status).toBe(200);
    const outgoing = send.mock.calls[0]?.[0] as unknown as { html: string } | undefined;
    expect(outgoing?.html).toContain('Original');
    expect(outgoing?.html).toContain('6kg');
    expect(outgoing?.html).toContain('>12</span>');
  });
});