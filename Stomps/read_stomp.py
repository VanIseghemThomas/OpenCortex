# Quick and simple Python 2 script to read the raw bytes,
# from a stomp device on the Quad Cortex.

from stomp import StompEvent

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