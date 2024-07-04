import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useKeycloak } from '@react-keycloak/web';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Paths } from '../../utils/routeConstants';

// Mock the useKeycloak hook
vi.mock('@react-keycloak/web', () => ({
    useKeycloak: vi.fn(),
}));

describe('PrivateRoute', () => {
    it('should display loading when Keycloak is not initialized', () => {
        useKeycloak.mockReturnValue({
            keycloak: {},
            initialized: false,
        });

        render(
            <MemoryRouter>
                <PrivateRoute roles={['admin']}>
                    <div>Protected Content</div>
                </PrivateRoute>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should call keycloak.login when not authenticated', () => {
        const loginMock = vi.fn();
        useKeycloak.mockReturnValue({
            keycloak: { authenticated: false, login: loginMock },
            initialized: true,
        });

        render(
            <MemoryRouter>
                <PrivateRoute roles={['admin']}>
                    <div>Protected Content</div>
                </PrivateRoute>
            </MemoryRouter>
        );

        expect(loginMock).toHaveBeenCalled();
    });

    it('should navigate to unauthorized if user does not have required role', () => {
        useKeycloak.mockReturnValue({
            keycloak: { authenticated: true, hasRealmRole: vi.fn().mockReturnValue(false) },
            initialized: true,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute roles={['admin']}>
                                <div>Protected Content</div>
                            </PrivateRoute>
                        }
                    />
                    <Route path={Paths.UNAUTHORIZED} element={<div>Unauthorized</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });

    it('should render children if user is authenticated and has required role', () => {
        useKeycloak.mockReturnValue({
            keycloak: { authenticated: true, hasRealmRole: vi.fn().mockReturnValue(true) },
            initialized: true,
        });

        render(
            <MemoryRouter>
                <PrivateRoute roles={['admin']}>
                    <div>Protected Content</div>
                </PrivateRoute>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
