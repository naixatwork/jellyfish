import {css, html, LitElement} from "lit";
import {injectable} from "inversify";
import {customElement, property} from 'lit/decorators.js';

@injectable()
@customElement('nds-drawer')
export class DrawerComponent extends LitElement {
    static styles = css`p { color: blue }`;

    @property()
    name = 'Somebody';

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}