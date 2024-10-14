import { useRoutes } from 'react-router-dom';
import NavBar from './Component/NavBar'
import Home from './Component/Home'

function App() {

  const routes = [
    { path: '/', element: <Home /> },

  ];

  const element = useRoutes(routes);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        {element}
      </main>
    </div>
  );
}

export default App;
