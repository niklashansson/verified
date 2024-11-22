import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export function createInsightsMainSwipers() {
  const instances = document.querySelectorAll(
    '[data-swiper-instance="insights-main"]'
  ) as unknown as HTMLElement[];
  if (!instances) return;

  instances.forEach((instance) => createInsightsMainSwiper(instance));
  return;
}

/**
 * Sets up swiper instances for testimonials.
 * @description Attribute: [data-swiper-instance="insights-main"]
 */
export const createInsightsMainSwiper = (instanceElement: HTMLElement) => {
  const swiperElement = instanceElement.querySelector('.swiper') as unknown as HTMLElement;
  if (!swiperElement) return;

  const nextEl = instanceElement.querySelector('.swiper-btn-next') as unknown as HTMLElement;
  const prevEl = instanceElement.querySelector('.swiper-btn-prev') as unknown as HTMLElement;

  return new Swiper(swiperElement, {
    modules: [Navigation],
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 500,
    slideVisibleClass: 'swiper-slide-visible',
    slideFullyVisibleClass: 'swiper-slide-fully-visible',
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
        slidesPerView: 2.25,
        spaceBetween: 24,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
};
