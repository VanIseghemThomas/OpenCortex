# Updates

[Back to developer documentaion main page](README.md)

Infomation about the QCs update process, and how we can use it should be placed here.

## How it works

the update process first talks to an API to see if there's anything available and then downloads the update archive right

## Man In The Middle updates

SSL checks are disabled everywhere (in ZenUI too, not just the updater) ... this means that with some work we would have command execution on the unit without even opening it.
In the middle, we can literally patch (from any laptop on the same wifi) the update archive as it arrives, using t a transparent http proxy that gives you a scripting engine to modify buffers on the fly.

we could do something simple ... download the original update file, apply our changes to it, [bindiff](https://www.daemonology.net/bsdiff/) the two archives and just apply the binpatch on the https buffers

## Root Password

Root password hash: root:$1$ExCeUIRg$umMdl8bKzRutUtKGFhUg10:10933:0:99999:7:::
It is salted, and has not been cracked yet.
