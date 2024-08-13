// import React from 'react';
// import { Route, Navigate, RouteProps } from 'react-router-dom';
// import { useAuthContext } from './AuthContext';

// interface PrivateRouteProps extends RouteProps {
//   element: React.ReactElement;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuthContext();

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? element : <Navigate to="/login" replace />}
//     />
//   );
// };

// export default PrivateRoute;
