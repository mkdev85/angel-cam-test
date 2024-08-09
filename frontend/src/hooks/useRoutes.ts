import { useRouter } from 'next/router';

import { routes } from './routes';

export interface GotoRouteOptions {
  params?: Record<string, string | number>;
  query?: Record<string, any>;
}

/**
 * Custom hook for handling navigation within the application using predefined routes.
 * It provides methods to navigate to specific routes and open certain URLs in new tabs.
 *
 * @returns An object containing methods for navigating to different routes.
 */
export const useRoutes = () => {
  const router = useRouter();

  // Function to navigate to a specific route using Next.js router
  const gotoRoute = async (pathName: string, options?: GotoRouteOptions) => {
    const { params = {}, query = {} } = options ?? {};

    let finalPath = pathName;

    // Replace route parameters in the pathName with actual values
    for (const param in params) {
      finalPath = finalPath.replace(`:${param}`, encodeURIComponent(params[param]));
    }

    // Build the query string
    const queryString = Object.keys(query)
      .filter(key => query[key])
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');

    // Add the query string to the final path
    finalPath = queryString ? `${finalPath}?${queryString}` : finalPath;

    // Use the Next.js router to navigate to the dynamically generated route
    await router.push(finalPath);
  };

  return {
    ...routes, // Include the predefined routes for easy access
    gotoLoginPage: async () => gotoRoute(routes.loginPage),
    gotoSharedCameraPage: async () => gotoRoute(routes.sharedCameraPage),
  };
};

export type AvailableRoutes = ReturnType<typeof useRoutes>;
