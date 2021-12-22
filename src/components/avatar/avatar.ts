import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('sb-avatar')
export default class SbAvatar extends LitElement {
  @property()
  label: string;

  @property()
  path: string;

  @property()
  srcset: string;

  @property()
  initials: string;

  @state()
  private hasError = false;

  render() {
    return html`
      <div part="base" role="img" aria-label=${this.label}>
        ${this.initials
          ? html` <div part="initials">${this.initials}</div> `
          : null}
        ${this.path && !this.hasError
          ? html`
              <img
                part="image"
                src="${this.path}"
                srcset="${this.srcset}"
                alt=""
                @error="${() => (this.hasError = true)}"
              />
            `
          : null}
      </div>
    `;
  }
}
