import type { CMSList } from 'src/types/CMSList';

window.fsAttributes = window.fsAttributes || [];

export function insightsCmsFeed() {
  window.fsAttributes.push([
    'cmsnest',
    async (listInstances: CMSList[]) => {
      const loader = document.querySelector('[data-insights-cms-element="loader"]');
      if (!loader) return;

      window.fsAttributes.cmscombine.init();
      window.fsAttributes.cmsfilter.init();
      window.fsAttributes.cmssort.init();

      loader.classList.add('is-loaded');
    },
  ]);
}
