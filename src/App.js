import { useRoutes } from 'react-router-dom';
import NavBar from './Component/NavBar'
import Home from './Component/Home'
import { Provider } from 'react-redux';
import { store } from './store';
import WishList from './Component/WishList'
import NotFoundPage from './Template/NotFoundPage';
import BookDetails from './Component/BookDetails';
import SearchBook from './Component/SearchBook';

function App() {

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/wishlist', element: <WishList /> },
    { path: '/searchbook/:name', element: <SearchBook /> },
    { path: '/book-details/:id', element: <BookDetails /> },
    { path: '*', element: <NotFoundPage /> },

  ];

  const element = useRoutes(routes);

  window.store=store

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Provider store={store}>
        <NavBar />
        <main className="flex-grow">
          {element}
        </main>
      </Provider>

    </div>
  );
}

export default App;
