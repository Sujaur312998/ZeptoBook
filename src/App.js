import { useRoutes } from 'react-router-dom';
import NavBar from './Component/NavBar'
import Home from './Component/Home'
import { Provider } from 'react-redux';
import { store } from './store';

function App() {

  const routes = [
    { path: '/', element: <Home /> },

  ];

  const element = useRoutes(routes);

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
