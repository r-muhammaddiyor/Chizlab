import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/books',
    element: <AllBooks />,
  },
  {
    path: '/books/details/:id',
    element: <BookDetails />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
