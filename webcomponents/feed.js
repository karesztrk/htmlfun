const template = document.createElement('template');
template.innerHTML = `
    <style>
        .feed-item {
            display: flex;
            max-width: 400px;
            margin: 10px;
            max-height: 120px;
            overflow: hidden;
            border-bottom: 2px solid crimson;
            background: cornsilk;
            transition: max-height 1s ease-out;
        }
        
        .feed-item.open {
            max-height: 500px;
        }
        
        .feed-content {
            flex: 1 0;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
        }
        
        .feed-title {
            color: chocolate;
            margin-top: 0;
        }
        
        .feed-image {
            width: auto;
            height: 120px;
        }
        
        .feed-message {
            overflow: hidden;
            margin-top: 0;
            line-height: 1.2;
        }
    </style>
    <div class="feed-item">
        <img class="feed-image"/>
        <div class="feed-content">
          <h3 class="feed-title">
          </h3>
          <p class="feed-message">
            <slot name="message" />
          </p>
          <button class="open-button">Read more...</button>
        </div>
    </div>
`;


class Feed extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    Array.from(this.children).forEach((child) => shadow.appendChild(child));
  }
}

class FeedItem extends HTMLElement {
  constructor() {
    super();
    this.open = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('user');
    this.shadowRoot.querySelector('img').src = this.getAttribute('image');
  }

  readMore = () => {
    const item = this.shadowRoot.querySelector('.feed-item');
    const btn = this.shadowRoot.querySelector('.open-button');
    this.open = !this.open;

    if (this.open) {
      item.classList.add(('open'));
      btn.innerText = 'Hide';
    } else {
      item.classList.remove('open');
      btn.innerText = 'Read more...';
    }
  };

  connectedCallback() {
    this.shadowRoot.querySelector('.open-button').addEventListener('click', this.readMore);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.open-button').removeEventListener();
  }
}

window.customElements.define('activity-feed', Feed);
window.customElements.define('feed-item', FeedItem);