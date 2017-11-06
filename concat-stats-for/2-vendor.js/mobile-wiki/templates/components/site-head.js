define("mobile-wiki/templates/components/site-head", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G5YwvHp6", "block": "{\"symbols\":[\"@globalNavigation\"],\"statements\":[[4,\"if\",[[19,0,[\"shouldShowFandomAppSmartBanner\"]]],null,{\"statements\":[[0,\"\\t\"],[1,[25,\"fandom-app-smart-banner\",null,[[\"toggleVisibility\",\"isVisible\"],[[19,0,[\"toggleSmartBannerVisibility\"]],[19,0,[\"smartBannerVisible\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"div\"],[9,\"class\",\"site-head-wrapper\"],[7],[0,\"\\n\\t\"],[6,\"nav\"],[10,\"class\",[26,[\"site-head\",[25,\"unless\",[[19,0,[\"shadow\"]],\" no-shadow\"],null]]]],[7],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"site-head__nav-icon-wrapper\"],[7],[0,\"\\n\\t\\t\\t\"],[1,[25,\"wikia-ui-components/icon-button\",null,[[\"click\",\"class\",\"icon\",\"iconSize\"],[[25,\"action\",[[19,0,[]],\"siteHeadIconClick\",\"nav\"],null],\"site-head-icon site-head-icon-nav\",[19,0,[\"navIcon\"]],24]]],false],[0,\"\\n\"],[4,\"unless\",[[19,0,[\"drawerVisible\"]]],null,{\"statements\":[[4,\"if\",[[19,0,[\"unreadCount\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\"],[6,\"span\"],[9,\"class\",\"wds-notifications__unread-mark\"],[7],[1,[18,\"unreadCount\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\t\\t\"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"site-logo\"],[7],[0,\"\\n\\t\\t\\t\"],[6,\"a\"],[10,\"href\",[26,[[18,\"wikiaHomepage\"]]]],[3,\"action\",[[19,0,[]],\"trackWordmarkClick\"],[[\"preventDefault\"],[false]]],[7],[0,\"\\n\\t\\t\\t\\t\"],[1,[25,\"svg\",[[19,0,[\"svgName\"]]],[[\"role\",\"class\"],[\"img\",\"fandom-logo\"]]],false],[0,\"\\n\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"site-head-icon-search\"],[7],[0,\"\\n\\t\\t\\t\"],[1,[25,\"wikia-ui-components/icon-button\",null,[[\"click\",\"class\",\"icon\",\"iconSize\",\"isVisible\"],[[25,\"action\",[[19,0,[]],\"siteHeadIconClick\",\"search\"],null],\"site-head-icon\",[19,0,[\"searchIcon\"]],24,[25,\"if\",[[19,0,[\"isSearchPage\"]],false,true],null]]]],false],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[4,\"unless\",[[19,0,[\"isFandomAppSmartBannerVisible\"]]],null,{\"statements\":[[0,\"\\t\"],[1,[25,\"site-head-fandom-bar\",null,[[\"wikiaHomepage\",\"isVisible\",\"globalNavigation\"],[[19,0,[\"wikiaHomepage\"]],[19,0,[\"displayFandomBar\"]],[19,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"div\"],[9,\"id\",\"site-head-sub-header\"],[10,\"class\",[26,[[25,\"unless\",[[19,0,[\"displayFandomBar\"]],\"site-head-fandom-bar-hidden\"],null]]]],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "mobile-wiki/templates/components/site-head.hbs" } });
});