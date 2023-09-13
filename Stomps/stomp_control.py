# Code copied to be easy to use as one script

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

# Open knob_stomp1 to 11, listen for numeric input and switch on input
dev_file_names = []
for i in range(1,12):
    dev_file_names.append('/dev/zencoder/knob_stomp' + str(i))

def switch_stomp(selected_stomp):
    with open(dev_file_names[selected_stomp-1], 'wb') as file:
        press_command = StompCommand("button", "pressed")
        file.write(press_command.raw_bytes)
        release_command = StompCommand("button", "released")
        file.write(release_command.raw_bytes)

while True:
    selected_stomp = int(input("Enter a stomp between 1 and 11: "))
    if(selected_stomp > 0 and selected_stomp < 12):
        print "Switching stomp " + str(selected_stomp)
        switch_stomp(selected_stomp)