# Code copied to be easy to use as one script
from stomp import StompCommand
    
def switch_stomp(selected_stomp):
    with open('/dev/zencoder/knob_stomp' + str(selected_stomp), 'wb') as file:
        press_command = StompCommand("button", "pressed")
        file.write(press_command.raw_bytes)
        release_command = StompCommand("button", "released")
        file.write(release_command.raw_bytes)

if __name__ == "__main__":
    while True:
        selected_stomp = int(input("Enter a stomp between 1 and 11: "))
        if(selected_stomp > 0 and selected_stomp < 12):
            print "Switching stomp " + str(selected_stomp)
            switch_stomp(selected_stomp)