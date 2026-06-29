import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';

describe('NotFoundPage', () => {

  it('renders 404 text', () => {
    render(<BrowserRouter><NotFoundPage /></BrowserRouter>);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found message', () => {
    render(<BrowserRouter><NotFoundPage /></BrowserRouter>);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders a link back to home', () => {
    render(<BrowserRouter><NotFoundPage /></BrowserRouter>);
    const link = screen.getByText('Go Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

});