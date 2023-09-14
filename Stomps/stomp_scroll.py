from stomp import StompCommand

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

selected_stomp = 1
while True:
    if(selected_stomp > 0 and selected_stomp < 10):
        if selected_stomp != 5:
            print "Switching stomp " + str(selected_stomp)
            switch_stomp(selected_stomp)
        selected_stomp = selected_stomp + 1
    else:
        selected_stomp = 1