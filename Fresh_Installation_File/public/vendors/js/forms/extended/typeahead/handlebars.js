var Handlebars=function(){var t=function(){"use strict";function t(t){this.string=t}return t.prototype.toString=function(){return""+this.string},t}(),e=function(t){"use strict";var e={},s=t,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},n=/[&<>"'`]/g,r=/[&<>"'`]/;function o(t){return i[t]||"&amp;"}e.extend=function(t,e){for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])};var a,h=Object.prototype.toString;e.toString=h,(a=function(t){return"function"==typeof t})(/x/)&&(a=function(t){return"function"==typeof t&&"[object Function]"===h.call(t)}),e.isFunction=a;var c=Array.isArray||function(t){return!(!t||"object"!=typeof t)&&"[object Array]"===h.call(t)};return e.isArray=c,e.escapeExpression=function(t){return t instanceof s?t.toString():t||0===t?(t=""+t,r.test(t)?t.replace(n,o):t):""},e.isEmpty=function(t){return!t&&0!==t||!(!c(t)||0!==t.length)},e}(t),s=function(){"use strict";var t=["description","fileName","lineNumber","message","name","number","stack"];function e(){for(var e=Error.prototype.constructor.apply(this,arguments),s=0;s<t.length;s++)this[t[s]]=e[t[s]]}return e.prototype=new Error,e}(),i=function(t,e){"use strict";var s={},i=t,n=e;s.VERSION="1.2.0";s.COMPILER_REVISION=4;s.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};var r=i.isArray,o=i.isFunction,a=i.toString,h="[object Object]";function c(t,e){var s;this.helpers=t||{},this.partials=e||{},(s=this).registerHelper("helperMissing",(function(t){if(2!==arguments.length)throw new Error("Missing helper: '"+t+"'")})),s.registerHelper("blockHelperMissing",(function(t,e){var i=e.inverse||function(){},n=e.fn;return o(t)&&(t=t.call(this)),!0===t?n(this):!1===t||null==t?i(this):r(t)?t.length>0?s.helpers.each(t,e):i(this):n(t)})),s.registerHelper("each",(function(t,e){var s,i=e.fn,n=e.inverse,a=0,h="";if(o(t)&&(t=t.call(this)),e.data&&(s=u(e.data)),t&&"object"==typeof t)if(r(t))for(var c=t.length;a<c;a++)s&&(s.index=a,s.first=0===a,s.last=a===t.length-1),h+=i(t[a],{data:s});else for(var p in t)t.hasOwnProperty(p)&&(s&&(s.key=p,s.index=a,s.first=0===a),h+=i(t[p],{data:s}),a++);return 0===a&&(h=n(this)),h})),s.registerHelper("if",(function(t,e){return o(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||i.isEmpty(t)?e.inverse(this):e.fn(this)})),s.registerHelper("unless",(function(t,e){return s.helpers.if.call(this,t,{fn:e.inverse,inverse:e.fn,hash:e.hash})})),s.registerHelper("with",(function(t,e){if(o(t)&&(t=t.call(this)),!i.isEmpty(t))return e.fn(t)})),s.registerHelper("log",(function(t,e){var i=e.data&&null!=e.data.level?parseInt(e.data.level,10):1;s.log(i,t)}))}s.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:p,log:l,registerHelper:function(t,e,s){if(a.call(t)===h){if(s||e)throw new n("Arg not supported with multiple helpers");i.extend(this.helpers,t)}else s&&(e.not=s),this.helpers[t]=e},registerPartial:function(t,e){a.call(t)===h?i.extend(this.partials,t):this.partials[t]=e}};var p={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(t,e){if(p.level<=t){var s=p.methodMap[t];"undefined"!=typeof console&&console[s]&&console[s].call(console,e)}}};function l(t,e){p.log(t,e)}s.logger=p,s.log=l;var u=function(t){var e={};return i.extend(e,t),e};return s.createFrame=u,s}(e,s),n=function(t,e,s){"use strict";var i={},n=t,r=e,o=s.COMPILER_REVISION,a=s.REVISION_CHANGES;function h(t,e,s){var i=function(t,i){return e(t,(i=i||{}).data||s)};return i.program=t,i.depth=0,i}return i.checkRevision=function(t){var e=t&&t[0]||1;if(e!==o){if(e<o){var s=a[o],i=a[e];throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+s+") or downgrade your runtime to an older version ("+i+").")}throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}},i.template=function(t,e){if(!e)throw new Error("No environment passed to template");var s={escapeExpression:n.escapeExpression,invokePartial:function(t,s,i,n,o,a){var h=e.VM.invokePartial.apply(this,arguments);if(null!=h)return h;if(e.compile){var c={helpers:n,partials:o,data:a};return o[s]=e.compile(t,{data:void 0!==a},e),o[s](i,c)}throw new r("The partial "+s+" could not be compiled when running in runtime-only mode")},programs:[],program:function(t,e,s){var i=this.programs[t];return s?i=h(t,e,s):i||(i=this.programs[t]=h(t,e)),i},merge:function(t,e){var s=t||e;return t&&e&&t!==e&&(s={},n.extend(s,e),n.extend(s,t)),s},programWithDepth:e.VM.programWithDepth,noop:e.VM.noop,compilerInfo:null};return function(i,n){var r,o,a=(n=n||{}).partial?n:e;n.partial||(r=n.helpers,o=n.partials);var h=t.call(s,a,i,r,o,n.data);return n.partial||e.VM.checkRevision(s.compilerInfo),h}},i.programWithDepth=function(t,e,s){var i=Array.prototype.slice.call(arguments,3),n=function(t,n){return n=n||{},e.apply(this,[t,n.data||s].concat(i))};return n.program=t,n.depth=i.length,n},i.program=h,i.invokePartial=function(t,e,s,i,n,o){var a={partial:!0,helpers:i,partials:n,data:o};if(void 0===t)throw new r("The partial "+e+" could not be found");if(t instanceof Function)return t(s,a)},i.noop=function(){return""},i}(e,s,i),r=function(t,e,s,i,n){"use strict";var r=t,o=e,a=s,h=i,c=n,p=function(){var t=new r.HandlebarsEnvironment;return h.extend(t,r),t.SafeString=o,t.Exception=a,t.Utils=h,t.VM=c,t.template=function(e){return c.template(e,t)},t},l=p();return l.create=p,l}(i,t,s,e,n),o=function(t){"use strict";var e=t,s={ProgramNode:function(t,e,i){this.type="program",this.statements=t,this.strip={},i?(this.inverse=new s.ProgramNode(i,e),this.strip.right=e.left):e&&(this.strip.left=e.right)},MustacheNode:function(t,e,s,i){if(this.type="mustache",this.hash=e,this.strip=i,null!=s&&s.charAt){var n=s.charAt(3)||s.charAt(2);this.escaped="{"!==n&&"&"!==n}else this.escaped=!!s;var r=this.id=t[0],o=this.params=t.slice(1),a=this.eligibleHelper=r.isSimple;this.isHelper=a&&(o.length||e)},PartialNode:function(t,e,s){this.type="partial",this.partialName=t,this.context=e,this.strip=s},BlockNode:function(t,s,i,n){if(t.id.original!==n.path.original)throw new e(t.id.original+" doesn't match "+n.path.original);this.type="block",this.mustache=t,this.program=s,this.inverse=i,this.strip={left:t.strip.left,right:n.strip.right},(s||i).strip.left=t.strip.right,(i||s).strip.right=n.strip.left,i&&!s&&(this.isInverse=!0)},ContentNode:function(t){this.type="content",this.string=t},HashNode:function(t){this.type="hash",this.pairs=t},IdNode:function(t){this.type="ID";for(var s="",i=[],n=0,r=0,o=t.length;r<o;r++){var a=t[r].part;if(s+=(t[r].separator||"")+a,".."===a||"."===a||"this"===a){if(i.length>0)throw new e("Invalid path: "+s);".."===a?n++:this.isScoped=!0}else i.push(a)}this.original=s,this.parts=i,this.string=i.join("."),this.depth=n,this.isSimple=1===t.length&&!this.isScoped&&0===n,this.stringModeValue=this.string},PartialNameNode:function(t){this.type="PARTIAL_NAME",this.name=t.original},DataNode:function(t){this.type="DATA",this.id=t},StringNode:function(t){this.type="STRING",this.original=this.string=this.stringModeValue=t},IntegerNode:function(t){this.type="INTEGER",this.original=this.integer=t,this.stringModeValue=Number(t)},BooleanNode:function(t){this.type="BOOLEAN",this.bool=t,this.stringModeValue="true"===t},CommentNode:function(t){this.type="comment",this.comment=t}};return s}(s),a=function(t,e){"use strict";var s={},i=t,n=e;return s.parser=i,s.parse=function(t){return t.constructor===n.ProgramNode?t:(i.yy=n,i.parse(t))},s}(function(){"use strict";return function(){var t={trace:function(){},yy:{},symbols_:{error:2,root:3,statements:4,EOF:5,program:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,CLOSE_UNESCAPED:24,OPEN_PARTIAL:25,partialName:26,partial_option0:27,inMustache_repetition0:28,inMustache_option0:29,dataName:30,param:31,STRING:32,INTEGER:33,BOOLEAN:34,hash:35,hash_repetition_plus0:36,hashSegment:37,ID:38,EQUALS:39,DATA:40,pathSegments:41,SEP:42,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",38:"ID",39:"EQUALS",40:"DATA",42:"SEP"},productions_:[0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[35,1],[37,3],[26,1],[26,1],[26,1],[30,2],[21,1],[41,3],[41,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[36,1],[36,2]],performAction:function(t,s,i,n,r,o,a){var h=o.length-1;switch(r){case 1:return new n.ProgramNode(o[h-1]);case 2:return new n.ProgramNode([]);case 3:this.$=new n.ProgramNode([],o[h-1],o[h]);break;case 4:this.$=new n.ProgramNode(o[h-2],o[h-1],o[h]);break;case 5:this.$=new n.ProgramNode(o[h-1],o[h],[]);break;case 6:this.$=new n.ProgramNode(o[h]);break;case 7:case 8:this.$=new n.ProgramNode([]);break;case 9:case 46:this.$=[o[h]];break;case 10:o[h-1].push(o[h]),this.$=o[h-1];break;case 11:this.$=new n.BlockNode(o[h-2],o[h-1].inverse,o[h-1],o[h]);break;case 12:this.$=new n.BlockNode(o[h-2],o[h-1],o[h-1].inverse,o[h]);break;case 13:case 14:case 26:case 30:this.$=o[h];break;case 15:this.$=new n.ContentNode(o[h]);break;case 16:this.$=new n.CommentNode(o[h]);break;case 17:case 18:case 20:case 21:this.$=new n.MustacheNode(o[h-1][0],o[h-1][1],o[h-2],e(o[h-2],o[h]));break;case 19:this.$={path:o[h-1],strip:e(o[h-2],o[h])};break;case 22:this.$=new n.PartialNode(o[h-2],o[h-1],e(o[h-3],o[h]));break;case 23:this.$=e(o[h-1],o[h]);break;case 24:this.$=[[o[h-2]].concat(o[h-1]),o[h]];break;case 25:this.$=[[o[h]],null];break;case 27:this.$=new n.StringNode(o[h]);break;case 28:this.$=new n.IntegerNode(o[h]);break;case 29:this.$=new n.BooleanNode(o[h]);break;case 31:this.$=new n.HashNode(o[h]);break;case 32:this.$=[o[h-2],o[h]];break;case 33:this.$=new n.PartialNameNode(o[h]);break;case 34:this.$=new n.PartialNameNode(new n.StringNode(o[h]));break;case 35:this.$=new n.PartialNameNode(new n.IntegerNode(o[h]));break;case 36:this.$=new n.DataNode(o[h]);break;case 37:this.$=new n.IdNode(o[h]);break;case 38:o[h-2].push({part:o[h],separator:o[h-1]}),this.$=o[h-2];break;case 39:this.$=[{part:o[h]}];break;case 42:this.$=[];break;case 43:case 47:o[h-1].push(o[h])}},table:[{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:29,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:30,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:31,21:24,30:25,38:[1,28],40:[1,27],41:26},{21:33,26:32,32:[1,34],33:[1,35],38:[1,28],41:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,38:[1,28],40:[1,27],41:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,42],24:[2,42],28:43,32:[2,42],33:[2,42],34:[2,42],38:[2,42],40:[2,42]},{18:[2,25],24:[2,25]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],38:[2,37],40:[2,37],42:[1,44]},{21:45,38:[1,28],41:26},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],38:[2,39],40:[2,39],42:[2,39]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,40],21:50,27:49,38:[1,28],41:26},{18:[2,33],38:[2,33]},{18:[2,34],38:[2,34]},{18:[2,35],38:[2,35]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,38:[1,28],41:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,44],21:56,24:[2,44],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:55,36:61,37:62,38:[1,63],40:[1,27],41:26},{38:[1,64]},{18:[2,36],24:[2,36],32:[2,36],33:[2,36],34:[2,36],38:[2,36],40:[2,36]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,65]},{18:[2,41]},{18:[1,66]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24]},{18:[2,43],24:[2,43],32:[2,43],33:[2,43],34:[2,43],38:[2,43],40:[2,43]},{18:[2,45],24:[2,45]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],38:[2,26],40:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],38:[2,27],40:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],38:[2,28],40:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],38:[2,29],40:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],38:[2,30],40:[2,30]},{18:[2,31],24:[2,31],37:67,38:[1,68]},{18:[2,46],24:[2,46],38:[2,46]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],38:[2,39],39:[1,69],40:[2,39],42:[2,39]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],38:[2,38],40:[2,38],42:[2,38]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{18:[2,47],24:[2,47],38:[2,47]},{39:[1,69]},{21:56,30:60,31:70,32:[1,57],33:[1,58],34:[1,59],38:[1,28],40:[1,27],41:26},{18:[2,32],24:[2,32],38:[2,32]}],defaultActions:{3:[2,2],16:[2,1],50:[2,41]},parseError:function(t,e){throw new Error(t)},parse:function(t){var e=this,s=[0],i=[null],n=[],r=this.table,o="",a=0,h=0,c=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,void 0===this.lexer.yylloc&&(this.lexer.yylloc={});var p=this.lexer.yylloc;n.push(p);var l=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var u,f,d,g,m,y,v,k,S,x,b={};;){if(d=s[s.length-1],this.defaultActions[d]?g=this.defaultActions[d]:(null==u&&(x=void 0,"number"!=typeof(x=e.lexer.lex()||1)&&(x=e.symbols_[x]||x),u=x),g=r[d]&&r[d][u]),void 0===g||!g.length||!g[0]){var E="";if(!c){for(y in S=[],r[d])this.terminals_[y]&&y>2&&S.push("'"+this.terminals_[y]+"'");E=this.lexer.showPosition?"Parse error on line "+(a+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[u]||u)+"'":"Parse error on line "+(a+1)+": Unexpected "+(1==u?"end of input":"'"+(this.terminals_[u]||u)+"'"),this.parseError(E,{text:this.lexer.match,token:this.terminals_[u]||u,line:this.lexer.yylineno,loc:p,expected:S})}}if(g[0]instanceof Array&&g.length>1)throw new Error("Parse Error: multiple actions possible at state: "+d+", token: "+u);switch(g[0]){case 1:s.push(u),i.push(this.lexer.yytext),n.push(this.lexer.yylloc),s.push(g[1]),u=null,f?(u=f,f=null):(h=this.lexer.yyleng,o=this.lexer.yytext,a=this.lexer.yylineno,p=this.lexer.yylloc,c>0&&c--);break;case 2:if(v=this.productions_[g[1]][1],b.$=i[i.length-v],b._$={first_line:n[n.length-(v||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(v||1)].first_column,last_column:n[n.length-1].last_column},l&&(b._$.range=[n[n.length-(v||1)].range[0],n[n.length-1].range[1]]),void 0!==(m=this.performAction.call(b,o,h,a,this.yy,g[1],i,n)))return m;v&&(s=s.slice(0,-1*v*2),i=i.slice(0,-1*v),n=n.slice(0,-1*v)),s.push(this.productions_[g[1]][0]),i.push(b.$),n.push(b._$),k=r[s[s.length-2]][s[s.length-1]],s.push(k);break;case 3:return!0}}return!0}};function e(t,e){return{left:"~"===t.charAt(2),right:"~"===e.charAt(0)||"~"===e.charAt(1)}}var s=function(){var t={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,s=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),s.length-1&&(this.yylineno-=s.length-1);var n=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:s?(s.length===i.length?this.yylloc.first_column:0)+i[i.length-s.length].length-s[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[n[0],n[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;var t,e,s,i,n;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),o=0;o<r.length&&(!(s=this._input.match(this.rules[r[o]]))||e&&!(s[0].length>e[0].length)||(e=s,i=o,this.options.flex));o++);return e?((n=e[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,r[i],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t||void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return void 0!==t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)},options:{},performAction:function(t,e,s,i){function n(t,s){return e.yytext=e.yytext.substr(t,e.yyleng-s)}switch(s){case 0:if("\\\\"===e.yytext.slice(-2)?(n(0,1),this.begin("mu")):"\\"===e.yytext.slice(-1)?(n(0,1),this.begin("emu")):this.begin("mu"),e.yytext)return 14;break;case 1:return 14;case 2:return this.popState(),14;case 3:return n(0,4),this.popState(),15;case 4:return 25;case 5:return 16;case 6:return 20;case 7:case 8:return 19;case 9:return 23;case 10:case 13:return 22;case 11:this.popState(),this.begin("com");break;case 12:return n(3,5),this.popState(),15;case 14:return 39;case 15:case 16:case 27:return 38;case 17:return 42;case 18:break;case 19:return this.popState(),24;case 20:return this.popState(),18;case 21:return e.yytext=n(1,2).replace(/\\"/g,'"'),32;case 22:return e.yytext=n(1,2).replace(/\\'/g,"'"),32;case 23:return 40;case 24:case 25:return 34;case 26:return 33;case 28:return e.yytext=n(1,2),38;case 29:return"INVALID";case 30:return 5}},rules:[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s])))/,/^(?:false(?=([~}\s])))/,/^(?:-?[0-9]+(?=([~}\s])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],conditions:{mu:{rules:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[3],inclusive:!1},INITIAL:{rules:[0,1,30],inclusive:!0}}};return t}();function i(){this.yy={}}return t.lexer=s,i.prototype=t,t.Parser=i,new i}()}(),o),h=function(t){"use strict";var e=t.COMPILER_REVISION,s=t.REVISION_CHANGES,i=t.log;function n(t){this.value=t}function r(){}r.prototype={nameLookup:function(t,e){var s,i;return 0===t.indexOf("depth")&&(s=!0),i=/^[0-9]+$/.test(e)?t+"["+e+"]":r.isValidJavaScriptVariableName(e)?t+"."+e:t+"['"+e+"']",s?"("+t+" && "+i+")":i},compilerInfo:function(){return"this.compilerInfo = ["+e+",'"+s[e]+"'];\n"},appendToBuffer:function(t){return this.environment.isSimple?"return "+t+";":{appendToBuffer:!0,content:t,toString:function(){return"buffer += "+t+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(t,e,s,n){this.environment=t,this.options=e||{},i("debug",this.environment.disassemble()+"\n\n"),this.name=this.environment.name,this.isChild=!!s,this.context=s||{programs:[],environments:[],aliases:{}},this.preamble(),this.stackSlot=0,this.stackVars=[],this.registers={list:[]},this.compileStack=[],this.inlineStack=[],this.compileChildren(t,e);var r,o=t.opcodes;this.i=0;for(var a=o.length;this.i<a;this.i++)"DECLARE"===(r=o[this.i]).opcode?this[r.name]=r.value:this[r.opcode].apply(this,r.args),r.opcode!==this.stripNext&&(this.stripNext=!1);return this.pushSource(""),this.createFunctionContext(n)},preamble:function(){var t=[];if(this.isChild)t.push("");else{var e=this.namespace,s="helpers = this.merge(helpers, "+e+".helpers);";this.environment.usePartial&&(s=s+" partials = this.merge(partials, "+e+".partials);"),this.options.data&&(s+=" data = data || {};"),t.push(s)}this.environment.isSimple?t.push(""):t.push(", buffer = "+this.initializeBuffer()),this.lastContext=0,this.source=t},createFunctionContext:function(t){var e=this.stackVars.concat(this.registers.list);if(e.length>0&&(this.source[1]=this.source[1]+", "+e.join(", ")),!this.isChild)for(var s in this.context.aliases)this.context.aliases.hasOwnProperty(s)&&(this.source[1]=this.source[1]+", "+s+"="+this.context.aliases[s]);this.source[1]&&(this.source[1]="var "+this.source[1].substring(2)+";"),this.isChild||(this.source[1]+="\n"+this.context.programs.join("\n")+"\n"),this.environment.isSimple||this.pushSource("return buffer;");for(var n=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"],r=0,o=this.environment.depths.list.length;r<o;r++)n.push("depth"+this.environment.depths.list[r]);var a=this.mergeSource();if(this.isChild||(a=this.compilerInfo()+a),t)return n.push(a),Function.apply(this,n);var h="function "+(this.name||"")+"("+n.join(",")+") {\n  "+a+"}";return i("debug",h+"\n\n"),h},mergeSource:function(){for(var t,e="",s=0,i=this.source.length;s<i;s++){var n=this.source[s];n.appendToBuffer?t=t?t+"\n    + "+n.content:n.content:(t&&(e+="buffer += "+t+";\n  ",t=void 0),e+=n+"\n  ")}return e},blockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t),this.replaceStack((function(e){return t.splice(1,0,e),"blockHelperMissing.call("+t.join(", ")+")"}))},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";var t=["depth0"];this.setupParams(0,t);var e=this.topStack();t.splice(1,0,e),t[t.length-1]="options",this.pushSource("if (!"+this.lastHelper+") { "+e+" = blockHelperMissing.call("+t.join(", ")+"); }")},appendContent:function(t){this.pendingContent&&(t=this.pendingContent+t),this.stripNext&&(t=t.replace(/^\s+/,"")),this.pendingContent=t},strip:function(){this.pendingContent&&(this.pendingContent=this.pendingContent.replace(/\s+$/,"")),this.stripNext="strip"},append:function(){this.flushInline();var t=this.popStack();this.pushSource("if("+t+" || "+t+" === 0) { "+this.appendToBuffer(t)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.context.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(t){this.lastContext!==t&&(this.lastContext=t)},lookupOnContext:function(t){this.push(this.nameLookup("depth"+this.lastContext,t,"context"))},pushContext:function(){this.pushStackLiteral("depth"+this.lastContext)},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"',this.replaceStack((function(t){return"typeof "+t+" === functionType ? "+t+".apply(depth0) : "+t}))},lookup:function(t){this.replaceStack((function(e){return e+" == null || "+e+" === false ? "+e+" : "+this.nameLookup(e,t,"context")}))},lookupData:function(){this.push("data")},pushStringParam:function(t,e){this.pushStackLiteral("depth"+this.lastContext),this.pushString(e),"string"==typeof t?this.pushString(t):this.pushStackLiteral(t)},emptyHash:function(){this.pushStackLiteral("{}"),this.options.stringParams&&(this.register("hashTypes","{}"),this.register("hashContexts","{}"))},pushHash:function(){this.hash={values:[],types:[],contexts:[]}},popHash:function(){var t=this.hash;this.hash=void 0,this.options.stringParams&&(this.register("hashContexts","{"+t.contexts.join(",")+"}"),this.register("hashTypes","{"+t.types.join(",")+"}")),this.push("{\n    "+t.values.join(",\n    ")+"\n  }")},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},push:function(t){return this.inlineStack.push(t),t},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},invokeHelper:function(t,e){this.context.aliases.helperMissing="helpers.helperMissing";var s=this.lastHelper=this.setupHelper(t,e,!0),i=this.nameLookup("depth"+this.lastContext,e,"context");this.push(s.name+" || "+i),this.replaceStack((function(t){return t+" ? "+t+".call("+s.callParams+") : helperMissing.call("+s.helperMissingParams+")"}))},invokeKnownHelper:function(t,e){var s=this.setupHelper(t,e);this.push(s.name+".call("+s.callParams+")")},invokeAmbiguous:function(t,e){this.context.aliases.functionType='"function"',this.pushStackLiteral("{}");var s=this.setupHelper(0,t,e),i=this.lastHelper=this.nameLookup("helpers",t,"helper"),n=this.nameLookup("depth"+this.lastContext,t,"context"),r=this.nextStack();this.pushSource("if ("+r+" = "+i+") { "+r+" = "+r+".call("+s.callParams+"); }"),this.pushSource("else { "+r+" = "+n+"; "+r+" = typeof "+r+" === functionType ? "+r+".call("+s.callParams+") : "+r+"; }")},invokePartial:function(t){var e=[this.nameLookup("partials",t,"partial"),"'"+t+"'",this.popStack(),"helpers","partials"];this.options.data&&e.push("data"),this.context.aliases.self="this",this.push("self.invokePartial("+e.join(", ")+")")},assignToHash:function(t){var e,s,i=this.popStack();this.options.stringParams&&(s=this.popStack(),e=this.popStack());var n=this.hash;e&&n.contexts.push("'"+t+"': "+e),s&&n.types.push("'"+t+"': "+s),n.values.push("'"+t+"': ("+i+")")},compiler:r,compileChildren:function(t,e){for(var s,i,n=t.children,r=0,o=n.length;r<o;r++){s=n[r],i=new this.compiler;var a=this.matchExistingProgram(s);null==a?(this.context.programs.push(""),a=this.context.programs.length,s.index=a,s.name="program"+a,this.context.programs[a]=i.compile(s,e,this.context),this.context.environments[a]=s):(s.index=a,s.name="program"+a)}},matchExistingProgram:function(t){for(var e=0,s=this.context.environments.length;e<s;e++){var i=this.context.environments[e];if(i&&i.equals(t))return e}},programExpression:function(t){if(this.context.aliases.self="this",null==t)return"self.noop";for(var e,s=this.environment.children[t],i=s.depths.list,n=[s.index,s.name,"data"],r=0,o=i.length;r<o;r++)1===(e=i[r])?n.push("depth0"):n.push("depth"+(e-1));return(0===i.length?"self.program(":"self.programWithDepth(")+n.join(", ")+")"},register:function(t,e){this.useRegister(t),this.pushSource(t+" = "+e+";")},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},pushStackLiteral:function(t){return this.push(new n(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),t&&this.source.push(t)},pushStack:function(t){this.flushInline();var e=this.incrStack();return t&&this.pushSource(e+" = "+t+";"),this.compileStack.push(e),e},replaceStack:function(t){var e,s="",i=this.isInline();if(i){var r=this.popStack(!0);if(r instanceof n)e=r.value;else{var o=this.stackSlot?this.topStackName():this.incrStack();s="("+this.push(o)+" = "+r+"),",e=this.topStack()}}else e=this.topStack();var a=t.call(this,e);return i?((this.inlineStack.length||this.compileStack.length)&&this.popStack(),this.push("("+s+a+")")):(/^stack/.test(e)||(e=this.nextStack()),this.pushSource(e+" = ("+s+a+");")),e},nextStack:function(){return this.pushStack()},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;if(t.length){this.inlineStack=[];for(var e=0,s=t.length;e<s;e++){var i=t[e];i instanceof n?this.compileStack.push(i):this.pushStack(i)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),s=(e?this.inlineStack:this.compileStack).pop();return!t&&s instanceof n?s.value:(e||this.stackSlot--,s)},topStack:function(t){var e=this.isInline()?this.inlineStack:this.compileStack,s=e[e.length-1];return!t&&s instanceof n?s.value:s},quotedString:function(t){return'"'+t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},setupHelper:function(t,e,s){var i=[];return this.setupParams(t,i,s),{params:i,name:this.nameLookup("helpers",e,"helper"),callParams:["depth0"].concat(i).join(", "),helperMissingParams:s&&["depth0",this.quotedString(e)].concat(i).join(", ")}},setupParams:function(t,e,s){var i,n,r,o=[],a=[],h=[];o.push("hash:"+this.popStack()),n=this.popStack(),((r=this.popStack())||n)&&(r||(this.context.aliases.self="this",r="self.noop"),n||(this.context.aliases.self="this",n="self.noop"),o.push("inverse:"+n),o.push("fn:"+r));for(var c=0;c<t;c++)i=this.popStack(),e.push(i),this.options.stringParams&&(h.push(this.popStack()),a.push(this.popStack()));return this.options.stringParams&&(o.push("contexts:["+a.join(",")+"]"),o.push("types:["+h.join(",")+"]"),o.push("hashContexts:hashContexts"),o.push("hashTypes:hashTypes")),this.options.data&&o.push("data:data"),o="{"+o.join(",")+"}",s?(this.register("options",o),e.push("options")):e.push(o),e.join(", ")}};for(var o="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),a=r.RESERVED_WORDS={},h=0,c=o.length;h<c;h++)a[o[h]]=!0;return r.isValidJavaScriptVariableName=function(t){return!(r.RESERVED_WORDS[t]||!/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(t))},r}(i),c=function(t,e,s,i){"use strict";var n={},r=t,o=e.parse,a=s,h=i;function c(){}return n.Compiler=c,c.prototype={compiler:c,disassemble:function(){for(var t,e,s,i=this.opcodes,n=[],r=0,o=i.length;r<o;r++)if("DECLARE"===(t=i[r]).opcode)n.push("DECLARE "+t.name+"="+t.value);else{e=[];for(var a=0;a<t.args.length;a++)"string"==typeof(s=t.args[a])&&(s='"'+s.replace("\n","\\n")+'"'),e.push(s);n.push(t.opcode+" "+e.join(" "))}return n.join("\n")},equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var s=0;s<e;s++){var i=this.opcodes[s],n=t.opcodes[s];if(i.opcode!==n.opcode||i.args.length!==n.args.length)return!1;for(var r=0;r<i.args.length;r++)if(i.args[r]!==n.args[r])return!1}if(e=this.children.length,t.children.length!==e)return!1;for(s=0;s<e;s++)if(!this.children[s].equals(t.children[s]))return!1;return!0},guid:0,compile:function(t,e){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=e;var s=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0},s)for(var i in s)this.options.knownHelpers[i]=s[i];return this.accept(t)},accept:function(t){var e,s=t.strip||{};return s.left&&this.opcode("strip"),e=this[t.type](t),s.right&&this.opcode("strip"),e},program:function(t){for(var e=t.statements,s=0,i=e.length;s<i;s++)this.accept(e[s]);return this.isSimple=1===i,this.depths.list=this.depths.list.sort((function(t,e){return t-e})),this},compileProgram:function(t){var e,s=(new this.compiler).compile(t,this.options),i=this.guid++;this.usePartial=this.usePartial||s.usePartial,this.children[i]=s;for(var n=0,r=s.depths.list.length;n<r;n++)(e=s.depths.list[n])<2||this.addDepth(e-1);return i},block:function(t){var e=t.mustache,s=t.program,i=t.inverse;s&&(s=this.compileProgram(s)),i&&(i=this.compileProgram(i));var n=this.classifyMustache(e);"helper"===n?this.helperMustache(e,s,i):"simple"===n?(this.simpleMustache(e),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("blockValue")):(this.ambiguousMustache(e,s,i),this.opcode("pushProgram",s),this.opcode("pushProgram",i),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(t){var e,s,i=t.pairs;this.opcode("pushHash");for(var n=0,r=i.length;n<r;n++)s=(e=i[n])[1],this.options.stringParams?(s.depth&&this.addDepth(s.depth),this.opcode("getContext",s.depth||0),this.opcode("pushStringParam",s.stringModeValue,s.type)):this.accept(s),this.opcode("assignToHash",e[0]);this.opcode("popHash")},partial:function(t){var e=t.partialName;this.usePartial=!0,t.context?this.ID(t.context):this.opcode("push","depth0"),this.opcode("invokePartial",e.name),this.opcode("append")},content:function(t){this.opcode("appendContent",t.string)},mustache:function(t){var e=this.options,s=this.classifyMustache(t);"simple"===s?this.simpleMustache(t):"helper"===s?this.helperMustache(t):this.ambiguousMustache(t),t.escaped&&!e.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousMustache:function(t,e,s){var i=t.id,n=i.parts[0],r=null!=e||null!=s;this.opcode("getContext",i.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",s),this.opcode("invokeAmbiguous",n,r)},simpleMustache:function(t){var e=t.id;"DATA"===e.type?this.DATA(e):e.parts.length?this.ID(e):(this.addDepth(e.depth),this.opcode("getContext",e.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperMustache:function(t,e,s){var i=this.setupFullMustacheParams(t,e,s),n=t.id.parts[0];if(this.options.knownHelpers[n])this.opcode("invokeKnownHelper",i.length,n);else{if(this.options.knownHelpersOnly)throw new Error("You specified knownHelpersOnly, but used the unknown helper "+n);this.opcode("invokeHelper",i.length,n)}},ID:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth),t.parts[0]?this.opcode("lookupOnContext",t.parts[0]):this.opcode("pushContext");for(var e=1,s=t.parts.length;e<s;e++)this.opcode("lookup",t.parts[e])},DATA:function(t){if(this.options.data=!0,t.id.isScoped||t.id.depth)throw new r("Scoped data references are not supported: "+t.original);this.opcode("lookupData");for(var e=t.id.parts,s=0,i=e.length;s<i;s++)this.opcode("lookup",e[s])},STRING:function(t){this.opcode("pushString",t.string)},INTEGER:function(t){this.opcode("pushLiteral",t.integer)},BOOLEAN:function(t){this.opcode("pushLiteral",t.bool)},comment:function(){},opcode:function(t){this.opcodes.push({opcode:t,args:[].slice.call(arguments,1)})},declare:function(t,e){this.opcodes.push({opcode:"DECLARE",name:t,value:e})},addDepth:function(t){if(isNaN(t))throw new Error("EWOT");0!==t&&(this.depths[t]||(this.depths[t]=!0,this.depths.list.push(t)))},classifyMustache:function(t){var e=t.isHelper,s=t.eligibleHelper,i=this.options;if(s&&!e){var n=t.id.parts[0];i.knownHelpers[n]?e=!0:i.knownHelpersOnly&&(s=!1)}return e?"helper":s?"ambiguous":"simple"},pushParams:function(t){for(var e,s=t.length;s--;)e=t[s],this.options.stringParams?(e.depth&&this.addDepth(e.depth),this.opcode("getContext",e.depth||0),this.opcode("pushStringParam",e.stringModeValue,e.type)):this[e.type](e)},setupMustacheParams:function(t){var e=t.params;return this.pushParams(e),t.hash?this.hash(t.hash):this.opcode("emptyHash"),e},setupFullMustacheParams:function(t,e,s){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",s),t.hash?this.hash(t.hash):this.opcode("emptyHash"),i}},n.precompile=function(t,e){if(null==t||"string"!=typeof t&&t.constructor!==h.ProgramNode)throw new r("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);"data"in(e=e||{})||(e.data=!0);var s=o(t),i=(new c).compile(s,e);return(new a).compile(i,e)},n.compile=function(t,e,s){if(null==t||"string"!=typeof t&&t.constructor!==h.ProgramNode)throw new r("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t);var i;function n(){var i=o(t),n=(new c).compile(i,e),r=(new a).compile(n,e,void 0,!0);return s.template(r)}return"data"in(e=e||{})||(e.data=!0),function(t,e){return i||(i=n()),i.call(this,t,e)}},n}(s,a,h,o),p=function(t,e,s,i,n){"use strict";var r=t,o=e,a=s.parser,h=s.parse,c=i.Compiler,p=i.compile,l=i.precompile,u=n,f=r.create,d=function(){var t=f();return t.compile=function(e,s){return p(e,s,t)},t.precompile=l,t.AST=o,t.Compiler=c,t.JavaScriptCompiler=u,t.Parser=a,t.parse=h,t};return(r=d()).create=d,r}(r,o,a,c,h);return p}();