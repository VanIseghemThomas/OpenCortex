#!/bin/sh
# Original toolchain download is broken, debian package can't be unpacked.
# This is the /opt/analog folder from the debian package.
curl -LO https://www.roelj.com/qc/qc-compiler-toolchain.tar.gz
cd /
tar axvf $1/qc-compiler-toolchain.tar.gz