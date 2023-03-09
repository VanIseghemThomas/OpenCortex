#!/bin/sh
# Currently the latest addin .deb package is corrupted. It is unable to be unpacked.
# This script is used to download the latest addin .deb package and install it.

##################################### Install Toolchain #############################
linux_addin_version=$1

linux_addin_link="https://download.analog.com/tools/LinuxAddInForCCES/Releases/Release_$linux_addin_version/adi-LinuxAddinForCCES-linux-x86-$linux_addin_version.deb"

echo "Start downloading linux-addin ($linux_addin_link)"
wget --quiet $linux_addin_link
echo "linux-addin download finished"
linux_addin_link=`basename $linux_addin_link`
linux_addin_name=`basename $linux_addin_link`


linux_addin_deb=$linux_addin_link
echo "Start to install $linux_addin_name, Installing..."
export DEBIAN_FRONTEND=noninteractive 
ls
echo "dpkg -i $linux_addin_deb"
dpkg -i $linux_addin_deb
echo "Finished, $linux_addin_name installed into PATH=/opt/analog/cces-linux-add-in/${linux_addin_vesion}/ARM/arm-none-eabi/bin/"
##########################################################################################

#####################  Get source codes(u-boot & buildroot) form linu-add-in  ############
echo "Start to unzip the source-code to workspace, Installing..."
source_code_path=$2
tar -zxvf /opt/analog/cces-linux-add-in/${linux_addin_version}/buildroot-sc5xx-${linux_addin_version}/src/buildroot-sc5xx-${linux_addin_version}.tar.gz -C ${source_code_path}
tar -zxvf /opt/analog/cces-linux-add-in/${linux_addin_version}/uboot-sc5xx-${linux_addin_version}/src/uboot-sc5xx-${linux_addin_version}.tar.gz -C ${source_code_path}
echo "Finished, source-code{uboot & buildroot} in the PATH=${source_code_path}"

#Apply the patch for automake of buildroot
echo "Apply the patch for automake of buildroot"
patch=$3
cp ${patch} ${source_code_path}/buildroot/package/automake/
##########################################################################################