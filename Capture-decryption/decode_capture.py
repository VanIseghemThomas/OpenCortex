import sys
import json
import google.protobuf.json_format as json_format
import Capture_pb2

if len(sys.argv) != 2:
    print(f"Usage: {sys.argv[0]} <protobuf_file>")
    sys.exit(1)

protobuf_file = sys.argv[1]

# Read the input protobuf from the file
with open(protobuf_file, "rb") as f:
    input_data = f.read()

# Parse the input protobuf into a message object
message = Capture_pb2.Capture()
message.ParseFromString(input_data)

# Convert the message object to a JSON string
json_string = json_format.MessageToJson(message)

# Print the JSON string to stdout
sys.stdout.write(json_string)
