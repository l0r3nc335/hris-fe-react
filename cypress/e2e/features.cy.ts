interface FeatureRoute {
  path: string
  title: string
  kind: 'crud' | 'readonly' | 'dashboard'
}

const FEATURE_ROUTES: FeatureRoute[] = [
  { path: '/', title: 'Dashboard', kind: 'dashboard' },
  { path: '/users', title: 'Users', kind: 'crud' },
  { path: '/employees', title: 'Employees', kind: 'crud' },
  { path: '/departments', title: 'Departments', kind: 'crud' },
  { path: '/positions', title: 'Positions', kind: 'crud' },
  { path: '/attendance', title: 'Attendance', kind: 'crud' },
  { path: '/leave', title: 'Leave', kind: 'crud' },
  { path: '/payroll', title: 'Payroll', kind: 'crud' },
  { path: '/compensation', title: 'Compensation', kind: 'crud' },
  { path: '/time-tracking', title: 'Time Tracking', kind: 'crud' },
  { path: '/recruitment', title: 'Recruitment', kind: 'crud' },
  { path: '/interviews', title: 'Interviews', kind: 'crud' },
  { path: '/performance', title: 'Performance', kind: 'crud' },
  { path: '/org-chart', title: 'Organization', kind: 'readonly' },
  { path: '/documents', title: 'Documents', kind: 'crud' },
  { path: '/notifications', title: 'Notifications', kind: 'crud' },
  { path: '/roles', title: 'Roles', kind: 'crud' },
  { path: '/permissions', title: 'Permissions', kind: 'readonly' },
  { path: '/onboarding', title: 'Onboarding', kind: 'crud' },
  { path: '/benefits', title: 'Benefits', kind: 'crud' },
  { path: '/training', title: 'Training', kind: 'crud' },
  { path: '/audit-logs', title: 'Audit Logs', kind: 'readonly' },
  { path: '/reports', title: 'Reports', kind: 'readonly' },
  { path: '/analytics', title: 'Analytics', kind: 'dashboard' },
  { path: '/settings', title: 'Settings', kind: 'crud' },
  { path: '/tenants', title: 'Tenants', kind: 'crud' },
  { path: '/billing', title: 'Billing', kind: 'crud' },
  { path: '/admin/health', title: 'System', kind: 'readonly' },
]

describe('Feature routes', () => {
  beforeEach(() => {
    cy.loginByApi()
  })

  FEATURE_ROUTES.forEach(({ path, title, kind }) => {
    it(`loads ${title} at ${path}`, () => {
      cy.visit(path)
      cy.contains('h1', title).should('be.visible')

      if (kind === 'crud') {
        cy.contains('button', 'Add').should('be.visible')
      }
    })
  })
})
