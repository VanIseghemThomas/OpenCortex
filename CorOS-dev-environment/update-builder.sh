#!/bin/sh

# This script can be used to apply OpenCortex patches to a mounted QC file system
# And create a new update file from it

# This script is intended to be run from the QC-dev-environment directory
BLUE='\033[0;34m'  
NC='\033[0m' # No Color

echo "${BLUE}========= OpenCortex Update Builder =========${NC}"

cd /qc-fs-uncompressed

echo ""
echo "${BLUE}[+]${NC} Building update file..."
echo ""
tar cvf update-opencortex.bin rootfs.ext3 uImage zpu.dtb
echo ""
echo "This can take some seconds, please wait..."
gzip -k update-opencortex.bin
cp update-opencortex.bin.gz /qc-fs/update-opencortex.bin.gz
echo ""
echo "${BLUE}[+]${NC} Update file created: update-opencortex.bin.gz"