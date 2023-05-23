# Slim Debian image with QEMU and dos2unix
FROM debian:buster-slim

# Add required packages in the noninteractive mode
RUN apt-get -y update && apt-get -y -q install dos2unix qemu qemu-user-static

# # Set toolchain PATH for remote container
RUN mkdir -p /opt/ARM/sysroot
ENV QEMU_LD_PREFIX="/opt/ARM/sysroot"

# Mounting the QC-rootfs
RUN mkdir qc-fs qc-fs-uncompressed qt_src

WORKDIR /qt_src
# # Copy and run the installer
COPY qt-compiled-4.8.7.tar.gz install_qt_compiled.sh .

WORKDIR /
COPY init_system.sh update-builder.sh .
RUN dos2unix init_system.sh update-builder.sh /qt_src/install_qt_compiled.sh

ENTRYPOINT ["/bin/bash"]
