import { environment } from '../../../environments/environment.development';

export const API_ENDPOINTS = {
    LOGIN_URL: `${environment.baseUrl}/login`,
    
    EMPLOYEE_COUNT_URL: `${environment.baseUrl}/employee/count`,
    DEPARTMENT_COUNT_URL: `${environment.baseUrl}/department/count`,
    USER_COUNT_URL: `${environment.baseUrl}/user/count`,
    EMPLOYEE_BY_STATUS_COUNT_URL: `${environment.baseUrl}/employee/status/count`,
    EMPLOYEE_BY_JOB_COUNT_URL: `${environment.baseUrl}/employee/job-title/count`,
    EMPLOYEE_EXCEL_URL: `${environment.baseUrl}/employee/excel/`,
    
    GET_ALL_EMPLOYEE_URL: `${environment.baseUrl}/employee/status/`,
    ADD_EMPLOYEE_URL: `${environment.baseUrl}/employee`,
    GET_EMPLOYEE_BY_ID_URL: `${environment.baseUrl}/employee/`,
    DELETE_EMPLOYEE_BY_ID_URL: `${environment.baseUrl}/employee/`,
    UPDATE_EMPLOYEE_BY_ID_URL: `${environment.baseUrl}/employee/`,
    UPDATE_EMPLOYEE_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/employee/`,

    GET_ALL_DEPARTMENT_URL: `${environment.baseUrl}/department/status/`,
    ADD_DEPARTMENT_URL: `${environment.baseUrl}/department`,
    GET_DEPARTMENT_BY_ID_URL: `${environment.baseUrl}/department/`,
    DELETE_DEPARTMENT_BY_ID_URL: `${environment.baseUrl}/department/`,
    UPDATE_DEPARTMENT_BY_ID_URL: `${environment.baseUrl}/department/`,
    UPDATE_DEPARTMENT_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/department/`,

    GET_ALL_JOB_TITLE_URL: `${environment.baseUrl}/job-title/status/`,
    ADD_JOB_TITLE_URL: `${environment.baseUrl}/job-title`,
    GET_JOB_TITLE_BY_ID_URL: `${environment.baseUrl}/job-title/`,
    DELETE_JOB_TITLE_BY_ID_URL: `${environment.baseUrl}/job-title/`,
    UPDATE_JOB_TITLE_BY_ID_URL: `${environment.baseUrl}/job-title/`,
    UPDATE_JOB_TITLE_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/job-title/`,

    GET_ALL_USER_URL: `${environment.baseUrl}/user/status/`,
    ADD_USER_URL: `${environment.baseUrl}/signup`,
    GET_USER_BY_ID_URL: `${environment.baseUrl}/user/`,
    GET_CURRENT_USER_URL: `${environment.baseUrl}/current-user`,
    DELETE_USER_BY_ID_URL: `${environment.baseUrl}/user/`,
    UPDATE_USER_BY_ID_URL: `${environment.baseUrl}/user/`,
    UPDATE_USER_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/user/`,

    GET_ALL_ROLE_URL: `${environment.baseUrl}/role`,
    ADD_ROLE_URL: `${environment.baseUrl}/role`,
    GET_ROLE_BY_ID_URL: `${environment.baseUrl}/role/`,
    UPDATE_ROLE_BY_ID_URL: `${environment.baseUrl}/role/`,

    GET_ALL_PERMISSION_URL: `${environment.baseUrl}/permission`,
    GET_PERMISSION_BY_ID_URL: `${environment.baseUrl}/permission/`,

    GET_ALL_ATTENDANCE_URL: `${environment.baseUrl}/attendance/status/`,
    ADD_ATTENDANCE_URL: `${environment.baseUrl}/attendance`,
    GET_ATTENDANCE_BY_ID_URL: `${environment.baseUrl}/attendance/`,
    DELETE_ATTENDANCE_BY_ID_URL: `${environment.baseUrl}/attendance/`,
    UPDATE_ATTENDANCE_BY_ID_URL: `${environment.baseUrl}/attendance/`,
    UPDATE_ATTENDANCE_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/attendance/`,

    GET_ALL_SALARY_URL: `${environment.baseUrl}/salary/status/`,
    ADD_SALARY_URL: `${environment.baseUrl}/salary`,
    GET_SALARY_BY_ID_URL: `${environment.baseUrl}/salary/`,
    DELETE_SALARY_BY_ID_URL: `${environment.baseUrl}/salary/`,
    UPDATE_SALARY_BY_ID_URL: `${environment.baseUrl}/salary/`,
    UPDATE_SALARY_STATUS_TO_ACTIVE_URL: `${environment.baseUrl}/salary/`,
  };