# OpenCortex

[![Discord Banner 1](https://discordapp.com/api/guilds/1064519311567360031/widget.png?style=banner2)](https://discord.gg/ef2gBDDSkm)

## A project that opens your Quad Cortex for homebrew software

Developing good software is hard, waiting for it might sometimes be equally as hard. With this project waiting might come to an end. Ever wondered: "A desktop file manager or editor might be useful"? You probably have at this point. The goal of OpenCortex is to open up the Quad Cortex and write the software as a community. This way we can get a taste of what is comming and maybe inspire new innovative features. Also if for some reason software support would be dropped , the maintenance could be continued by the community. It also drops the dependecy on the Cortex Cloud for preset sharing. For me personally, it's an awesome way to learn about embedded Linux and many more things.

### Disclaimer

I am not responsible for any damage that might be done to your unit, software. Doing this might have the potential to void your warranty. This is a project for enthousiasts who like to tinker like myself. I do not intend to cause any difficulties for NDSP / myself and will approach this from an ethical standpoint. I do not condone any misuse of this project. This is purely for educational and quality of life purposes only.

### To NDSP

Unforunately it seems we got of on the wrong foot, for context I (Thomas) got banned on the Discord server for showing a 9 second clip of the RDP solution working and receiving a very positive reaction from the rest of the community. We respect the stance on the matter but not how it was handled. After all, no rules were breached.
**Here I want to make clear we are willing to go into open dialog and plan to be 100% transparent about everything as we strongly believe we can provide some very valuable knowledge and advise. This only benefits all of us, including the community, which is the #1 priority**

## Table of contents

- [Summary](https://github.com/VanIseghemThomas/OpenCortex#summary)

- [Opening a shell and gaining root access](https://github.com/VanIseghemThomas/OpenCortex#opening-a-shell-and-gaining-root-access)

- [File access](https://github.com/VanIseghemThomas/OpenCortex#file-access)

- [Editing the default model names](https://github.com/VanIseghemThomas/OpenCortex#editing-the-default-model-names)

- [External editor (VNC)](https://github.com/VanIseghemThomas/OpenCortex#external-editor-vnc)

## Summary

### What is already possible (or in better terms discovered)

Before I start of listing everything that is discovered, I want to make clear that this is currently a 2 man project and we're doing our best to do as much as possible in the time we've got available. A lot of things are still in progress but every day new things get discovered. There is a lot to look at and not everything can be done at the same time. we'll try to prioritise but roadblocks will be hit.

**Everything you see here is tested as working in practice.**

- Gaining persistent access over a network connection.

- Building an RDP solution to use the native CorOS UI live on your pc.

- Renaming the built in amps, pedals, etc. to whatever you like. (reboot required for changes to take effect)

- Getting access to your backup to keep it yourself.

- Deleting / adding presets from another device without reboot.

- Detecting preset switches and which one is loaded.

- Calibrating / testing the touchscreen

- Running a webserver

### Currently being worked on

- Building a Discord server

  - Free from any censorship about the QC

- Managing your files.

  - Manual backup management (Is it possible to load a backup saved externally? From what I've already seen, yes!)

  - Captures are currently unsolved. They seem to be encrypted (for good reasons) and I don't know (yet) how they are referenced inside presets. But since the contents aren't really relevant, I just need to find a way to reference the files correctly.

- Creating an external file manager

  - It is now possible to view the available presets given the XML file. In the future this will be fetched from an API running on the QC

- Creating an external editor

  - Preset file stucture is fully reverse-engineered.

  - Building the UI

  - Testing external editing of presets and it's limitations.

### Things that might work in the future

- Creating an external controller: it is possible to detect preset changes and which preset is currently loaded. This can be used together with MIDI commands to create a controller that could display the current preset (like the Kemper controller).

- Bluetooth: I've stumbled upon some references to bluetooth but haven't looked into it. As far as I know it doesn't have the hardware for it, but maybe it secretly does?

- USB connectivity: Haven't looked into this at all but this may end up in having some interesting things uncovered.

- Remote brightness control: saw some interesting references but haven't looked into it yet.

- SD-card upgrade: on paper, when partitioning the SD-card correctly and flashing those with the corresponding .img files (you can clone from the original), you should be able to

- Creating a OpenCortex update URL that can be accessed by the native update menu.

- Expanding preset slots

  - Got a pretty good idea how this can be done, still have to confirm it working.

## Opening a shell and gaining root access

### Step 1: take out the SD-card

Have you ever noticed that a Raspberry-Pi uses an SD-card to boot from, well the QC does pretty much the same in a bit more sophisticated way. I could go into detail how this works but that's for another section.

#### Before continuing make sure the QC is off and unplugged

To get access to the SD-card, you'll have to take of the back of the QC. This is easily done by unscrewing the 4 screws in the corners. Once open, you should see the SD-card in it's slot with a retainer around it. Unscrew the retainer to get access to the SD-card. Now you can push on the SD-card to get it out.

### Step 2: mounting the SD-card

**For this step it is useful to have a Linux system to work from.**
When plugging the SD-card into your PC running Windows, it will prompt you that the SD-card is broken and you should format it. **Do not do this!** The reason it does this, is because you're trying to read Linux filesystems that are not supported on Windows. There might be ways to get around that but I'd still recommend just using a Linux system (or a VM) to do this. The guide will continue with this assumption.

When plugging it into your PC running Linux, you should see 3 partitions being mounted in your file manager. With a bit of luck there might be 4.

The SD-card does in fact contain 4 partitions:

```bash
        Device Boot      Start         End      Blocks  Id System
/dev/mmcblk0p1              33       32800     1048576  83 Linux
Partition 1 does not end on cylinder boundary
/dev/mmcblk0p2           32801       65568     1048576  83 Linux
Partition 2 does not end on cylinder boundary
/dev/mmcblk0p3           65569       67616       65536   c Win95 FAT32 (LBA)
Partition 3 does not end on cylinder boundary
/dev/mmcblk0p4           67617      973968    29003264  83 Linux
```

these are used for various things. The ones we are interested in, are the first 2. Upon closer investigation you will realize 2 things. They are Linux installs and they seem to be identical.

The partition we are interrested in, is the first one. This is the partition the QC will use to run it's software. The second one is for redundancy when something goes wrong in the update process from what I understand.

### Step 2.5: optional

**Recommended:** Clone the drive partitions as .img files in case something goes wrong.

**Not Recommended:** If you want to open up the QC and take out the SD-card everytime you want to change something, you can skip the next steps and go to _Editing the default model names_

## Step 3: swapping out the shadow file

Swap out the `/etc/shadow` file in with the one in this repository. This will change the root password to:

```bash
OpenCortex
```

You will be able to log in with this password when using SSH.

### Step 4: persistent access

You are now able to connect to your QC using SSH as root! Isn't that wonderfull! But you may find it won't work for you. No worries this is normal. SSH defaults to port 22. At some point, the QC actually had SSH running on the default port 22 (alongside FTP), but they got rid of those services. So I thought. After a little digging inside the SSH files, I figured out that they didn't get rid of SSH, but they just moved it to port `57284`.

So to connect to your QC you can do the following

_Ip address can be found under `settings -> Wi-Fi`_

```console
ssh root@<QC-ip-address> -p 57284
```

It will prompt you for your password and after that for a fingerprint, just type "yes", enter and:

```console
Welcome to
 _   _                      _  ______  ___________
| \ | |                    | | |  _  \/  ___| ___ \
|  \| | ___ _   _ _ __ __ _| | | | | |\ `--.| |_/ /
| . ` |/ _ \ | | | '__/ _` | | | | | | `--. \  __/
| |\  |  __/ |_| | | | (_| | | | |/ / /\__/ / |
\_| \_/\___|\__,_|_|  \__,_|_| |___/  \____/\_|
                                        Quad Cortex
#
```

#### BOOM WE'RE IN

Now time for some cleanup. Make sure to be responsible now.

### Step 5 (optional)

It is good practice to run the `passwd` command to change your password. Having default passwords is never a good idea.

## File access

Still looking for the best way to do this, currenly using the `scp` command to send and receive files from the QC.

Example usage:

### from PC to QC

```console
scp -P 57284 <QC-ip-address>:<file-path>
```

### from QC to PC

```console
scp <PC-ip-address>:<file-path>
```

## Editing the default model names

One thing bothering me (and I think a lot of other people) is the fact that companies like NDSP aren't allowed to ship their models under the real name it is based on. Luckly they keep track of it in the actual model list, but it isn't displayed to the user.

The models and their respective categories, names and parameters, are stored inside `/opt/neuraldsp/ModelRepo.xml`. In order to rename these files to the real deal, you've got a couple of options.

- Rename them manually inside the XML file

- Use the `model_renamer.py` script in this repo to generate the XML file

  - Usage:

  ```console
  python model_renamer.py <original-modelrepo> <output-file-path>
  ```

- Use the pre-generated XML file inside `Model Repositories` (make sure to match it to your CorOS verion)

Now replace the `ModelRepo.xml` file inside `/opt/neuraldsp` with the new file. Make sure this is called `ModelRepo.xml`.

Finally reboot your QC, now you should have all models (except captures) renamed to their real names.

![IMG20221218151130](https://user-images.githubusercontent.com/55881698/208303182-8554e62c-96a9-41f2-be0d-1f1f4f564506.jpg)

## External editor (VNC)

![image](https://user-images.githubusercontent.com/55881698/214691276-bbd161bf-eb72-4f96-87ec-aa4255c75e7e.png)

Since we've figured out how to cross-compile our own binaries, we were able to compile a VNC solution for the Quad Cortex.

The VNC server we compiled is based on [this project](https://github.com/ponty/framebuffer-vncserver). We had to modify the source code a bit to make it work with the touchscreen. But besides that, it is identical. This patch was necesarry because the touchscreen doesn't report it's width and height in a propper way.

**Note:** when connected to the QC over VNC, you might notice a dip in framerate on the device itself. This is normal. It is the device trying to encode the video feed and struggling.

_[Installer and auto-run on boot will be added later]_
_For now you can use it the manual way_

### Installation

In the `External VNC` folder you will find the files `qc_vnc` and `libvncserver.so.1`. Move these to the following locations on the QC:

- **qc_vnc:** `/bin`

- **libvncserver.so.1**: `/lib`

That's it. You can now start the server!

### Usage

```console
qc_vnc -f /dev/fb0 -t /dev/input/event0
```

## Accessing your backup

Your backup is available as a compressed archive under `/media/p4/downloaded_backup.tar.gz`
It only contains your personal files such as captures, presets, ... It does not contain any system files, so it can't be modify
