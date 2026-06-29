import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <Link to="/" className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg">
        Go Home
      </Link>
    </div>
  );
};
export default NotFoundPage;