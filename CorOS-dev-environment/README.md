# A safe development environment

## Getting the update file

You can use the Python tool for downloading the latest firmware. You can find it in this repository under the `Firmware-download` folder. This will download the latest CorOS version from the official NeuralDSP server.

***[Alternative] The old way***

The update process of the QC is done in 2 steps. First the download, after that the install. We can use this to our advantage to grab the actual update file. Once you downloaded the update **do not install it yet.** Get an SSH shell going and go to `/media/p4`. There you will find your update file. A registry of these file names is also available inside the `filesystems/README.md` of this folder.

You can use the `scp` tool to send this update file over to your system.

Once you've got the update file, you can put it inside the `filesystems` directory to mount to the docker container. Now you can use the update file to explore your QC (except for the user files), and even create custom update packages.

## Running the container

**The easier** way is to use `docker compose`. In the `docker-compose.yaml` file, all volumes are already defined. This means you only have to define the update file in the `environment` section.

**[Click here for ARM and M1](#Running-On-M1)**

To use this first run the service in detached mode. **Make sure to build the CorOS-emulation container first if you want to use the CorOS-build-env one!**

```
docker compose up -d --build
```

After that you can attach to the container using Docker Desktop and running the `bash` command.

If Docker Desktop isn't your cup of tea, you can always do it the CLI way. First identify the container by running `docker ps` and look for your `opencortex/coros-<target>:latest` containers.

```
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS          PORTS     NAMES
e94bc7cd6045   opencortex/coros-emu:latest   "/bin/bash -c 'while…"   5 minutes ago    Up 5 minutes              coros-emulation-coros-emu-1
a81a4c3249c9   opencortex/coros-dev:latest   "/bin/bash -c 'while…"   41 minutes ago   Up 41 minutes             coros-build-env-coros-dev-1
```

Then you can attach to it by running
```
docker compose exec <NAME or CONTAINER ID> /bin/bash
```

### Initializing the environment

When attached to the docker container's shell, there is one post-install step left. Run the following command:

```
./init_system.sh
```

This will mount the QC filesystem and install a custom compiled version of QT inside it that has support for VNC.

To link QT to the right fonts folder, run:

```bash
export QT_QWS_FONTDIR=/etc/fonts
```

## Running On M1

To build the dev enviroment on M1 *you must enable Rosseta x86 Emulation* (Docker Desktop, Settings, In Development, Beta Features).
Then you have to pull, build and compose the container in seperate steps, adding the platform flag to each step.

Pull the base image:

```bash
docker pull docker.io/library/ubuntu:18.04 --platform linux/amd64
```

Build the cortex-dev image:

```bash
sudo docker build . --platform=linux/amd64 -t cortex-dev
```

Compose the container:

```bash
sudo docker compose up -d
```

## Creating an update package

You can create a custom update package based on the mounted filesystem, by running the `update-builder.sh` script. This can be found in the root of the docker container. This way you can patch your update to include all mods and ssh access, without opening the QC up everytime.

The update file should be available on your host machine at `filesystems/update-opencortex.bin.gz`. You can validate the update file by mounting it as the actual update file using the `UPDATE_FILE` environment variable and running `init_system.sh`.


## Config for custom compiled QT

For running GUI applications such as `ZenUI` it is possible to output the video to a virtual device. One of these posibilities is a simple VNC server. To enable this ability I have compiled QT from source using the following config:

```
./configure -embedded arm -xplatform qws/linux-arm-gnueabi-g++ -nomake examples -nomake demos -opensource -qt-libtiff -qt-zlib -qt-libpng -qt-libmng -qt-libjpeg -optimized-qmake -qt-freetype -qt-gfx-vnc -no-webkit -no-javascript-jit -optimized-qmake -no-cups && make
```

