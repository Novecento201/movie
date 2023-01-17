import { useEffect, useState } from 'react';
import {
  top250Movies,
  top250Series,
  pop100Movies,
  pop100Series,
} from '../../API/clientAPI';
import Slider from '../../components/Slider/Slider';

const HomePage = ({ setIsLoading }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [popMovies, setPopMovies] = useState([]);
  const [popSeries, setPopSeries] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(top250Movies)
      .then((res) => res.json())
      .then((data) => setTopMovies(data.items))
      .catch((err) => console.log(err));

    fetch(top250Series)
      .then((res) => res.json())
      .then((data) => setTopSeries(data.items))
      .catch((err) => console.log(err));

    fetch(pop100Movies)
      .then((res) => res.json())
      .then((data) => setPopMovies(data.items))
      .catch((err) => console.log(err));

    fetch(pop100Series)
      .then((res) => res.json())
      .then((data) => setPopSeries(data.items))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(popMovies);

  return (
    <main className="container">
      <Slider data={topMovies} name={'TOP Movies'} />
      <Slider data={popMovies} name={'Popular Movies'} />
      <Slider data={topSeries} name={'TOP Series'} />
      <Slider data={popSeries} name={'Popular Series'} />
    </main>
  );
};

export default HomePage;
