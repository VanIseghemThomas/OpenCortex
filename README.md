# OpenCortex
Disclaimer: this is all pre-CorOS 3. Has not been updated past that, so milage may vary.

[![Discord Banner 1](https://discordapp.com/api/guilds/1064519311567360031/widget.png?style=banner2)](https://discord.gg/ef2gBDDSkm)

## A project that opens your Quad Cortex for homebrew software

Developing good software is hard, waiting for it might sometimes be equally as hard. With this project waiting might come to an end. Ever wondered: "A desktop file manager or editor might be useful"? You probably have at this point. The goal of OpenCortex is to open up the Quad Cortex and write the software as a community. This way we can get a taste of what is comming and maybe inspire new innovative features. Also if for some reason software support would be dropped , the maintenance could be continued by the community. It also drops the dependecy on the Cortex Cloud for preset sharing. For me personally, it's an awesome way to learn about embedded Linux and many more things.

Sadly we are not able to share all our discoveries. This because we are not trying to infirnge on NDSP's IP. At this point we pretty much know everthing there is to know about it, but some things are just not able to be made public. We will do our best to share the most we can, but there are boundaries to it.

### Disclaimer

I am not responsible for any damage that might be done to your unit, software. Doing this might have the potential to void your warranty. This is a project for enthousiasts who like to tinker like myself. I do not intend to cause any difficulties for NDSP / myself and will approach this from an ethical standpoint. I do not condone any misuse of this project. This is purely for educational and quality of life purposes only.

### To NDSP

**Here I want to make clear we are willing to go into open dialog and plan to be 100% transparent about everything as we strongly believe we can provide some very valuable knowledge and advise. This only benefits all of us, including the community, which is the #1 priority. If at any point this project steps over any line, feel free to contact us.**

## Table of contents

- [Summary](#summary)
- [Opening a shell and gaining root access](#opening-a-shell-and-gaining-root-access)
- [File access](#file-access)
- [Editing the default model names](docs/consumer/Model_Renamer.md)
- [External editor (VNC)](docs/consumer/VNC.md)
- [Developer Docs](docs/dev/README.md)

## Summary

### What is already possible (or in better terms discovered)

**For detailed research go to the [Dev Docs](docs/dev/README.md)**

Before I start of listing everything that is discovered, I want to make clear that this project has a small team and we're doing our best to do as much as possible in the time we've got available. A lot of things are still in progress but every day new things get discovered. There is a lot to look at and not everything can be done at the same time. we'll try to prioritise but roadblocks will be hit.

#### Currently Working Features

- Gaining persistent access over a network connection.
- Building an RDP solution to use the native CorOS UI live on your pc.
- Renaming the built in amps, pedals, etc. to whatever you like. (reboot required for changes to take effect)
- Getting access to your backup to keep it yourself.
- Deleting / adding presets from another device without reboot.
- Detecting preset switches and which one is loaded.
- Calibrating / testing the touchscreen
- Building a Discord server (lots of dev work is now done here)
- Captures are now solved. They can be decrypted using the [OpenCortex decryptor](https://vaniseghemthomas.github.io/OpenCortex/File-decryption/webapp/).

## Opening a shell and gaining root access

### Step 1: take out the SD-card

#### Before continuing make sure the QC is off and unplugged

To get access to the SD-card, you'll have to take of the back of the QC. This is easily done by unscrewing the 4 screws in the corners. Once open, you should see the SD-card in it's slot with a retainer around it. Unscrew the retainer to get access to the SD-card. Now you can push on the SD-card to get it out.

### Step 2: mounting the SD-card

**For this step it is useful to have a Linux system to work from.**
When plugging the SD-card into your PC running Windows, it will prompt you that the SD-card is broken and you should format it. **Do not do this!** The reason it does this, is because you're trying to read Linux filesystems that are not supported on Windows. There might be ways to get around that but I'd still recommend just using a Linux system (or a VM) to do this. The guide will continue with this assumption.

When plugging it into your PC running Linux, you should see 3 partitions being mounted in your file manager. With a bit of luck there might be 4.

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

## Step 4: prevent the sshd service from being terminated

Since the 2.0.3 update, there is an effort to stop people from connecting over SSH by disabling it in `/etc/init.d/S80drvinit` . But since it's probably used internally, they couldn't get rid of it.
To keep the sshd service enabled, add the following empty file: `/opt/neuraldsp/allow_sshd`. This can easily be done using the `touch` command.

### Step 5: persistent access

You are now able to connect to your QC using SSH as root! But you may find it won't work for you. SSH defaults to port 22, but the QC uses port `57284` for SSH. So to connect to your QC you can do the following:

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

### Step 6 (optional)

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

## Accessing your backup

Your backup is available as a compressed archive under `/media/p4/downloaded_backup.tar.gz`
It only contains your personal files such as captures, presets, ... It does not contain any system files, so it can't be modify
