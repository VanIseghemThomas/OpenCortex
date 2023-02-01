# A safe development environment

## Usage

### Building the container

Go into the QC-dev-environment directory and run:

```
docker build . -t <your-wanted-tag e.g. cortex-dev>
```

### Running the container

It needs to run privileged since we need to run the `mount` command inside it. You can run it without the `--privileged` path if you're not planning to mount the QC's file system and just want to compile something

```
docker run --privileged -it -p 5900:5900 -v <absolute-path-to-current-folder>/mount:/mnt cortex-dev
```

When attached to the docker container's shell, there is one post-install step left. Run the following command:

```
./init_system.sh
```

This will mount the QC filesystem and install a custom compiled version of QT inside it that has support for VNC.

