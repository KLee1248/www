import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import { controls } from './controls/controls';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

export const menuIcon = html`<svg height="24" viewBox="0 0 24 24" width="24">
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
</svg>`;

class ShowcaseApp extends LitElement {
  _render({ page }) {
    return html`
    <style>
      :host {
        display: block;
      }
    
      .menu-btn {
        background: none;
        border: none;
        fill: #000;
        cursor: pointer;
        height: 44px;
        width: 44px;
      }
    
      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 20px 0;
        color: #fff;
        background: #37474F;
        position: relative;
      }
    
      .navItem {
        padding: 5px 16px;
        cursor: pointer;
      }
    
      .navItem.selected {
        box-shadow: 8px 0 #f0e6f4 inset;
      }
    
      .navItem:hover {
        box-shadow: 8px 0 #f0e6f4 inset;
      }
    
      #logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 0 16px;
        display: block;
        margin-bottom: 20px;
      }
    
      a,
      a:hover,
      a:visited {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
    
      app-toolbar {
        background: #f0e6f4;
        color: #000;
        font-size: 24px;
      }
    
      .hidden {
        display: none !important;
      }
    
      @media (min-width: 640px) {
        .menu-btn {
          display: none;
        }
      }
    </style>
    <app-drawer-layout>
      <app-drawer slot="drawer">
        <nav class="drawer-list">
          <div>
            <a href="/">
              <img alt="Logo" id="logo" src="images/logo_400.png">
            </a>
          </div>
          ${repeat(controls, (i) => i.name, (i, index) => html`
          <div class="navItem" data-name$="${i.name}" on-click="${() => this._navigate(i)}">${i.label}</div>
          `)}
        </nav>
      </app-drawer>
      <app-header-layout>
        <app-header slot="header" reveals>
          <app-toolbar>
            <button class="menu-btn" title="Menu" drawer-toggle>${menuIcon}</button>
            <div main-title>${page ? page.label : ''}</div>
          </app-toolbar>
        </app-header>
        <main>
        </main>
      </app-header-layout>
    </app-drawer-layout>
    `;
  };

  static get properties() {
    return {
      page: Object
    };
  }

  _navigate(item) {
    this._setPage(item);
  }

  _firstRendered() {
    this._setPage(controls[0]);
  }

  _setPage(item) {
    this.page = item;
    const nodes = this.shadowRoot.querySelectorAll('.navItem');
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.dataset.name === item.name) {
          n.classList.add('selected');
        } else {
          n.classList.remove('selected');
        }
      }
    }
    const pages = this.shadowRoot.querySelectorAll('.page');
    if (pages) {
      for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        if (p.classList.contains(item.name)) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      }
    }
  }

  _toggleDrawer() {
    this.shadowRoot.getElementById('drawer').toggle();
  }
}

window.customElements.define('showcase-app', ShowcaseApp);