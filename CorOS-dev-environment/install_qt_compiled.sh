#!/bin/bash
tar -xf qt-compiled-4.8.7.tar.gz
rm qt-compiled-4.8.7.tar.gz
# Then install it
cp -a QtEmbedded-4.8.7-arm/lib/. $QEMU_LD_PREFIX/usr/lib/
cp -a QtEmbedded-4.8.7-arm/bin/. $QEMU_LD_PREFIX/usr/bin/

QT_QWS_FONTDIR=$QEMU_LD_PREFIX/etc/fonts

mkdir -p $QEMU_LD_PREFIX/usr/local/Trolltech/QtEmbedded-4.8.7-arm/lib/fonts
ln -s $QT_QWS_FONTDIR $QEMU_LD_PREFIX/usr/local/Trolltech/QtEmbedded-4.8.7-arm/lib/fonts