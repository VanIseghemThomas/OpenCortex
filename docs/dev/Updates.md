# Updates

[Back to developer documentaion main page](README.md)

Infomation about the QCs update process, and how we can use it should be placed here.

## How it works

the update process first talks to an API to see if there's anything available and then downloads the update archive right

## Patching the update file for persistent access

(Coming soon)

## Man In The Middle updates

SSL checks are disabled for the updater (see `cloud_updater.py`)... this means that on paper, we could have command execution on the unit without even opening it.
In the middle, we can literally patch (from any device on the same network) the update archive as it arrives, using a transparent http proxy that gives you a scripting engine to modify buffers on the fly.

we could do something simple ... download the original update file, apply our changes to it, [bindiff](https://www.daemonology.net/bsdiff/) the two archives and just apply the binpatch on the https buffers
