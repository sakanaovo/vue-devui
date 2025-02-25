import { defineComponent, Fragment, ref, computed, onMounted, onUnmounted } from 'vue';
import { imagePreviewProps, ImagePreviewProps } from './image-preview-types';
import ImagePreviewService from './image-preview-service';
import Transform from './transform';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './image-preview.scss';

export default defineComponent({
  name: 'DImagePreview',
  props: imagePreviewProps,
  emits: [],
  setup(props: ImagePreviewProps) {
    const ns = useNamespace('image-preview');
    let transform: Transform = null;
    const index = ref(0);
    const url = computed(() => props.previewUrlList[index.value]);

    const imageStyle = props.zIndex ? { zIndex: props.zIndex } : {};
    const bgStyle = props.backDropZIndex ? { zIndex: props.backDropZIndex } : {};

    function initTransform() {
      const imageElement: HTMLImageElement = document.querySelector(`.${ns.e('main-image')}`);
      transform = new Transform(imageElement);
    }
    function initIndex() {
      index.value = props.previewUrlList.findIndex((curUrl) => curUrl === props.url);
    }
    function onPrev() {
      index.value = index.value <= 0 ? props.previewUrlList.length - 1 : index.value - 1;
    }
    function onNext() {
      index.value = index.value >= props.previewUrlList.length - 1 ? 0 : index.value + 1;
    }
    function onClose() {
      ImagePreviewService.close();
    }
    function onZoomIn() {
      transform.setZoomIn();
    }
    function onZoomOut() {
      transform.setZoomOut();
    }
    function onRotate() {
      transform.setRotate();
    }
    function onZoomBest() {
      transform.setZoomBest();
    }
    function onZoomOriginal() {
      transform.setZoomOriginal();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) {
        return;
      }

      if (event.code === 'Escape') {
        onClose();
      } else if (event.code === 'ArrowLeft') {
        onPrev();
      } else if (event.code === 'ArrowRight') {
        onNext();
      }
    }
    function initKeyboard() {
      document.addEventListener('keydown', onKeyDown, false);
    }
    function unKeyBoard() {
      document.removeEventListener('keydown', onKeyDown, false);
    }

    onMounted(() => {
      initIndex();
      initTransform();
      initKeyboard();
    });
    onUnmounted(() => {
      unKeyBoard();
    });

    return () => {
      return (
        <Fragment>
          <div class={ns.b()} style={imageStyle}>
            {/* 预览图 */}
            <img class={ns.e('main-image')} src={url.value} />
            {/* 按钮区 */}
            <button class={ns.e('close-btn')} onClick={onClose}>
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon
                    fill="#293040"
                    fill-rule="nonzero"
                    points="8 6.58578644 12.2426407 2.34314575 13.6568542 3.75735931 9.41421356 8 13.6568542 12.2426407 12.2426407 13.6568542 8 9.41421356 3.75735931 13.6568542 2.34314575 12.2426407 6.58578644 8 2.34314575 3.75735931 3.75735931 2.34314575"></polygon>
                </g>
              </svg>
            </button>
            <button class={ns.e('arrow-left')} onClick={onPrev}>
              <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon
                    fill="#293040"
                    fill-rule="nonzero"
                    points="10.7071068 12.2928932 9.29289322 13.7071068 3.58578644 8 9.29289322 2.29289322 10.7071068 3.70710678 6.41421356 8"></polygon>
                </g>
              </svg>
            </button>
            <button class={ns.e('arrow-right')} onClick={onNext}>
              <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon
                    fill="#293040"
                    fill-rule="nonzero"
                    transform="translate(8.146447, 8.000000) scale(-1, 1) translate(-8.146447, -8.000000) "
                    points="11.7071068 12.2928932 10.2928932 13.7071068 4.58578644 8 10.2928932 2.29289322 11.7071068 3.70710678 7.41421356 8"></polygon>
                </g>
              </svg>
            </button>
            {/* 底部固定区 */}
            <div class={ns.e('toolbar')}>
              <button onClick={onZoomIn}>
                <svg width="18px" height="18px" viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g fill="#293040" fill-rule="nonzero">
                      <path
                        d={`M6,6 L6,4 L8,4 L8,6 L10,6 L10,8 L8,8 L8,10 L6,10 L6,8 L4,8 L4,6 L6,6 Z
                        M12.6063847,11.1921711 L15.6568542,14.2426407 L14.2426407,15.6568542 L11.1921711,12.6063847
                         C10.0235906,13.4815965 8.5723351,14 7,14 C3.13400675,14 0,10.8659932 0,7 C0,3.13400675
                          3.13400675,0 7,0 C10.8659932,0 14,3.13400675 14,7 C14,8.5723351 13.4815965,10.0235906
                           12.6063847,11.1921711 L12.6063847,11.1921711 Z M7,12 C9.76142375,12 12,9.76142375
                            12,7 C12,4.23857625 9.76142375,2 7,2 C4.23857625,2 2,4.23857625 2,7 C2,9.76142375
                             4.23857625,12 7,12 Z`}></path>
                    </g>
                  </g>
                </svg>
              </button>
              <button onClick={onZoomOut}>
                <svg width="18px" height="18px" viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g fill="#293040" fill-rule="nonzero">
                      <path
                        d={`M12.6063847,11.1921711 L15.6568542,14.2426407 L14.2426407,15.6568542
                        L11.1921711,12.6063847 C10.0235906,13.4815965 8.5723351,14 7,14 C3.13400675,14 0,10.8659932
                         0,7 C0,3.13400675 3.13400675,0 7,0 C10.8659932,0 14,3.13400675 14,7 C14,8.5723351
                          13.4815965,10.0235906 12.6063847,11.1921711 L12.6063847,11.1921711 Z M7,12 C9.76142375,12
                           12,9.76142375 12,7 C12,4.23857625 9.76142375,2 7,2 C4.23857625,2 2,4.23857625 2,7 C2,9.76142375
                            4.23857625,12 7,12 Z M4,6 L10,6 L10,8 L4,8 L4,6 Z`}></path>
                    </g>
                  </g>
                </svg>
              </button>
              <button onClick={onRotate}>
                <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path
                      d={`M7.5,3.02242151 L7.5,4 L4.5,2 L7.5,0 L7.5,1.01640228 C7.66526181,1.00552468
                      7.83198572,1 8,1 C12.1421356,1 15.5,4.35786438 15.5,8.5 C15.5,12.6421356
                       12.1421356,16 8,16 C3.85786438,16 0.5,12.6421356 0.5,8.5 C0.5,6.9828355
                        0.950484514,5.5708873 1.72499011,4.39061882 L3.42173231,5.4510827 C2.83944149,6.32371289
                         2.5,7.37221604 2.5,8.5 C2.5,11.5375661 4.96243388,14 8,14 C11.0375661,14 13.5,11.5375661
                          13.5,8.5 C13.5,5.46243388 11.0375661,3 8,3 C7.83145515,3 7.66468102,3.00758131 7.5,3.02242151
                           Z M8,11 C6.61928813,11 5.5,9.88071187 5.5,8.5 C5.5,7.11928813 6.61928813,6 8,6 C9.38071187,6
                            10.5,7.11928813 10.5,8.5 C10.5,9.88071187 9.38071187,11 8,11 Z M8,10 C8.82842712,10 9.5,9.32842712
                             9.5,8.5 C9.5,7.67157288 8.82842712,7 8,7 C7.17157288,7 6.5,7.67157288 6.5,8.5 C6.5,9.32842712
                              7.17157288,10 8,10 Z`}
                      fill="#293040"></path>
                  </g>
                </svg>
              </button>
              <button onClick={onPrev}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon
                      fill="#293040"
                      fill-rule="nonzero"
                      points="10.7071068 12.2928932 9.29289322 13.7071068 3.58578644 8 9.29289322 2.29289322 10.7071068 3.70710678 6.41421356 8"></polygon>
                  </g>
                </svg>
              </button>
              <span class={ns.e('index')}>
                {index.value + 1}:{props.previewUrlList.length}
              </span>
              <button onClick={onNext}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon
                      fill="#293040"
                      fill-rule="nonzero"
                      transform="translate(8.146447, 8.000000) scale(-1, 1) translate(-8.146447, -8.000000) "
                      points="11.7071068 12.2928932 10.2928932 13.7071068 4.58578644 8 10.2928932 2.29289322 11.7071068 3.70710678 7.41421356 8"></polygon>
                  </g>
                </svg>
              </button>
              <button onClick={onZoomBest}>
                <svg width="18px" height="18px" viewBox="0 0 16 16">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path
                      d={`M16,16 L11.429,16 L11.429,15 L14.456,15 L11.006,11.226 L11.652,10.519 L15.086,14.275
                      L15.086,11 L16,11 L16,16 Z M15.164,1.544 L12.009,4.994 L11.418,4.348 L14.558,0.914
                       L11.82,0.914 L11.82,0 L16,0 L16,4.571 L15.164,4.571 L15.164,1.544 Z M5,15 L5,16
                        L0,16 L0,11 L1,11 L1,14.275 L4.756,10.519 L5.463,11.226 L1.689,15 L5,15 Z M4.365,4.994
                         L0.914,1.544 L0.914,4.571 L3.41060513e-13,4.571 L3.41060513e-13,0 L4.571,0 L4.571,0.914
                          L1.578,0.914 L5.011,4.348 L4.365,4.994 Z`}
                      fill="#293040"
                      fill-rule="nonzero"></path>
                  </g>
                </svg>
              </button>
              <button onClick={onZoomOriginal}>
                <span>1:1</span>
              </button>
            </div>
          </div>
          <div class={ns.e('bg')} style={bgStyle}></div>
        </Fragment>
      );
    };
  },
});
