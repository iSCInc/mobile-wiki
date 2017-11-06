define("mobile-wiki/templates/head", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "V3FiobnX", "block": "{\"symbols\":[],\"statements\":[[6,\"meta\"],[9,\"charset\",\"utf-8\"],[7],[8],[0,\"\\n\"],[6,\"meta\"],[9,\"http-equiv\",\"X-UA-Compatible\"],[9,\"content\",\"IE=edge\"],[7],[8],[0,\"\\n\"],[6,\"meta\"],[9,\"name\",\"viewport\"],[9,\"content\",\"user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimal-ui\"],[7],[8],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"model\",\"themeColor\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"name\",\"theme-color\"],[10,\"content\",[26,[[20,[\"model\",\"themeColor\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"unless\",[[19,0,[\"model\",\"noExternals\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"dns-prefetch\"],[9,\"href\",\"http://edge.quantserve.com\"],[7],[8],[0,\"\\n\\t\"],[6,\"link\"],[9,\"rel\",\"dns-prefetch\"],[9,\"href\",\"http://secure-dcr.imrworldwide.com/\"],[7],[8],[0,\"\\n\\t\"],[6,\"link\"],[9,\"rel\",\"dns-prefetch\"],[9,\"href\",\"http://b.scorecardresearch.com\"],[7],[8],[0,\"\\n\\t\"],[6,\"link\"],[9,\"rel\",\"dns-prefetch\"],[9,\"href\",\"https://script.ioam.de/iam.js\"],[7],[8],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"model\",\"gaUrl\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[6,\"link\"],[9,\"rel\",\"dns-prefetch\"],[10,\"href\",[26,[[20,[\"model\",\"gaUrl\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"favicon\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"shortcut icon\"],[10,\"href\",[26,[[20,[\"model\",\"favicon\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"appleTouchIcon\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"apple-touch-icon\"],[10,\"href\",[26,[[20,[\"model\",\"appleTouchIcon\",\"url\"]]]]],[10,\"sizes\",[26,[[20,[\"model\",\"appleTouchIcon\",\"size\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"amphtml\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"amphtml\"],[10,\"href\",[26,[[20,[\"model\",\"amphtml\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"htmlTitle\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"title\"],[7],[1,[20,[\"model\",\"htmlTitle\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"description\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"name\",\"description\"],[10,\"content\",[26,[[20,[\"model\",\"description\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"keywords\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"name\",\"keywords\"],[10,\"content\",[26,[[20,[\"model\",\"keywords\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"robots\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"name\",\"robots\"],[10,\"content\",[26,[[20,[\"model\",\"robots\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"appleItunesApp\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"name\",\"apple-itunes-app\"],[10,\"content\",[26,[[20,[\"model\",\"appleItunesApp\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"canonical\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"canonical\"],[10,\"href\",[26,[[20,[\"model\",\"canonical\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"next\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"next\"],[10,\"href\",[26,[[20,[\"model\",\"next\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"prev\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"link\"],[9,\"rel\",\"prev\"],[10,\"href\",[26,[[20,[\"model\",\"prev\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"meta\"],[9,\"property\",\"og:type\"],[10,\"content\",[26,[[20,[\"model\",\"type\"]]]]],[7],[8],[0,\"\\n\\n\"],[4,\"unless\",[[19,0,[\"model\",\"isMainPage\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"property\",\"og:site_name\"],[10,\"content\",[26,[[20,[\"model\",\"siteName\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"meta\"],[9,\"property\",\"og:title\"],[10,\"content\",[26,[[20,[\"model\",\"title\"]]]]],[7],[8],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"model\",\"description\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"property\",\"og:description\"],[10,\"content\",[26,[[20,[\"model\",\"description\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"meta\"],[9,\"property\",\"og:url\"],[10,\"content\",[26,[[20,[\"model\",\"canonical\"]]]]],[7],[8],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"model\",\"pageImage\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"property\",\"og:image\"],[10,\"content\",[26,[[20,[\"model\",\"pageImage\"]]]]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,0,[\"model\",\"facebookAppId\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"meta\"],[9,\"property\",\"fb:app_id\"],[10,\"content\",[26,[[20,[\"model\",\"facebookAppId\"]]]]],[9,\"prefix\",\"fb: http://www.facebook.com/2008/fbml\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"script\"],[9,\"id\",\"liftigniter-metadata\"],[9,\"type\",\"application/json\"],[7],[0,\"{\\\"noIndex\\\":\\\"true\\\"}\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "mobile-wiki/templates/head.hbs" } });
});