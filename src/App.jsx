import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [loading, setLoading] = useState(false); 

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home setLoading={setLoading} />,
    },
    {
      path: '/books',
      element: <AllBooks setLoading={setLoading} />,
    },
    {
      path: '/books/details/:id',
      element: <BookDetails setLoading={setLoading} />,
    },
    {
      path: '/login',
      element: <Login setLoading={setLoading} />,
    },
    {
      path: '/signup',
      element: <Register setLoading={setLoading} />,
    },
  ]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black transition-all duration-500">
          <div className="flex flex-row gap-2 animate-slide-up">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      )}

      <RouterProvider router={router} />
    </>
  );
}
