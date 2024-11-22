import type { CMSList } from 'src/types/CMSList';

import { createInsightsMainSwiper } from './insights-main-swiper';

window.fsAttributes = window.fsAttributes || [];

export function insightsCmsAttributes() {
  window.fsAttributes.push(
    [
      'cmscombine',
      async (listInstances: CMSList[]) => {
        listInstances.forEach((instance) => {
          const swiperInstanceElement = instance.wrapper.closest(
            '[data-swiper-cms-instance="insights-main"]'
          ) as unknown as HTMLElement;

          if (!swiperInstanceElement) {
            instance.wrapper.classList.add('.hide');
            return;
          }

          const sortTrigger = document.querySelector(
            '.fs_cmssort_trigger'
          ) as unknown as HTMLButtonElement;
          sortTrigger?.click();

          createInsightsMainSwiper(swiperInstanceElement);
        });
      },
    ],
    [
      'cmssort',
      async (listInstances: CMSList[]) => {
        listInstances.forEach((instance) => {
          instance.renderItems();
        });
      },
    ]
  );
}
