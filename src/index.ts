import './index.css';

import { initiateDotLottieObservers } from '$utils/create-dotlottie-instances';
import { GlobalDialog } from '$utils/initiate-global-dialogs';
import { insightsCmsAttributes } from '$utils/insights-cms-attributes';
import { createInsightsMainSwipers } from '$utils/insights-main-swiper';
import { testimonialsMainSwiper } from '$utils/testimonials-main-swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  testimonialsMainSwiper();
  insightsCmsAttributes();
  initiateDotLottieObservers();
  createInsightsMainSwipers();
  GlobalDialog.init();
});
