// Wait for the Twitter widgets.js script to load
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));
  
  // Define the custom element
  class EFrame extends HTMLElement {
    constructor() {
      super();
  
      // Create the switch element
      this.switch = document.createElement('label');
      this.switch.setAttribute('class', 'switch');
      this.input = document.createElement('input');
      this.input.setAttribute('type', 'checkbox');
      this.slider = document.createElement('span');
      this.slider.setAttribute('class', 'slider round');
      this.switch.appendChild(this.input);
      this.switch.appendChild(this.slider);
  
      // Create the message elements
      this.message1 = document.createElement('p');
      this.message1.innerText = "Here you find content from Twitter that complements this article. You can display it with one click and hide it again.";
      this.message2 = document.createElement('p');
      this.message2.innerText = "I agree to external content being shown here. This may transmit personal data to third-party platforms.";
  
      // Create the tweet container element
      this.container = document.createElement('div');
      this.container.style.display = 'none';
  
      // Add the elements to the custom element
      this.appendChild(this.message1);
      this.appendChild(this.switch);
      this.appendChild(document.createElement('span').appendChild(document.createTextNode('Show external content from Twitter')));
      this.appendChild(this.message2);
      this.appendChild(this.container);
  
      // Add event listener to the switch
      this.input.addEventListener('change', this.onToggle.bind(this));
    
  
          // Create the CSS styles
          var css = `
          .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 24px;
          }
  
          .switch input {
            display: none;
          }
  
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 34px;
          }
  
          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
          }
  
          input:checked + .slider {
            background-color: #2196F3;
          }
  
          input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
          }
  
          input:checked + .slider:before {
            -webkit-transform: translateX(16px);
            -ms-transform: translateX(16px);
            transform: translateX(16px);
          }
        `;
  
        // Create the style element and append it to the document's head
        var style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
      };

    onToggle() {
      if (this.input.checked) {
        // Load the tweet content
        var tweetEmbed = document.createElement('blockquote');
        tweetEmbed.setAttribute('class', 'twitter-tweet');
        tweetEmbed.innerHTML = '<a href="' + this.getAttribute('src') + '"></a>';
  
        this.container.appendChild(tweetEmbed);
  
        window.twttr.widgets.load(this.container);
  
        this.container.style.display = "block";
      } else {
        // Clear the tweet content
        this.container.innerHTML = '';
        this.container.style.display = "none";
      }
    }
  }
  
  // Define the custom element tag
  customElements.define('e-frame', EFrame);
