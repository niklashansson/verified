import './index.css';

import { initiateDotLottieObservers } from '$utils/create-dotlottie-instances';
import { GlobalDialog } from '$utils/initiate-global-dialogs';
import { initiateInsightsFsAttributesWithSwiper } from '$utils/initiate-insights-fs-attributes-with-swiper';
import { insightsCmsFeed } from '$utils/insights-cms-feed';
import { createInsightsMainSwipers } from '$utils/insights-main-swiper';
import { testimonialsMainSwiper } from '$utils/testimonials-main-swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  testimonialsMainSwiper();
  initiateInsightsFsAttributesWithSwiper();
  initiateDotLottieObservers();
  createInsightsMainSwipers();
  insightsCmsFeed();
  GlobalDialog.init();
});
