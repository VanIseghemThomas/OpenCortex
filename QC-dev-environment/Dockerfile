# Use official Ubuntu as our base# Use official Ubuntu as our base
FROM ubuntu:20.04

# Add required packages in the noninteractive mode
RUN apt-get -y update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y -q install curl net-tools build-essential minicom tftpd-hpa git-all subversion openssh-server ncurses-dev php gawk g++ m4 libncurses5-dev texinfo flex bison php-cli vim php-xml python-setuptools python-dev make unzip rsync cpio bc lib32z1 lib32stdc++6 qemu qemu-user-static

# Set the workspace in /sc5xx_dev
ARG WORK_PATH=/sc5xx_dev
RUN mkdir -p ${WORK_PATH}

# Set the path and name of Patch in /sc5xx_dev/linuxaddin-dockerfile/lib
ARG PATCH_PATH=${WORK_PATH}/lib
ARG PATCH=${PATCH_PATH}/0002-port-to-perl-5.22-and-later.patch

# Set the Version and Path of cces-linux-add-in.
ARG LINUX_ADDIN_VERSION="1.3.1"

# Working directory set to /sc5xx_dev
WORKDIR ${WORK_PATH}

# Copy the install_toolchain.sh to /sc5xx_dev
COPY install_toolchain.sh .

# Install the toolchain
RUN ./install_toolchain.sh ${WORK_PATH}

# # Set toolchain PATH for remote container
ENV PATH=${PATH}:/opt/analog/cces-linux-add-in/${LINUX_ADDIN_VERSION}/ARM/arm-linux-gnueabi/bin/
ENV QEMU_LD_PREFIX="/opt/analog/cces-linux-add-in/1.3.1/ARM/arm-linux-gnueabi/sysroot"

ENTRYPOINT ["/bin/bash"]