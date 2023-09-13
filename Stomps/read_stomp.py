class StompEvent:
    def __init__(self, raw_bytes):
        self.raw_bytes = raw_bytes
        self.action = "unknown"
        self.value = "unknown"
        self.decode_bytes()

    def print_bytes(self):
        bytes_str = ""
        for i in range(len(self.raw_bytes)):
            bytes_str = bytes_str + self.raw_bytes[i].encode('hex') + ' '
        print bytes_str
        print '---'*32

    def decode_bytes(self):
        action_byte_1 = self.raw_bytes[10].encode('hex')
        action_byte_2 = self.raw_bytes[11].encode('hex')
        value_byte = self.raw_bytes[12].encode('hex')

        if(action_byte_1 == "11" and action_byte_2 == "01"):
            self.action = "button"
        elif(action_byte_1 == "08" and action_byte_2 == "00"):
            self.action = "rotary"

        if(value_byte == "00"):
            self.value = "released"
        elif(value_byte == "01"):
            if(self.action == "button"):
                self.value = "pressed"
            elif(self.action == "rotary"):
                self.value = "clock wise"
        elif(value_byte == "ff"):
            self.value = "counter clock"

    def __str__(self):
        return "Action: " + self.action + " | Value: " + self.value

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