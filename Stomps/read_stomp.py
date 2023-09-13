# Quick and simple Python 2 script to read the raw bytes,
# from a stomp device on the Quad Cortex.

from datetime import datetime

class StompEvent:
    def __init__(self, raw_bytes):
        self.raw_bytes = raw_bytes
        self.action = "unknown"
        self.value = "unknown"
        self.system_epoch = datetime.now().strftime("%s")
        self.system_datetime = datetime.now()
        self.decode_bytes()

    def print_bytes(self):
        bytes_str = ""
        for i in range(len(self.raw_bytes)):
            bytes_str = bytes_str + self.raw_bytes[i].encode('hex') + ' '
        print bytes_str
        print '---'*32

    def decode_bytes(self):
        self.decode_action()
        self.decode_value()
        self.decode_time()

    def decode_action(self):
        action_byte_1 = self.raw_bytes[10].encode('hex')
        action_byte_2 = self.raw_bytes[11].encode('hex')
        if(action_byte_1 == "11" and action_byte_2 == "01"):
            self.action = "button"
        elif(action_byte_1 == "08" and action_byte_2 == "00"):
            self.action = "rotary"

    def decode_value(self):
        value_byte = self.raw_bytes[12].encode('hex')
        if(value_byte == "00"):
            self.value = "released"
        elif(value_byte == "01"):
            if(self.action == "button"):
                self.value = "pressed"
            elif(self.action == "rotary"):
                self.value = "clock wise"
        elif(value_byte == "ff"):
            self.value = "counter clock"

    def decode_time(self):
        # the first 4 bytes form the time
        time_bytes = self.raw_bytes[0:4]
        time_bytes.reverse()
        time_hex = ""
        for i in range(len(time_bytes)):
            time_hex = time_hex + time_bytes[i].encode('hex')
        self.epoch = int(time_hex, 16)
        self.date_time = datetime.fromtimestamp(self.epoch)

    def __str__(self):
        return "Action: " + self.action + "\nValue: " + self.value + "\nEpoch: " + str(self.epoch) + "\nDatetime: " + str(self.date_time)

with open('/dev/zencoder/knob_stomp2', 'rb') as file:
    byte_buffer = []
    while True:
        byte = file.read(1)
        if not byte:
            break

        byte_buffer.append(byte)
        if len(byte_buffer) is 32:
            event = StompEvent(byte_buffer)
            print event
            event.print_bytes()
            byte_buffer = []