import { isNumber } from '@finsweet/ts-utils';
import { DotLottie } from '@lottiefiles/dotlottie-web';

export function initiateDotLottieObservers() {
  const instances = document.querySelectorAll(
    '[data-dotlottie-src]'
  ) as unknown as HTMLCanvasElement[];
  if (!instances || !instances.length) return;

  const dotlotties = new Map<HTMLCanvasElement, DotLottie>();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target as unknown as HTMLCanvasElement;
      if (!target) return;

      if (entry.isIntersecting) {
        if (!dotlotties.get(target)) {
          const dotlottie = createDotLottieInstance(target);
          dotlotties.set(target, dotlottie);

          return;
        }

        const dotlottie = dotlotties.get(target);

        if (dotlottie?.autoplay) {
          dotlottie.play();
        }
      }

      if (!entry.isIntersecting && dotlotties.get(target)) {
        const dotlottie = dotlotties.get(target);
        dotlottie?.pause();
      }
    });
  });

  instances.forEach((instance) => {
    observer.observe(instance);
  });

  // Optional: Provide a way to disconnect or clean up
  return {
    disconnect: () => {
      observer.disconnect();
      dotlotties.forEach((dotlottie) => {
        dotlottie.destroy(); // Clean up DotLottie instances
      });
      dotlotties.clear();
    },
    unobserve: (element: HTMLCanvasElement) => {
      observer.unobserve(element);
      const dotlottie = dotlotties.get(element);
      if (dotlottie) {
        dotlottie.destroy(); // Clean up the specific DotLottie instance
        dotlotties.delete(element);
      }
    },
  };
}

function createDotLottieInstance(element: HTMLCanvasElement) {
  const src = element.dataset?.dotlottieSrc;
  const { loop, autoplay, speed, dotlottieSrc } = element.dataset;

  if (!dotlottieSrc) throw Error('No .dotlottie src found');

  return new DotLottie({
    autoplay: autoplay === 'true' ? true : false,
    loop: loop === 'true' ? true : false,
    canvas: element,
    speed: isNumber(speed) ? speed : 1,
    src,
  });
}
