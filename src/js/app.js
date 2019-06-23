import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.min.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../fonts/roboto/stylesheet.css';
import '../fonts/oswald/stylesheet.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

function startCheckLayoutTheme() {
  let intervalId = parseInt(localStorage.getItem('autocheckThemeIntervalId') || 0),
    theme = localStorage.getItem('theme') || 'auto'

  if (intervalId)
    clearInterval(intervalId)

  if (theme === 'auto') {
    intervalId = setInterval(() => {
      let hours = (new Date()).getHours(),
        isDayTime = hours > 6 && hours < 20
      theme = isDayTime ? 'theme-white' : 'theme-dark'
      if ($$('body').hasClass(theme))
        return
      $$('body').removeClass('theme-white theme-dark')
      $$('body').addClass(theme)
    }, 1000)
    localStorage.setItem('autocheckThemeIntervalId', intervalId)
  }
  else {
    $$('body').addClass(theme)
  }
}

var app = new Framework7({
  root: '#app', // App root element
  id: 'io.phonegap.fitnessapptemplate', // App bundle ID
  name: 'Fitness App', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    startCheckLayoutTheme: startCheckLayoutTheme,
    stopCheckLayoutTheme: function () {
      let intervalId = parseInt(localStorage.getItem('autocheckThemeIntervalId') || 0)
      clearInterval(intervalId)
    }
  },
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    overlay: Framework7.device.cordova && Framework7.device.ios || 'auto',
    enabled: Framework7.device.ios && Framework7.device.webView,
    iosOverlaysWebView: true,
    androidOverlaysWebView: true,
    androidBackgroundColor: '#f44336',
    androidTextColor: '#ffffff',
    iosBackgroundColor: '#1b1b1b',
    iosTextColor: 'black',
  },
  touch: {
    materialRipple: false
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }

      startCheckLayoutTheme()
    },
  },
  initOnDeviceReady: true,
  view: {
    unloadTabContent: false
  }
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});