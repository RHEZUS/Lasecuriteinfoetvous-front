import apiClient from "@/plugins/axios";
// The role middleware checks if the user's role is in the allowedRoles list
export default function role(allowedRoles = []) {
    return async function ({ next, store }) {
      try {
        // Fetch the current user's details
        const response = await apiClient.get(`/api/user`);
        const user = response.data;
  
        // Check if the user's role is in the allowedRoles list
        if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
          return next();
        } else {
          console.warn(`Access denied. User role '${user.role}' is not in the allowed roles: ${allowedRoles.join(', ')}`);
          return next({ name: "Forbidden" }); // Change to a suitable route or name for access denied
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        return next({ name: "Login" }); // Redirect to login on error
      }
    }
}
  