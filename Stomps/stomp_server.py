'''
The MIT License (MIT)
Copyright (c) 2013 Dave P.
'''

import signal
import sys
import ssl
from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer, SimpleSSLWebSocketServer
from optparse import OptionParser
import json
from stomp_control import switch_stomp

class StompServer(WebSocket):

   # Request is a JSON object with the following fields:
   # {
   #    "type": "button",
   #    "action": "activate",
   #    "index": 1
   # }

   def handleMessage(self):
      print "Received" + self.data

      try:
         json_request = json.loads(self.data)
      except ValueError:
         self.sendMessage("Invalid request")
         return
      print "JSON request: " + str(json_request) + "\n Validating..."

      try:
         type = json_request['type']
         action = json_request['action']
         index = json_request['index']
      except:
         self.sendMessage("Invalid request")
         return
      
      print "Type: " + type + ", action: " + action + ", index: " + str(index)

      if type == 'button':
         if action == 'activate':
            switch_stomp(int(index))

      self.sendMessage("Success")

   def handleConnected(self):
      print (self.address, 'connected')

   def handleClose(self):
      print (self.address, 'closed')

   def validate_request(req):
      if not req:
         return False
      if not req['type']:
         return False
      if not req['action']:
         return False
      if not req['index']:
         return False
      
      if req['type'] != 'button' and req['type'] != 'rotary':
         return False
      if req['action'] != 'activate':
         return False
      if req['index'] < 1 or req['index'] > 11:
         return False
      return True


if __name__ == "__main__":
   parser = OptionParser(usage="usage: %prog [options]", version="%prog 1.0")
   parser.add_option("--host", default='', type='string', action="store", dest="host", help="hostname (localhost)")
   parser.add_option("--port", default=8000, type='int', action="store", dest="port", help="port (8000)")
   parser.add_option("--ssl", default=0, type='int', action="store", dest="ssl", help="ssl (1: on, 0: off (default))")
   parser.add_option("--cert", default='./cert.pem', type='string', action="store", dest="cert", help="cert (./cert.pem)")
   parser.add_option("--key", default='./key.pem', type='string', action="store", dest="key", help="key (./key.pem)")
   parser.add_option("--ver", default=ssl.PROTOCOL_TLSv1, type=int, action="store", dest="ver", help="ssl version")

   (options, args) = parser.parse_args()
   print "Starting server on port " + str(options.port)
   cls = StompServer

   if options.ssl == 1:
      server = SimpleSSLWebSocketServer(options.host, options.port, cls, options.cert, options.key, version=options.ver)
   else:
      server = SimpleWebSocketServer(options.host, options.port, cls)

   def close_sig_handler(signal, frame):
      server.close()
      sys.exit()

   signal.signal(signal.SIGINT, close_sig_handler)

   server.serveforever()
