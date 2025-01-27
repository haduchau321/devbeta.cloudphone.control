var ws_screen_s = []

var login_data =[
  {
    "action":"connect",
    "device_id":"85211126",
    "passwd":"1234",
    "type_client":"control",
    "get_data":"base64"
  },
  {
    "action":"connect",
    "device_id":"85211127",
    "passwd":"1234",
    "type_client":"control",
    "get_data":"base64"
  }
]

login_data.map((item,index)=>{
  var e = document.createElement('img');
  e.id = `screen-image-${index}`;
  e.style = "padding:5px"
  document.querySelector("#devices").appendChild(e)
  ws_screen_s[index] = new WebSocket("ws://192.168.0.103:8080");
  ws_screen_s[index].onopen = function() {
    console.log('Screen connection');
    ws_screen_s[index].send(JSON.stringify(item))
  }
  ws_screen_s[index].onmessage = function(evt) {
    var json_data = JSON.parse(evt.data)
    if(json_data.action=="screen"){
      document.getElementById(`screen-image-${index}`).src = "data:image/png;base64," + json_data.base64;
    }
  };
  document.getElementById(`screen-image-${index}`).addEventListener('click',function (){
    ws_screen_s[index].send(JSON.stringify({"action":"keycode","type_client":"control","device_id":item.device_id,"key":14}))
  })
})


