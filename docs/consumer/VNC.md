# External editor (VNC)

![image](https://user-images.githubusercontent.com/55881698/214691276-bbd161bf-eb72-4f96-87ec-aa4255c75e7e.png)

Since we've figured out how to cross-compile our own binaries, we were able to compile a VNC solution for the Quad Cortex. The VNC server we compiled is based on [this project](https://github.com/ponty/framebuffer-vncserver). We had to modify the source code a bit to make it work with the touchscreen, But besides that, it is identical.

**Note:** when connected to the QC over VNC, you might notice a dip in framerate on the device itself. This is normal. It is the device trying to encode the video feed and struggling.
**Note:** _Installer and auto-run on boot will be added later, For now you can use it the manual way_

## Installation

In the `External VNC` folder you will find the files `qc_vnc` and `libvncserver.so.1`. Move these to the following locations on the QC:

- **qc_vnc:** `/bin`
- **libvncserver.so.1**: `/lib`

That's it. You can now start the server!

## Usage

```console
qc_vnc -f /dev/fb0 -t /dev/input/event0
```
