#!/bin/sh
if [ ! -d "/usr/src/app/test/files/sizes" ]; then
  mkdir /usr/src/app/test/files/sizes
  cd /usr/src/app/test/files/sizes
  dd if=/dev/zero of=5MB.bin bs=5000000 count=1
  dd if=/dev/zero of=20MB.bin bs=20000000 count=1
  dd if=/dev/zero of=300MB.bin bs=300000000 count=1
  dd if=/dev/zero of=4.2GB.bin bs=1000000 count=4200
  dd if=/dev/zero of=4.3GB.bin bs=1000000 count=4300
fi