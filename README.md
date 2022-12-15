# OpenCortex

## A project that opens your Quad Cortex for homebrew software.
Developing good software is hard, waiting for it might sometimes be equally as hard. With this project waiting might come to an end. Ever wondered: "A desktop file manager or editor might be useful"? You probably have at this point. The goal of OpenCortex is to open up the Quad Cortex and write the software as a community. This way we can get a taste of what is comming and maybe inspire new innovative features. Also if for some reason software support would be dropped , the maintenance could be continued by the community. It also drops the dependecy on the Cortex Cloud for preset sharing. For me personally, it's an awesome way to learn about embedded Linux and many more things.

## Disclaimer:
I am not responsible for any damage that might be done to your unit, software. Doing this might have the potential to void your warranty. This is a project for enthousiasts who like to tinker like myself. I do not intend to cause any difficulties for NDSP / myself and will approach this from an ethical standpoint. I do not condone any misuse of this project. This is purely for educational and quality of life purposes only.

## What is already possible (or in better terms discovered)

Before I start of listing everything that is discovered, I want to make clear that this is currently a 1 man project and I'm doing my best to do as much as possible in the time I've got available. A lot of things are still in progress but every day new things get discovered. There is a lot to look at and not everything can be done at the same time. I'll try to prioritise but roadblocks will be hit.

**Everything you see here is tested as working in practice.**

- Gaining persistent access over a network connection.

- Renaming the built in amps, pedals, etc. to whatever you like. (reboot required for changes to take effect)

- Getting access to your backup to keep it yourself.

- Deleting presets from another device (Does not yet update in the UI but I know why, still has to be confirmed working)

- Detecting preset changes and which one is loaded.

- Calibrating / testing the touchscreen


## Currently being worked on
- Managing your files.
    
    - Adding presets (should work the same as deleting)
    
    - Manual backup management (Is it possible to load a backup saved externally? From what I've already seen, yes!)

    - Captures are currently unsolved. They seem to be encrypted (for good reasons) and I don't know (yet) how they are referenced inside presets.


- Creating an external file manager

    - Once deleting and adding presets are confirmed working, an app (desktop/mobile) can be created to interface with it. In order to make that work, the firmware would need some additions to make that work. But that is totaly possible to make work.


- Creating an external editor
    
    - Preset file stucture is close to being fully reverse-engineered.
    
    - Testing external editing of presets and it's limitations.

    - Would depend on the external file manager.

    - Once all of this is finished, the app for can be built.

## Things that might work in the future
- Creating an external controller: it is possible to detect preset changes and which preset is currently loaded. This can be used together with MIDI commands to create a controller that could display the current preset (like the Kemper controller).

- Bluetooth: I've stumbled upon some references to bluetooth but haven't looked into it. As far as I know it doesn't have the hardware for it, but maybe it secretly does?

- USB connectivity: Haven't looked into this at all but this may end up in having some interesting things uncovered.

- Remote brightness control: saw some interesting references but haven't looked into it yet.


# Opening a shell and gaining root access

[Under construction, come back soon]


# Editing the default model names

[Under construction, come back soon]

