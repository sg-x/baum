var Gpio = require('onoff').Gpio,
  led = new Gpio(4, 'out');

var req_ip = function(req) {
        return ( req.headers["X-Forwarded-For"]
                                        || req.headers["x-forwarded-for"]
                                        || req.client.remoteAddress );
};

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
 

client.on('connect', function () {
  client.subscribe('treepilaur');
});


client.on('message', function (topic, message) {
	console.log(topic,message.toString());
	if(topic=="treepilaur"){
	 led.read(function(err,val){
        if(val==0){
         var stat=1;
        } else {
        var stat=0;
        }
        led.write(stat,function(){

        });

        });

   }
});

