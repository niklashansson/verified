import './index.css';

import { initiateDotLottieObservers } from '$utils/create-dotlottie-instances';
import { createInsightsSwipers } from '$utils/create-insights-swipers';
import { GlobalDialog } from '$utils/initiate-global-dialogs';
import { insightsCmsFeed } from '$utils/insights-cms-feed';
import { testimonialsMainSwiper } from '$utils/testimonials-main-swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  window.addEventListener('load', () => {
    testimonialsMainSwiper();
    createInsightsSwipers();
    initiateDotLottieObservers();
    insightsCmsFeed();
    GlobalDialog.init();
  });
});
