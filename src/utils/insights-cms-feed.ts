import type { CMSList } from 'src/types/CMSList';

window.fsAttributes = window.fsAttributes || [];

export function insightsCmsFeed() {
  window.fsAttributes.push([
    'cmsnest',
    async (listInstances: CMSList[]) => {
      console.log('cmsnest Successfully loaded!');
      window.fsAttributes.cmscombine.init();
      window.fsAttributes.cmsfilter.init();
      window.fsAttributes.cmssort.init();
    },
  ]);
}
