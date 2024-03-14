import { environment } from '../../../environments/environment.development';

export const API_ENDPOINTS = {
    LOGIN_URL: `${environment.baseUrl}/login`,
    
    EMPLOYEE_COUNT_URL: `${environment.baseUrl}/employee/count`,
    DEPARTMENT_COUNT_URL: `${environment.baseUrl}/department/count`,
    USER_COUNT_URL: `${environment.baseUrl}/user/count`,
    EMPLOYEE_BY_STATUS_COUNT_URL: `${environment.baseUrl}/employee/status/count`,
    EMPLOYEE_BY_JOB_COUNT_URL: `${environment.baseUrl}/employee/job-title/count`,
    
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
  };