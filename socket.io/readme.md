# Socket.IO
A couple years ago some early previews of websockerts came out to much fanfare and were well received by the development community. They provided a way to have serverside push technology and minimized the overhead of server/client communication.

Unfortunately not every browser yet supports websockets. That's where socket.io comes in. Socket.IO provides an abstraction layer on top of websockets with fallbacks for various browsers. Heck... you can even use it on IE 5.5 with the hidden iframe protocol.

Socket.io can both be ran as a seperate server or together with your existing http server. This is convenient because you can actually create a socket.io "service" that is usable from your existing web stack. I've even heard rumors of some people using socket.io together with grails! 

## Example: Date Notifier
In the example1 folder, check out the exampleServer.js and client.html Run exampleServer.js and open client.html up in your favorite browser.

## As Part of Your Existing Stack
As I mentioned previously, you can also use socket.io as part of your existing http server. just pass the http server instance to the listen method instead of a port number. See example2 for details.

## The Skinny
You can emit and listen for events between the client and server side. As you can see from the examples, this entails simply doing an emit on the client or server and handling the event on the other side of the wall.

In the connection callback, interactions with the socket object in this will result in communication with the client that initiated the connection. If you emit an event like this:

  io.sockets.emit('event', data);

You effectively broadcast that event to all connected clients. Again, this is the approach used in example2.

### Acknowledgements
Recent versions of socket.io also include built-in support for acknowledgements. If you include a function as the optional third parameter in an emit onthe client side it can be invoked from the server side. See example3.

   
## Exercise
For this final exercise we'll write a simplistic chat application. Don't worry too much about details like the name and such, we can just the socket.id as the username for now. 
