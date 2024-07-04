import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { describe, test, vi, beforeEach, expect } from 'vitest';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth');
const mockUseAuth = useAuth;

let mockLanguage = 'en';
const changeLanguageMock = vi.fn((lang) => {
    mockLanguage = lang;
});

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(() => ({
    t: (key) => key,
    i18n: {
      changeLanguage: changeLanguageMock,
      get language() {
        return mockLanguage;
      },
    },
  })),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      isAdmin: false,
      isStudent: false,
    });
  });

  test('renders Header component', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('The process')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('shows student links when user is a student', () => {
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      isAdmin: false,
      isStudent: true,
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('shows admin links when user is an admin', () => {
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      isAdmin: true,
      isStudent: false,
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('handles logout', () => {
    const logoutMock = vi.fn();
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: true,
      login: vi.fn(),
      logout: logoutMock,
      register: vi.fn(),
      isAdmin: false,
      isStudent: false,
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const logoutLink = screen.getByText('Logout');
    fireEvent.click(logoutLink);

    expect(logoutMock).toHaveBeenCalled();
  });

  test('handles login', () => {
    const loginMock = vi.fn();
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: false,
      login: loginMock,
      logout: vi.fn(),
      register: vi.fn(),
      isAdmin: false,
      isStudent: false,
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(loginMock).toHaveBeenCalled();
  });

  test('handles register', () => {
    const registerMock = vi.fn();
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: registerMock,
      isAdmin: false,
      isStudent: false,
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);

    expect(registerMock).toHaveBeenCalled();
  });

  test('toggles language', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const flagButton = screen.getByRole('button', { name: /English|Bulgarian/i });
    fireEvent.click(flagButton);

    const expectedLang = mockLanguage === 'en' ? 'en' : 'bg';
    expect(changeLanguageMock).toHaveBeenCalledWith(expectedLang);
  });
});
