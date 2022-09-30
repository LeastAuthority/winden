#!/bin/sh
if [ ! -d "/usr/src/app/test/files/sizes" ]; then
  mkdir /usr/src/app/test/files/sizes
  cd /usr/src/app/test/files/sizes
  dd if=/dev/zero of=5MB bs=5000000 count=1
  dd if=/dev/zero of=20MB bs=20000000 count=1
fi
