import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import ResellerLogo from './ResellerLogo';

afterEach(cleanup);

describe('ResellerLogo', () => {
  it('shows the partner image on a contrasting surface', () => {
    render(<ResellerLogo src="/logo.png" name="House of Service" />);
    const image = screen.getByRole('img', { name: 'House of Service' });
    expect(image).toHaveAttribute('src', '/logo.png');
    expect(image.parentElement).toHaveClass('bg-foreground');
  });

  it('shows the partner name if the image fails and retries a changed source', () => {
    const view = render(<ResellerLogo src="/broken.png" name="House of Service" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('House of Service')).toBeInTheDocument();
    view.rerender(<ResellerLogo src="/new.png" name="House of Service" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/new.png');
  });
});