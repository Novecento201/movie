import './slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';

import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

import ItemCard from '../ItemCard/ItemCard';
import { useState } from 'react';

const Slider = ({ data, name }) => {
  const [speed, setSpeed] = useState(3000);

  return (
    <section className="slider">
      <div className="slider_top">
        <h2 className="slider_title">{name}</h2>
        <div className="slider_speed_container">
          <label htmlFor="speed">Carousel speed</label>

          <div className="slider_speed">
            <AiOutlinePlus
              className="slider_icon"
              onClick={() => setSpeed((prevSpeed) => (prevSpeed += 150))}
            />
            <input
              name="speed"
              type="range"
              min="100"
              max="10000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="input-range"
            />
            <AiOutlineMinus
              className="slider_icon"
              onClick={() => setSpeed((prevSpeed) => (prevSpeed -= 150))}
            />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        autoplay={{
          delay: speed,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          type: 'progressbar',
        }}
        grabCursor={true}
        spaceBetween={15}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.length !== 0 &&
          data.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ItemCard item={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

export default Slider;
