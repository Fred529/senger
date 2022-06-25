function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _extends(){return _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},_extends.apply(this,arguments)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,s=_getPrototypeOf(e);if(t){var i=_getPrototypeOf(this).constructor;n=Reflect.construct(s,arguments,i)}else n=s.apply(this,arguments);return _possibleConstructorReturn(this,n)}}var Connector=function(){function e(t){_classCallCheck(this,e),this._defaultOptions={auth:{headers:{}},authEndpoint:"/broadcasting/auth",broadcaster:"pusher",csrfToken:null,host:null,key:null,namespace:"App.Events"},this.setOptions(t),this.connect()}return _createClass(e,[{key:"setOptions",value:function(e){return this.options=_extends(this._defaultOptions,e),this.csrfToken()&&(this.options.auth.headers["X-CSRF-TOKEN"]=this.csrfToken()),e}},{key:"csrfToken",value:function(){var e;return"undefined"!=typeof window&&window.Laravel&&window.Laravel.csrfToken?window.Laravel.csrfToken:this.options.csrfToken?this.options.csrfToken:"undefined"!=typeof document&&"function"==typeof document.querySelector&&(e=document.querySelector('meta[name="csrf-token"]'))?e.getAttribute("content"):null}}]),e}(),Channel=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"listenForWhisper",value:function(e,t){return this.listen(".client-"+e,t)}},{key:"notification",value:function(e){return this.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",e)}},{key:"stopListeningForWhisper",value:function(e,t){return this.stopListening(".client-"+e,t)}}]),e}(),EventFormatter=function(){function e(t){_classCallCheck(this,e),this.setNamespace(t)}return _createClass(e,[{key:"format",value:function(e){return"."===e.charAt(0)||"\\"===e.charAt(0)?e.substr(1):(this.namespace&&(e=this.namespace+"."+e),e.replace(/\./g,"\\"))}},{key:"setNamespace",value:function(e){this.namespace=e}}]),e}(),PusherChannel=function(e){_inherits(n,Channel);var t=_createSuper(n);function n(e,s,i){var r;return _classCallCheck(this,n),(r=t.call(this)).name=s,r.pusher=e,r.options=i,r.eventFormatter=new EventFormatter(r.options.namespace),r.subscribe(),r}return _createClass(n,[{key:"subscribe",value:function(){this.subscription=this.pusher.subscribe(this.name)}},{key:"unsubscribe",value:function(){this.pusher.unsubscribe(this.name)}},{key:"listen",value:function(e,t){return this.on(this.eventFormatter.format(e),t),this}},{key:"listenToAll",value:function(e){var t=this;return this.subscription.bind_global((function(n,s){if(!n.startsWith("pusher:")){var i=t.options.namespace.replace(/\./g,"\\"),r=n.startsWith(i)?n.substring(i.length+1):"."+n;e(r,s)}})),this}},{key:"stopListening",value:function(e,t){return t?this.subscription.unbind(this.eventFormatter.format(e),t):this.subscription.unbind(this.eventFormatter.format(e)),this}},{key:"stopListeningToAll",value:function(e){return e?this.subscription.unbind_global(e):this.subscription.unbind_global(),this}},{key:"subscribed",value:function(e){return this.on("pusher:subscription_succeeded",(function(){e()})),this}},{key:"error",value:function(e){return this.on("pusher:subscription_error",(function(t){e(t)})),this}},{key:"on",value:function(e,t){return this.subscription.bind(e,t),this}}]),n}(),PusherPrivateChannel=function(e){_inherits(n,PusherChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"whisper",value:function(e,t){return this.pusher.channels.channels[this.name].trigger("client-".concat(e),t),this}}]),n}(),PusherEncryptedPrivateChannel=function(e){_inherits(n,PusherChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"whisper",value:function(e,t){return this.pusher.channels.channels[this.name].trigger("client-".concat(e),t),this}}]),n}(),PusherPresenceChannel=function(e){_inherits(n,PusherChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"here",value:function(e){return this.on("pusher:subscription_succeeded",(function(t){e(Object.keys(t.members).map((function(e){return t.members[e]})))})),this}},{key:"joining",value:function(e){return this.on("pusher:member_added",(function(t){e(t.info)})),this}},{key:"leaving",value:function(e){return this.on("pusher:member_removed",(function(t){e(t.info)})),this}},{key:"whisper",value:function(e,t){return this.pusher.channels.channels[this.name].trigger("client-".concat(e),t),this}}]),n}(),SocketIoChannel=function(e){_inherits(n,Channel);var t=_createSuper(n);function n(e,s,i){var r;return _classCallCheck(this,n),(r=t.call(this)).events={},r.listeners={},r.name=s,r.socket=e,r.options=i,r.eventFormatter=new EventFormatter(r.options.namespace),r.subscribe(),r}return _createClass(n,[{key:"subscribe",value:function(){this.socket.emit("subscribe",{channel:this.name,auth:this.options.auth||{}})}},{key:"unsubscribe",value:function(){this.unbind(),this.socket.emit("unsubscribe",{channel:this.name,auth:this.options.auth||{}})}},{key:"listen",value:function(e,t){return this.on(this.eventFormatter.format(e),t),this}},{key:"stopListening",value:function(e,t){return this.unbindEvent(this.eventFormatter.format(e),t),this}},{key:"subscribed",value:function(e){return this.on("connect",(function(t){e(t)})),this}},{key:"error",value:function(e){return this}},{key:"on",value:function(e,t){var n=this;return this.listeners[e]=this.listeners[e]||[],this.events[e]||(this.events[e]=function(t,s){n.name===t&&n.listeners[e]&&n.listeners[e].forEach((function(e){return e(s)}))},this.socket.on(e,this.events[e])),this.listeners[e].push(t),this}},{key:"unbind",value:function(){var e=this;Object.keys(this.events).forEach((function(t){e.unbindEvent(t)}))}},{key:"unbindEvent",value:function(e,t){this.listeners[e]=this.listeners[e]||[],t&&(this.listeners[e]=this.listeners[e].filter((function(e){return e!==t}))),t&&0!==this.listeners[e].length||(this.events[e]&&(this.socket.removeListener(e,this.events[e]),delete this.events[e]),delete this.listeners[e])}}]),n}(),SocketIoPrivateChannel=function(e){_inherits(n,SocketIoChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"whisper",value:function(e,t){return this.socket.emit("client event",{channel:this.name,event:"client-".concat(e),data:t}),this}}]),n}(),SocketIoPresenceChannel=function(e){_inherits(n,SocketIoPrivateChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"here",value:function(e){return this.on("presence:subscribed",(function(t){e(t.map((function(e){return e.user_info})))})),this}},{key:"joining",value:function(e){return this.on("presence:joining",(function(t){return e(t.user_info)})),this}},{key:"leaving",value:function(e){return this.on("presence:leaving",(function(t){return e(t.user_info)})),this}}]),n}(),NullChannel=function(e){_inherits(n,Channel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"subscribe",value:function(){}},{key:"unsubscribe",value:function(){}},{key:"listen",value:function(e,t){return this}},{key:"stopListening",value:function(e,t){return this}},{key:"subscribed",value:function(e){return this}},{key:"error",value:function(e){return this}},{key:"on",value:function(e,t){return this}}]),n}(),NullPrivateChannel=function(e){_inherits(n,NullChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"whisper",value:function(e,t){return this}}]),n}(),NullPresenceChannel=function(e){_inherits(n,NullChannel);var t=_createSuper(n);function n(){return _classCallCheck(this,n),t.apply(this,arguments)}return _createClass(n,[{key:"here",value:function(e){return this}},{key:"joining",value:function(e){return this}},{key:"leaving",value:function(e){return this}},{key:"whisper",value:function(e,t){return this}}]),n}(),PusherConnector=function(e){_inherits(n,Connector);var t=_createSuper(n);function n(){var e;return _classCallCheck(this,n),(e=t.apply(this,arguments)).channels={},e}return _createClass(n,[{key:"connect",value:function(){void 0!==this.options.client?this.pusher=this.options.client:this.pusher=new Pusher(this.options.key,this.options)}},{key:"listen",value:function(e,t,n){return this.channel(e).listen(t,n)}},{key:"channel",value:function(e){return this.channels[e]||(this.channels[e]=new PusherChannel(this.pusher,e,this.options)),this.channels[e]}},{key:"privateChannel",value:function(e){return this.channels["private-"+e]||(this.channels["private-"+e]=new PusherPrivateChannel(this.pusher,"private-"+e,this.options)),this.channels["private-"+e]}},{key:"encryptedPrivateChannel",value:function(e){return this.channels["private-encrypted-"+e]||(this.channels["private-encrypted-"+e]=new PusherEncryptedPrivateChannel(this.pusher,"private-encrypted-"+e,this.options)),this.channels["private-encrypted-"+e]}},{key:"presenceChannel",value:function(e){return this.channels["presence-"+e]||(this.channels["presence-"+e]=new PusherPresenceChannel(this.pusher,"presence-"+e,this.options)),this.channels["presence-"+e]}},{key:"leave",value:function(e){var t=this;[e,"private-"+e,"presence-"+e].forEach((function(e,n){t.leaveChannel(e)}))}},{key:"leaveChannel",value:function(e){this.channels[e]&&(this.channels[e].unsubscribe(),delete this.channels[e])}},{key:"socketId",value:function(){return this.pusher.connection.socket_id}},{key:"disconnect",value:function(){this.pusher.disconnect()}}]),n}(),SocketIoConnector=function(e){_inherits(n,Connector);var t=_createSuper(n);function n(){var e;return _classCallCheck(this,n),(e=t.apply(this,arguments)).channels={},e}return _createClass(n,[{key:"connect",value:function(){var e=this,t=this.getSocketIO();return this.socket=t(this.options.host,this.options),this.socket.on("reconnect",(function(){Object.values(e.channels).forEach((function(e){e.subscribe()}))})),this.socket}},{key:"getSocketIO",value:function(){if(void 0!==this.options.client)return this.options.client;if("undefined"!=typeof io)return io;throw new Error("Socket.io client not found. Should be globally available or passed via options.client")}},{key:"listen",value:function(e,t,n){return this.channel(e).listen(t,n)}},{key:"channel",value:function(e){return this.channels[e]||(this.channels[e]=new SocketIoChannel(this.socket,e,this.options)),this.channels[e]}},{key:"privateChannel",value:function(e){return this.channels["private-"+e]||(this.channels["private-"+e]=new SocketIoPrivateChannel(this.socket,"private-"+e,this.options)),this.channels["private-"+e]}},{key:"presenceChannel",value:function(e){return this.channels["presence-"+e]||(this.channels["presence-"+e]=new SocketIoPresenceChannel(this.socket,"presence-"+e,this.options)),this.channels["presence-"+e]}},{key:"leave",value:function(e){var t=this;[e,"private-"+e,"presence-"+e].forEach((function(e){t.leaveChannel(e)}))}},{key:"leaveChannel",value:function(e){this.channels[e]&&(this.channels[e].unsubscribe(),delete this.channels[e])}},{key:"socketId",value:function(){return this.socket.id}},{key:"disconnect",value:function(){this.socket.disconnect()}}]),n}(),NullConnector=function(e){_inherits(n,Connector);var t=_createSuper(n);function n(){var e;return _classCallCheck(this,n),(e=t.apply(this,arguments)).channels={},e}return _createClass(n,[{key:"connect",value:function(){}},{key:"listen",value:function(e,t,n){return new NullChannel}},{key:"channel",value:function(e){return new NullChannel}},{key:"privateChannel",value:function(e){return new NullPrivateChannel}},{key:"presenceChannel",value:function(e){return new NullPresenceChannel}},{key:"leave",value:function(e){}},{key:"leaveChannel",value:function(e){}},{key:"socketId",value:function(){return"fake-socket-id"}},{key:"disconnect",value:function(){}}]),n}(),Echo=function(){function e(t){_classCallCheck(this,e),this.options=t,this.connect(),this.options.withoutInterceptors||this.registerInterceptors()}return _createClass(e,[{key:"channel",value:function(e){return this.connector.channel(e)}},{key:"connect",value:function(){"pusher"==this.options.broadcaster?this.connector=new PusherConnector(this.options):"socket.io"==this.options.broadcaster?this.connector=new SocketIoConnector(this.options):"null"==this.options.broadcaster?this.connector=new NullConnector(this.options):"function"==typeof this.options.broadcaster&&(this.connector=new this.options.broadcaster(this.options))}},{key:"disconnect",value:function(){this.connector.disconnect()}},{key:"join",value:function(e){return this.connector.presenceChannel(e)}},{key:"leave",value:function(e){this.connector.leave(e)}},{key:"leaveChannel",value:function(e){this.connector.leaveChannel(e)}},{key:"listen",value:function(e,t,n){return this.connector.listen(e,t,n)}},{key:"private",value:function(e){return this.connector.privateChannel(e)}},{key:"encryptedPrivate",value:function(e){return this.connector.encryptedPrivateChannel(e)}},{key:"socketId",value:function(){return this.connector.socketId()}},{key:"registerInterceptors",value:function(){"function"==typeof Vue&&Vue.http&&this.registerVueRequestInterceptor(),"function"==typeof axios&&this.registerAxiosRequestInterceptor(),"function"==typeof jQuery&&this.registerjQueryAjaxSetup()}},{key:"registerVueRequestInterceptor",value:function(){var e=this;Vue.http.interceptors.push((function(t,n){e.socketId()&&t.headers.set("X-Socket-ID",e.socketId()),n()}))}},{key:"registerAxiosRequestInterceptor",value:function(){var e=this;axios.interceptors.request.use((function(t){return e.socketId()&&(t.headers["X-Socket-Id"]=e.socketId()),t}))}},{key:"registerjQueryAjaxSetup",value:function(){var e=this;void 0!==jQuery.ajax&&jQuery.ajaxPrefilter((function(t,n,s){e.socketId()&&s.setRequestHeader("X-Socket-Id",e.socketId())}))}}]),e}();
