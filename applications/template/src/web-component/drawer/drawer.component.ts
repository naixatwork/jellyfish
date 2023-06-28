import {css, html, LitElement} from "lit";
import {injectable} from "inversify";
import {customElement, property} from 'lit/decorators.js';

@injectable()
@customElement('nds-drawer')
export class DrawerComponent extends LitElement {
    static styles = css`
      .drawer__container {
        position: absolute;
        display: flex;
        width: 100vw;
        height: 100%;
        top: 0;
        bottom: 0;
        z-index: 999;
        pointer-events: none;
        transition: transform 300ms ease;
        transform: translateX(-100%);

        &[data-show*="true"] {
          transform: translateX(0%);
        }

        &[data-show*="false"] {
          transform: translateX(-100%);
        }
      }

      .drawer__content {
        background-color: #2b48a0;
        min-width: 288px;
        pointer-events: auto;
        height: 100%;
      }

      .drawer__backdrop {
        pointer-events: none;
        position: absolute;
        z-index: 888;
        top: 0;
        bottom: 0;
        width: 100vw;
        height: 100%;
        background: rgba(0, 0, 0, 0.7); // nds-color-scrim-dark
        transition: opacity 300ms ease;
        opacity: 0;

        &[data-show*="true"] {
          opacity: 1;
          pointer-events: auto;
        }

        &[data-show*="false"] {
          opacity: 0;
        }
      }
    `;

    @property()
    name = 'Somebody';

    @property()
    open = true;

    @property({
        reflect: false,
        state: false
    })
    onClose = () => {
        console.log('fire');
    };

    constructor() {
        super();
        console.log('v6');
    }

    render() {
        return html`
            <div class="drawer__container" data-show=${this.open}>
                <div
                        class="drawer__content"
                >
                    {sidebar}
                </div>
            </div>
            <div 
                    class="drawer__backdrop"
                    role="button"
                    tabIndex=0
                    aria-label="backdrop"
                    data-show=${this.open}
                    @click=${this.onClose}
            </div>
            <div>
                <slot></slot>
            </div>
        `;
    }

    protected createRenderRoot() {
        return this;
    }
}