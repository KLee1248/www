import { LitElement, html } from 'lit-element';

export class IconButtonExample extends LitElement {
  render() {
    return html`
    <style>
      :host {
        display: block;
        padding: 16px;
      }
    
      wired-icon-button {
        margin: 0 10px;
      }
    
      .big {
        --wired-icon-size: 40px;
        padding: 16px;
      }
    
      .red {
        color: red;
      }
    
      .pinkbg {
        color: red;
        --wired-icon-bg-color: pink;
      }
    </style>
    <wired-icon-button>favorite</wired-icon-button>
    <wired-icon-button class="red">favorite</wired-icon-button>
    <wired-icon-button class="pinkbg">favorite</wired-icon-button>
    <wired-icon-button class="big">favorite</wired-icon-button>
    <wired-icon-button disabled>favorite</wired-icon-button>
    `;
  }

  onActivate() {
    setTimeout(() => {
      const nodes = this.shadowRoot.querySelectorAll('wired-icon-button');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].requestUpdate();
      }
    });
  }

}

customElements.define('iconbutton-example', IconButtonExample);