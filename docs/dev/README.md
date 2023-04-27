# Documentation of all the discoveries about Quad Cortex

## Table of Contents

[Back to Main README](../../README.md)

- [Decrypt Captures](Captures.md)
- [Custom DSP](DSP.md)
- [Live Update Patchers](Updates.md)

## General Info

### UI

Lots of stuff is a png and there are no vectors being used, its built on swapping pictures, And the setup is just a slideshow.
/usr/lib/libzenhal.so seems to be their library for interacting with things like footswitches/expression inputs/midi/encoder/touch screen/leds/etc.

## Misc Info

## Tools

Languages for the Project:

- Python - for simple Scripting
- Golang - for compiled binaries (like dsp)
  - Idealy Rust would be used, but it has a steep learning curve

Ghidra - a very powerful piece of kit brought to us by the NSA of all places.
use the string window to look for interesting stuff, click it, brings you to a function

[webSSH](https://github.com/billchurch/webssh2) our webpage could connect to ssh and just fetch the files by itself

## Hardware

The QC uses the Cortex-A5

That the QC uses [this for it's usb audio](https://www.thesycon.de/eng/u-hear-st.shtml)

## Files

Presents are unencrypted protobufs.
There are 16 different protobuf message types that we have the protobuf spec files for

Thomy - In the end it would be fun as a PoC if we were to make our own amp for the QC. "The OpenCortex Beast"
evilsocket - if we manage to understand how the dsp works, we can just rewrite ZenUI from scratch
Thomy — Lol you're crazy
evilsocket — yes
evilsocket — most of the logic is just to handle graphics and settings, the "core" logic is not that complex, and it's all in those LDR files
Thomy — Instead of "ZenUI" we call it "RelaxUI"
evilsocket — RaphaelUI
