(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['twitTemplate'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"twit\">\r\n    <div class=\"twit-icon\">\r\n        <i class=\"fa fa-bullhorn\"></i>\r\n    </div>\r\n    <div class=\"twit-content\">\r\n        <p class=\"twit-text\">\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":20}}}) : helper)))
    + "\r\n        </p>\r\n        <p class=\"twit-time\">\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":10,"column":20}}}) : helper)))
    + "\r\n        </p>\r\n        <p class=\"twit-author\">\r\n            <a href=\"#\">\r\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"author") || (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":14,"column":26}}}) : helper)))
    + "\r\n            </a>\r\n        </p>\r\n    </div>\r\n</article>";
},"useData":true});
})();