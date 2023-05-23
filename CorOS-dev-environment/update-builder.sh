#!/bin/bash

# This script can be used to apply OpenCortex patches to a mounted QC file system
# And create a new update file from it

# This script is intended to be run from the QC-dev-environment directory
BLUE='\033[0;34m'  
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# echo the ascii art banner
echo -e "${YELLOW}"
echo -e "    ____                   ______           __             "
echo -e "   / __ \____  ___  ____  / ____/___  _____/ /____  _  __  "
echo -e "  / / / / __ \/ _ \/ __ \/ /   / __ \/ ___/ __/ _ \| |/_/  "
echo -e " / /_/ / /_/ /  __/ / / / /___/ /_/ / /  / /_/  __/>  <    "
echo -e " \____/ .___/\___/_/ /_/\____/\____/_/   \__/\___/_/|_|    "
echo -e "     /_/                       CorOS update builder        "
echo -e "${NC}"

echo "This tool can be used to create a new update file based on the mounted CorOS file system"

echo -e "${BLUE}========= OpenCortex Update Builder =========${NC}"

read -p "Do you want create a new update package from the current mounted CorOS? (y/n) " -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
    cd /qc-fs-uncompressed

    echo ""
    echo -e "${YELLOW}[!]${NC} Building update file..."
    echo ""
    tar cvf update-opencortex.bin rootfs.ext3 uImage zpu.dtb
    echo ""
    echo -e "${YELLOW}[!]${NC} Creating archive. This can take some seconds, please wait..."
    gzip -k update-opencortex.bin
    cp update-opencortex.bin.gz /qc-fs/update-opencortex.bin.gz
    echo ""
    echo -e "${BLUE}[+]${NC} Update file created: update-opencortex.bin.gz"
fi
echo ""
