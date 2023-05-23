#!/bin/bash
BLUE='\033[0;34m'  
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# echo the ascii art banner
echo -e "${YELLOW}"
echo "    ____                   ______           __             "
echo "   / __ \____  ___  ____  / ____/___  _____/ /____  _  __  "
echo "  / / / / __ \/ _ \/ __ \/ /   / __ \/ ___/ __/ _ \| |/_/  "
echo " / /_/ / /_/ /  __/ / / / /___/ /_/ / /  / /_/  __/>  <    "
echo " \____/ .___/\___/_/ /_/\____/\____/_/   \__/\___/_/|_|    "
echo "     /_/                       CorOS emulation environment "
echo -e "${NC}"

echo -e "${BLUE}========= Initializing CorOS emulation environment =========${NC}"

echo ""
echo -e "${YELLOW}[!]${NC} Mounting the QC-filesystem, this can take a couple of seconds..."
# Decompress archive and mount rootfs.ext3
gunzip -d -k /qc-fs/$UPDATE_FILE
# Run tar command on the decompressed file to extract the rootfs.ext3 file
# We need to remove the .gz extension from the file name
tar -xvf /qc-fs/${UPDATE_FILE::-3} -C /qc-fs-uncompressed
rm /qc-fs/${UPDATE_FILE::-3}

echo "Mounting rootfs.ext3"
mount -t ext4 /qc-fs-uncompressed/rootfs.ext3 $QEMU_LD_PREFIX
echo -e "${YELLOW}Mounting rootfs.ext3 finished!${NC}"
echo ""

# Promt the user to install custom QT
# if the user types "y" or "Y" then install custom QT
read -p "Do you want to install the custom compiled QT? (y/n) " -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${YELLOW}[!]${NC} Installing QT"
    cd /qt_src && ./install_qt_compiled.sh
    echo -e "${YELLOW}Installing QT finished${NC}"
fi
echo ""

# Prompt user to chroot into the $QEMU_LD_PREFIX directory
# if the user types "y" or "Y" then chroot into the $QEMU_LD_PREFIX directory
# otherwise exit the script
read -p "Do you want to chroot into the created QC-filesystem? (y/n) " -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "[->] Chrooting into $QEMU_LD_PREFIX"
    echo $(uname -a)
    echo ""
    chroot $QEMU_LD_PREFIX
fi
