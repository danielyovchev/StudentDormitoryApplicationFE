// AdminDashboard.test.jsx
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminDashboard from './AdminDashboard';
import { Paths } from '../../utils/routeConstants';

describe('AdminDashboard', () => {
    it('renders Admin Dashboard heading', () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );
        const headingElement = screen.getByText(/Admin Dashboard/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('renders links with correct text', () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );
        const reviewApplicationsLink = screen.getByText(/Review Applications/i);
        const modifyClassificationRulesLink = screen.getByText(/Modify Classification Rules/i);
        const modifyAttributesLink = screen.getByText(/Modify Attributes/i);
        const studentRankingLink = screen.getByText(/Student ranking/i);

        expect(reviewApplicationsLink).toBeInTheDocument();
        expect(modifyClassificationRulesLink).toBeInTheDocument();
        expect(modifyAttributesLink).toBeInTheDocument();
        expect(studentRankingLink).toBeInTheDocument();
    });

    it('links have correct href attributes', () => {
        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );
        const reviewApplicationsLink = screen.getByText(/Review Applications/i);
        const modifyClassificationRulesLink = screen.getByText(/Modify Classification Rules/i);
        const modifyAttributesLink = screen.getByText(/Modify Attributes/i);
        const studentRankingLink = screen.getByText(/Student ranking/i);

        expect(reviewApplicationsLink.closest('a')).toHaveAttribute('href', Paths.APPLICATIONS);
        expect(modifyClassificationRulesLink.closest('a')).toHaveAttribute('href', Paths.RULES);
        expect(modifyAttributesLink.closest('a')).toHaveAttribute('href', Paths.ATTRIBUTES);
        expect(studentRankingLink.closest('a')).toHaveAttribute('href', Paths.RANKING);
    });
});
