// Define the custom element
class EFrame extends HTMLElement {
    constructor() {
      super();
  
      // Create the switch element
      this.switch = document.createElement('label');
      this.switch.setAttribute('class', 'e3c-switch');
      this.input = document.createElement('input');
      this.input.setAttribute('type', 'checkbox');
      this.slider = document.createElement('span');
      this.slider.setAttribute('class', 'e3c-slider round');
      this.switch.appendChild(this.input);
      this.switch.appendChild(this.slider);

      // Create the switch wrapper element
      this.switchWrapper = document.createElement('div');
      this.switchWrapper.setAttribute('class', 'e3c-switch-container');
      this.switchWrapper.style.display = 'flex';
      this.switchWrapper.style.alignItems = 'center';
      this.switchLabel = document.createTextNode('Show external content from Twitter');
     
      // Create the message elements
      this.heading = document.createElement('h3');
      this.heading.innerText = "External Content";
      this.message1 = document.createElement('p');
      this.message1.innerText = "Here you'll find additional content from Twitter that complements the article. You can easily view it with a single click and then hide it again.";
      this.message2 = document.createElement('p');
      this.message2.setAttribute('class', 'e3c-fineprint');
      this.message2.innerText = "I agree to have external content displayed to me. This may result in personal data being shared with third-party platforms.";
 
      // Conditionally add link to privacy policy
      if (this.getAttribute('policy')) {
        this.privacyPolicyLink = document.createElement('a');
        this.privacyPolicyLink.href = this.getAttribute('policy');
        this.privacyPolicyLink.innerText = 'privacy policy';
        const learnMoreText = document.createTextNode(' To learn more, please refer to our ');
     this.message2.appendChild(learnMoreText);
        this.message2.appendChild(this.privacyPolicyLink);
        this.message2.appendChild(document.createTextNode("."));
      }
 
      // Conditionally display the Twitter icon based on the show attribute
      var add_fontawesome = ""
      if (this.getAttribute('show') === 'icon') {
        this.twitterIcon = document.createElement('i');
        this.twitterIcon.setAttribute('class', 'fab fa-twitter');
        this.twitterIcon.style.marginRight = '10px';
        this.heading.prepend(this.twitterIcon);
        var add_fontawesome = "@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css');"
      }

      // Create the tweet container element
      this.container = document.createElement('div');
      this.container.style.display = 'none';

      // Create the eframe container element
      this.eframeContainer = document.createElement('div');
      this.eframeContainer.setAttribute('class', 'eframe-container');

      // Add the elements to the eframe container element
      this.eframeContainer.appendChild(this.heading);
      this.eframeContainer.appendChild(this.message1);
      this.switchWrapper.appendChild(this.switch);
/*       this.switchWrapper.appendChild(document.createTextNode('Show external content from Twitter')); */
      this.switchWrapper.appendChild(this.switchLabel);
      this.eframeContainer.appendChild(this.switchWrapper);
      this.eframeContainer.appendChild(this.message2);
      this.eframeContainer.appendChild(this.container);

      // Add the eframe container element to the custom element
      this.appendChild(this.eframeContainer);

      // Add event listener to the switch
      this.input.addEventListener('change', this.onToggle.bind(this));
      
      // Create the CSS styles
      var css = `

      ${add_fontawesome}

      e-frame {
        display: inline-block;
        max-width: 600px;
        width: 100%;
        height: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .eframe-container {
      padding: 0px 20px;
    }

    .e3c-switch-container {
      margin: 10px 0px;
    }

    .e3c-fineprint {
      font-size: 0.95em;
    }

      .e3c-switch {
        position: relative;
        margin-right: 5px;
        display: inline-block;
        width: 40px;
        height: 24px;
      }
  
      .e3c-switch input {
        display: none;
      }
  
      .e3c-slider {
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
  
      .e3c-slider:before {
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
  
      input:checked + .e3c-slider {
        background-color: #2196F3;
      }
  
      input:focus + .e3c-slider {
        box-shadow: 0 0 1px #2196F3;
      }
  
      input:checked + .e3c-slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
      }
    `;
  
      // Create the style element and append it to the document's head
      var style = document.createElement('style');
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  
    loadTwitterWidget() {
      if (!window.twttr) {
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
        }
      }
    
      onToggle() {
        if (this.input.checked) {
          // Load the Twitter widgets.js script
          this.loadTwitterWidget();
    
          // Load the tweet content
          var tweetEmbed = document.createElement('blockquote');
          tweetEmbed.setAttribute('class', 'twitter-tweet');
          tweetEmbed.innerHTML = '<a href="' + this.getAttribute('src') + '"></a>';
    
          this.container.appendChild(tweetEmbed);
    
          window.twttr.ready((twttr) => {
            twttr.widgets.load(this.container);
          });
    
          this.container.style.display = "block";
          this.heading.style.display = "none";
          this.message1.style.display = "none";
          this.message2.style.display = "none";
          this.switchLabel.textContent = 'External content';
        } else {
          // Clear the tweet content
          this.container.innerHTML = '';
          this.container.style.display = "none";
          // Show the messages
          this.heading.style.display = "block";
          this.message1.style.display = "block";
          this.message2.style.display = "block";
          this.switchLabel.textContent = 'Show external content from Twitter';
        }
      }
    }
    
    // Define the custom element tag
    customElements.define('e-frame', EFrame);