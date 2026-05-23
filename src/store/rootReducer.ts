import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@/slices/authSlice'
import { uiReducer } from '@/slices/uiSlice'
import { usersReducer } from '@/slices/usersSlice'
import { employeesReducer } from '@/slices/employeesSlice'
import { departmentsReducer } from '@/slices/departmentsSlice'
import { positionsReducer } from '@/slices/positionsSlice'
import { attendanceReducer } from '@/slices/attendanceSlice'
import { leaveReducer } from '@/slices/leaveSlice'
import { payrollReducer } from '@/slices/payrollSlice'
import { compensationReducer } from '@/slices/compensationSlice'
import { timeTrackingReducer } from '@/slices/timeTrackingSlice'
import { recruitmentReducer } from '@/slices/recruitmentSlice'
import { interviewsReducer } from '@/slices/interviewsSlice'
import { performanceReducer } from '@/slices/performanceSlice'
import { organizationReducer } from '@/slices/organizationSlice'
import { documentsReducer } from '@/slices/documentsSlice'
import { notificationsReducer } from '@/slices/notificationsSlice'
import { rolesReducer } from '@/slices/rolesSlice'
import { auditReducer } from '@/slices/auditSlice'
import { reportsReducer } from '@/slices/reportsSlice'
import { analyticsReducer } from '@/slices/analyticsSlice'
import { settingsReducer } from '@/slices/settingsSlice'
import { tenantsReducer } from '@/slices/tenantsSlice'
import { billingReducer } from '@/slices/billingSlice'
import { systemReducer } from '@/slices/systemSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  users: usersReducer,
  employees: employeesReducer,
  departments: departmentsReducer,
  positions: positionsReducer,
  attendance: attendanceReducer,
  leave: leaveReducer,
  payroll: payrollReducer,
  compensation: compensationReducer,
  timeTracking: timeTrackingReducer,
  recruitment: recruitmentReducer,
  interviews: interviewsReducer,
  performance: performanceReducer,
  organization: organizationReducer,
  documents: documentsReducer,
  notifications: notificationsReducer,
  roles: rolesReducer,
  audit: auditReducer,
  reports: reportsReducer,
  analytics: analyticsReducer,
  settings: settingsReducer,
  tenants: tenantsReducer,
  billing: billingReducer,
  system: systemReducer,
})
