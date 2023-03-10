# A safe development environment

## Usage

### Building the container

Go into the QC-dev-environment directory and run:

```
docker build . -t <your-wanted-tag e.g. cortex-dev>
```

### Getting the update file

The update process of the QC is done in 2 steps. First the download, after that the install. We can use this to our advantage to grab the actual update file. Once you downloaded the update **do not install it yet.** Get an SSH shell going and go to `/media/p4`. There you will find your update file. A registry of these file names is also available inside the `filesystems/README.md` of this folder.

You can use the `scp` tool to send this update file over to your system.

Once you've got the update file, you can put it inside the `filesystems` directory to mount to the docker container. Now you can use the update file to explore your QC (except for the user files), and even create custom update packages.

### Running the container

It needs to run privileged since we need to run the `mount` command inside it. You can run it without the `--privileged` path if you're not planning to mount the QC's file system and just want to compile something.

The `mount` folder is optional. But it's an easy way to get files from to host inside the container and vice versa.

```
docker run --privileged -it -p 5900:5900 \
    -v <absolute-path-to-current-folder>/mount:/mnt \
    -v <absolute-path-to-current-folder>/filesystems:/qc-fs \
    -e UPDATE_FILE=<update-file-name> \
    cortex-dev
```

Another way is to use `docker compose`. In the `docker-compose.yaml` file, all volumes are already defined. This means you only have to define the update file in the `environment` section.

To use this first run the service in detached mode

```
docker compose up -d
```

After that you can attach to the container using

```
docker compose exec cortex-dev /bin/bash
```

When attached to the docker container's shell, there is one post-install step left. Run the following command:

```
./init_system.sh
```

This will mount the QC filesystem and install a custom compiled version of QT inside it that has support for VNC.

To link QT to the right fonts folder, run:

```bash
export QT_QWS_FONTDIR=/etc/fonts
```

## Creating an update package

You can create a custom update package based on the mounted filesystem, by running the `update-builder.sh` script. This can be found in the root of the docker container. This way you can patch your update to include all mods and ssh access, without opening the QC up everytime.

The update file should be available on your host machine at `filesystems/update-opencortex.bin.gz`. You can validate the update file by mounting it as the actual update file using the `UPDATE_FILE` environment variable and running `init_system.sh`.


## Config for custom compiled QT

For running GUI applications such as `ZenUI` it is possible to output the video to a virtual device. One of these posibilities is a simple VNC server. To enable this ability I have compiled QT from source using the following config:

```
./configure -embedded arm -xplatform qws/linux-arm-gnueabi-g++ -nomake examples -nomake demos -opensource -qt-libtiff -qt-zlib -qt-libpng -qt-libmng -qt-libjpeg -optimized-qmake -qt-freetype -qt-gfx-vnc -no-webkit -no-javascript-jit -optimized-qmake -no-cups && make
```

