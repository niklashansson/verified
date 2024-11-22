import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

/**
 * Sets up swiper instances for testimonials.
 * @description Attribute: [data-swiper-instance="testimonials-main"]
 */
export const testimonialsMainSwiper = () => {
  const instances = document.querySelectorAll(
    '[data-swiper-instance="testimonials-main"]'
  ) as unknown as HTMLElement[];
  if (!instances) return;

  instances.forEach((instance) => {
    const swiperElement = instance.querySelector('.swiper') as unknown as HTMLElement;
    if (!swiperElement) return;

    const nextEl = instance.querySelector('.swiper-btn-next') as unknown as HTMLElement;
    const prevEl = instance.querySelector('.swiper-btn-prev') as unknown as HTMLElement;

    new Swiper(swiperElement, {
      modules: [Autoplay, Navigation],
      slidesPerView: 1.25,
      centeredSlides: true,
      spaceBetween: 48,
      speed: 500,
      autoplay: {
        disableOnInteraction: true,
        delay: 5000,
      },
      ...(nextEl &&
        prevEl && {
          navigation: {
            nextEl,
            prevEl,
          },
        }),
      breakpoints: {
        // when window width is >= 479px
        479: {
          slidesPerView: 1.25,
          spaceBetween: 24,
        },
        // when window width is >= 767px
        767: {
          slidesPerView: 1.25,
          spaceBetween: 24,
        },
        // when window width is >= 992px
        992: {
          slidesPerView: 1,
          spaceBetween: 48,
        },
      },
    });
  });
};
