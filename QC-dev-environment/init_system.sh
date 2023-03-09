#!/bin/bash

# Decompress archive and mount rootfs.ext3
gunzip -d -k /qc-fs/$UPDATE_FILE
# Run tar command on the decompressed file to extract the rootfs.ext3 file
# We need to remove the .gz extension from the file name
tar -xvf /qc-fs/${UPDATE_FILE::-3} -C /qc-fs-uncompressed
rm /qc-fs/${UPDATE_FILE::-3}

echo "Mounting rootfs.ext3"
mount -t ext4 /qc-fs-uncompressed/rootfs.ext3 $QEMU_LD_PREFIX
echo "Mounting rootfs.ext3 finished"

# Promt the user to install custom QT
# if the user types "y" or "Y" then install custom QT
echo "Do you want to install the custom compiled QT? (y/n)"
echo ""
read -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing QT"
    cd /qt_src && ./install_qt_compiled.sh
    echo "Installing QT finished"
fi

# Prompt user to chroot into the $QEMU_LD_PREFIX directory
# if the user types "y" or "Y" then chroot into the $QEMU_LD_PREFIX directory
# otherwise exit the script
echo "Do you want to chroot into the created QC-filesystem? (y/n)"
echo ""
read -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "Chrooting into $QEMU_LD_PREFIX"
    chroot $QEMU_LD_PREFIX
fi
