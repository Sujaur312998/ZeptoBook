import { useRoutes } from 'react-router-dom';
import NavBar from './Component/NavBar';
import Home from './Component/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import WishList from './Component/WishList';
import NotFoundPage from './Template/NotFoundPage';
import BookDetails from './Component/BookDetails';
import SearchBook from './Component/SearchBook';

function App() {
  // Define your routes here
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/wishlist', element: <WishList /> },
    { path: '/searchbook/:name', element: <SearchBook /> },
    { path: '/book-details/:id', element: <BookDetails /> },
    { path: '*', element: <NotFoundPage /> },
  ];

  // Use the useRoutes hook to handle route elements
  const element = useRoutes(routes);


  return (
    <div className="w-full flex flex-col min-h-screen">
      <Provider store={store}>
        <NavBar />
        <main className="flex-grow">
          {element}  {/* Render the matched route element here */}
        </main>
      </Provider>
    </div>
  );
}

export default App;
