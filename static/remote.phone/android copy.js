class RemoteAndroid {

   constructor(display_element, config_data, ws_socket_url) {
      this.type_client = "control";
      this.get_data = "base64";
      this.display_element = display_element;
      this.config_data = config_data;
      this.ws_socket_url = ws_socket_url;
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      this.display_id = this.display_create();
      this.image_id = `#image_${this.display_id}`;
      this.screen_id = `#screen_${this.display_id}`;
      this.screen_main_id = `#screen_main_${this.display_id}`;
      this.loader_id = `#loader_${this.display_id}`;
      this.bnt_menu = `#bnt_menu_${this.display_id}`;
      this.bnt_home = `#bnt_home_${this.display_id}`;
      this.bnt_back = `#bnt_back_${this.display_id}`;
      this.menu_bottom = `#android_menu_bottom_${this.display_id}`;
      this.ws_control = null;
      this.tapedTwice = 0;
   }

   ws_format(ws_path){
      var ss = window.location.protocol=="https:"?"wss":"ws";
      var edit_path = ss+"://"+ws_path;
      return edit_path;
   }

   json_send_format(json){
      json["type_client"] = this.type_client;
      json["device_id"] = this.config_data.device_id;
      return JSON.stringify(json);
   }

   display_create(){
      var id_devce = Math.floor(Math.random() * 999999999);
      var html = `
         <div id="screen_main_${id_devce}" class="screen_main" style="border:none;box-shadow:none">
            <div class="loader" id="loader_${id_devce}">
               <div class="loader-wheel"></div>
               <div class="loader-text"></div>
            </div>
            <div class="screen" id="screen_${id_devce}" tabindex="0" style="display:none">
               <img class="screen-img" id="image_${id_devce}" width="100%" draggable="false">
            </div>
            <div class="android-menu-bottom" id="android_menu_bottom_${id_devce}" style="display:none">
               <button type="button" id="bnt_menu_${id_devce}" class="android-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(120, 120, 120, 1);"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
               </button>
               <button type="button" id="bnt_home_${id_devce}" class="android-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(120, 120, 120, 1);"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg>
               </button>
               <button type="button" id="bnt_back_${id_devce}" class="android-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(120, 120, 120, 1);"><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></svg>
               </button>
            </div>
         </div>
         `
      jQuery(this.display_element).append(html);
      return id_devce;
   }
   
   control(){
      this.ws_control = new WebSocket(this.ws_format(this.ws_socket_url));
      var _this = this;
      this.ws_control.onopen = function() {
         console.log('Control connection');
         _this.ws_control.send(_this.json_send_format({
            "action":"connect",
            "passwd":_this.config_data.passwd,
            "get_data":_this.get_data
         }))

         jQuery(_this.bnt_menu).click(function(){
            _this.ws_control.send(_this.json_send_format({"action":"keyCode","key":187,"repeat":0,"meta_state":0}));
         })
         jQuery(_this.bnt_home).click(function(){
            _this.ws_control.send(_this.json_send_format({"action":"keyCode","key":3,"repeat":0,"meta_state":0}));
         })
         jQuery(_this.bnt_back).click(function(){
            _this.ws_control.send(_this.json_send_format({"action":"keyCode","key":4,"repeat":0,"meta_state":0}));
         })

         jQuery(_this.screen_id).on({
            keydown: function(e){
               var el = jQuery(this);
               _this.on_key_event(e,el,"ACTION_DOWN")
            },
            wheel: function(e){
               var el = jQuery(this);
               _this.on_wheel(e,el)
            }
         });

         if (_this.isMobile == true){
            jQuery(_this.screen_id).on({
               touchmove: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_MOVE")
               },
               touchstart: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_DOWN")
               },
               touchend: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_UP")
               }
            });
         }
         else{
            jQuery(_this.screen_id).on({
               mousemove: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_MOVE")
               },
               mouseup: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_UP")
               },
               mousedown: function(e){
                  var el = jQuery(this);
                  _this.on_mouse_event(e,el,"ACTION_DOWN")
               }
            });
         }
      };
      this.ws_control.onclose = function(evt) {
         console.log("Control closed:",evt);
      };
      this.ws_control.onerror = (error) => {
         console.error('Control error:', error);
      };
      this.ws_control.onmessage = function(evt) {
         var json_ = JSON.parse(evt.data);
         if(json_.action=="screen"){
            jQuery(_this.image_id).attr("src","data:image/png;base64,"+json_.base64);
         }
         if(json_.action=="copy"){
            console.log("copy text",json_.data)
            navigator.clipboard.writeText(json_.data);
         }
      };
   }

   list_no_send(key){
      var list_l = [
         "control",
         "shift",
         "capslock"
      ]
      return list_l.includes(key)
   }
   
   async map_key(e,action){
      var key = e.originalEvent.key.toLowerCase();
      var data = {
         "action":"keyText",
         "keyAction":action,
         "key":e.originalEvent.key,
         "repeat":0,
         "meta_state":0
      }
      if (this.list_no_send(key)==true){
         return null;
      }
      if(e.ctrlKey == true){
         if(key=="c"){
            data["type"] = "copy";
            data["action"] = "KEYCODE_COPY"
         }
         else if(key=="a"){
            data["type"] = "SelectAllText";
         }
         else if(key=="v"){
            data["type"] = "paste";
            data["key"] = await navigator.clipboard.readText();
         }
      }
      else if(key=="backspace"){
         data["action"] = "keyCode";
         data["key"] = 67
      }
      else if(key=="enter"){
         data["action"] = "keyCode";
         data["key"] = 66
      }
      else if(key=="tab"){
         data["action"] = "keyCode";
         data["key"] = 61
      }
      if(data.type == "keyText"){
         if(e.shiftKey == true){
            data["key"] = data.key.toUpperCase();
         }
      }
      return data;
   }
   
   async on_key_event(e,el,key_action){
      e.preventDefault();
      var data = await this.map_key(e,key_action);
      if(data){
         this.ws_control.send(this.json_send_format(data));
      }
      el.focus();
   }
   
   on_wheel(e,el){
      e.preventDefault();
      var delta = Math.sign(e.originalEvent.deltaY);
      var data = {
         "type":"wheel",
         "width":el.width(),
         "height":el.height(),
         "x":el.width()/2,
         "y":el.height()/2,
         "delta":delta
      }
      this.ws_control.send(this.json_send_format(data));
      el.focus();
   }
   
   on_mouse_event(e,el,action){
      e.preventDefault();
      var offset = el.offset();
      if(e.type.includes(`touch`)) {
         const { touches, changedTouches } = e.originalEvent ?? e;
         const touch = touches[0] ?? changedTouches[0];
         var x = touch.pageX - offset.left;
         var y = touch.pageY - offset.top;
      } else if (e.type.includes(`mouse`)) {
         var x = e.clientX - offset.left;
         var y = e.clientY - offset.top;
      }
      var data = {
         "action":"touch",
         "keyAction":action,
         "x":x,
         "y":y,
         "width":el.width(),
         "height":el.height()
      }
      this.ws_control.send(this.json_send_format(data));
      el.focus()
   }

   fix_size(){
      var screen_main = jQuery(this.screen_main_id);
      screen_main.attr("style","")
      jQuery(this.loader_id).remove();
      [this.screen_id,this.menu_bottom].map((item)=>{
         jQuery(item).show();
      })
      // var img_ = jQuery(this.screen_id);
      // var ratio = img_.width()/img_.height();
      // var ratio_width = window.innerHeight*ratio;
      // var fix_width = this.isMobile==true?30:30;
      // var to_width = ratio_width-fix_width;
      // screen_main.width(to_width);
   }
}

