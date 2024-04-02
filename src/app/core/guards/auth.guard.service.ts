import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authguardService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const jwtToken = localStorage.getItem("token");

  if (jwtToken) {
    const decodedToken = getDecodedAccessToken(jwtToken);
    console.log(decodedToken);
    const userPermissions = decodedToken.PERMISSIONS;
    console.log(userPermissions);
    const userRoles = decodedToken.ROLES;
    console.log(userRoles);

    const url = state.url;
    console.log(url);
    let permission: any = {};
    const permissionsObj = getPermissionsObj();
    console.log(permissionsObj)
    const matchingPermission = permissionsObj.find((p: any) =>
      p.url.some((u: any) => urlMatches(u, url))
    );
    console.log(matchingPermission);

    if (matchingPermission) {
      permission = matchingPermission;
    }

   if (
     userPermissions.includes(permission.permissions)
   ) {
     return true;
   } else {
     router.navigate(["/access"]); // Redirect to the unauthorized page
     return false;
   }
  } else {
    router.navigate(["/login"]);
    return false;
  }
}

function getDecodedAccessToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    console.error('Error decoding JWT token:' + Error);
  }
}

function getPermissionsObj(): any {
  const homeObj = {
    url: ["/home"],
    permissions: "HOME",
  };
  const employeeObj = {
    url: ["/employee/list", "/employee", "/employee/view"],
    permissions: "EMPLOYEES",
  };  
  const userObj = {
    url: ["/user/list", "/user", "/user/view"],
    permissions: "USERS",
  };
  const jobTitleObj = {
    url: ["/job-title/list", "/job-title"],
    permissions: "JOBTITLES",
  };
  const departmentObj = {
    url: ["/department/list", "/department"],
    permissions: "DEPARTMENTS",
  };
  const attendanceObj = {
    url: ["/attendance/list", "/attendance", "/attendance/view"],
    permissions: "ATTENDANCE",
  };
  const salaryObj = {
    url: ["/salary/list", "/salary", "/salary/view"],
    permissions: "SALARY",
  };
  const perObj = {
    url: ["/permissions"],
    permissions: "PERMISSION",
  };

  return [
    homeObj,
    employeeObj,
    userObj,
    jobTitleObj,
    departmentObj,
    attendanceObj,
    salaryObj,
    perObj
  ];
}

function urlMatches(pattern: string, url: string): boolean {
  const patternSegments = pattern.split("?")[0].split("/"); // Get URL segments without query parameters
  const urlSegments = url.split("?")[0].split("/"); // Get URL segments without query parameters

  if (patternSegments.length !== urlSegments.length) {
    return false; // URLs have different segment counts
  }

  for (let i = 0; i < patternSegments.length; i++) {
    if (
      patternSegments[i] !== urlSegments[i] &&
      !patternSegments[i].startsWith(":")
    ) {
      return false; // Segments don't match and are not parameters
    }
  }

  return true; // All segments match or are parameters
}