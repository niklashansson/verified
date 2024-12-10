import type { CMSList } from 'src/types/CMSList';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
window.fsAttributes = window.fsAttributes || [];

const query = '[data-swiper-cms-instance="insights-main"]';

export function createInsightsSwipers() {
  window.fsAttributes.cmscombine.init();

  window.fsAttributes.push(
    [
      'cmscombine',
      async (listInstances: CMSList[]) => {
        listInstances.forEach((instance) => {
          window.fsAttributes.cmssort.init();

          const swiperInstanceElement = instance.wrapper.closest(query) as unknown as HTMLElement;

          if (!swiperInstanceElement) {
            instance.wrapper.classList.add('.hide');
            return;
          }

          createInsightsSwiper(swiperInstanceElement);
        });
      },
    ],
    [
      'cmssort',
      async () => {
        const sortTrigger = document.querySelector(
          '.fs_cmssort_trigger'
        ) as unknown as HTMLButtonElement;

        const isInsightsSwiper = !!sortTrigger?.closest(query);
        if (!isInsightsSwiper) return;

        sortTrigger?.click();
      },
    ]
  );
}

/**
 * Sets up swiper instances for testimonials.
 * @description Attribute: [data-swiper-instance="insights-main"]
 */
export const createInsightsSwiper = (instanceElement: HTMLElement) => {
  const swiperElement = instanceElement.querySelector('.swiper') as unknown as HTMLElement;
  if (!swiperElement) return;

  const nextEl = instanceElement.querySelector('.swiper-btn-next') as unknown as HTMLElement;
  const prevEl = instanceElement.querySelector('.swiper-btn-prev') as unknown as HTMLElement;
  if (!nextEl || !prevEl) return;

  return new Swiper(swiperElement, {
    modules: [Navigation],
    slidesPerView: 1.25,
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
