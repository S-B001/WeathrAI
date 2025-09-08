// components/ForecastCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import moment from "moment";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function ForecastCarousel({ forecastdaily }) {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Next Days
      </h2>

      <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1.5 },    // mobile -> 1.5 card
            640: { slidesPerView: 2.5 },  // tablet -> 2.5 cards
            768: { slidesPerView: 3.5 },  // medium -> 3.5 cards
            1024: { slidesPerView: 1.5 },   
          }}
          className="overflow-visible"
        >
        {forecastdaily.map((day, i) => (
          <SwiperSlide key={i} className="!h-auto">
            <div className="w-full h-full backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-4 text-center shadow-lg hover:bg-white/20 transition">
              <div className="flex justify-center gap-3 items-center mb-2">
                <p className="font-semibold text-sm sm:text-lg">
                  {moment(day.dt_txt).format("ddd")}:
                </p>
                <p className="text-lg sm:text-lg font-bold">
                  {Math.round(day.main.temp)}°C
                </p>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt=""
                className="mx-auto w-8 sm:w-12"
              />
              <p className="text-sm sm:text-base capitalize mt-1">
                {day.weather[0].description}
              </p>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation arrows */}
    <div
  className="swiper-button-prev group"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "9999px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  }}
>
  <ChevronLeft size={20} />
</div>

<div
  className="swiper-button-next group"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "9999px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  }}
>
  <ChevronRight size={20} />
</div>

      </Swiper>
       <style jsx>{`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
