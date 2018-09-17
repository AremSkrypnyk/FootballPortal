// SITE-MAIN
// ================
define('site-main', [

  // add files to be bundled into site-main file
  'component-loader',
  'sdc-site-pub-sub',
  'sdc-site-cookie-notice',
  'sdc-site-mpu',
  'blackjack-sdc-digrev-header',
  'blackjack-sdc-digrev-footer'
  ],
function(
  componentLoader,
  pubSub
  ){
  return {
    init: function(){
      window.sdc = window.sdc || {};
      componentLoader.init();
      pubSub.init(window.sdc, {debugMode: true});


      //console.log('init site js');
    }
  };
});

