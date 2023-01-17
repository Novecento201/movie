import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, SearchPage, DetailPage, FavoritePage } from './pages';
import { Footer, Header, Loading, NotFound } from './components';
import { FavoritesProvider } from './Context/FavoriteContext';
import { InputProvider } from './Context/InputContext';
import { useState } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <BrowserRouter>
        <FavoritesProvider>
          <InputProvider>
            <Header />

            <main className="container-routes">
              {isLoading && <Loading />}

              <Routes>
                <Route
                  path="/"
                  element={<HomePage setIsLoading={setIsLoading} />}
                />
                <Route
                  path="/search"
                  element={<SearchPage setIsLoading={setIsLoading} />}
                />
                <Route
                  path="/detail/:id"
                  element={<DetailPage setIsLoading={setIsLoading} />}
                />
                <Route path="/favorite" element={<FavoritePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </InputProvider>
        </FavoritesProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
