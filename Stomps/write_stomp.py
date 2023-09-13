# Quick and simple Python 2 script to write the raw bytes,
# to a stomp device on the Quad Cortex.

from datetime import datetime

class StompCommand:
    def __init__(self, action, value):
        self.action = action
        self.value = value
        self.raw_bytes = bytearray(32)
        self.encode_bytes()

    def encode_bytes(self):
        self.encode_time()
        self.encode_action()
        self.encode_value()
        self.build_last_16_bytes()

    def encode_time(self):
        epoch = datetime.now().strftime("%s")
        epoch_hex = hex(int(epoch))[2:]
        epoch_bytes = bytearray.fromhex(epoch_hex)
        epoch_bytes.reverse()
        for i in range(4):
            self.raw_bytes[i] = epoch_bytes[i]

    def encode_action(self):
        self.raw_bytes[9] = 0x00
        if(self.action == "button"):
            self.raw_bytes[8] = 0x01
            self.raw_bytes[10] = 0x11
            self.raw_bytes[11] = 0x01
        elif(self.action == "rotary"):
            self.raw_bytes[8] = 0x01
            self.raw_bytes[10] = 0x08
            self.raw_bytes[11] = 0x00

    def encode_value(self):
        if(self.value == "pressed"):
            self.raw_bytes[12] = 0x01
        elif(self.value == "released"):
            self.raw_bytes[12] = 0x00
        elif(self.value == "clock wise"):
            self.raw_bytes[12] = 0x01
        elif(self.value == "counter clock"):
            self.raw_bytes[12] = 0xff

    def build_last_16_bytes(self):
        # build the last 16 bytes
        for i in range(6):
            self.raw_bytes[16+i] = self.raw_bytes[i]

    def bytes_to_hex(self):
        bytes_str = ""
        for i in range(len(self.raw_bytes)):
            bytes_str = bytes_str + str(self.raw_bytes[i]) + ' '
        return bytes_str

    def __str__(self):
        return "Action: " + self.action + "\nValue: " + self.value + "\nBytes: " + self.bytes_to_hex()


with open('/dev/zencoder/knob_stomp2', 'wb') as file:
    # write a button press
    command = StompCommand("button", "pressed")
    print command
    file.write(command.raw_bytes)

    print ''

    # write a button release
    command = StompCommand("button", "released")
    print command
    file.write(command.raw_bytes)
    # close the file
    file.close()