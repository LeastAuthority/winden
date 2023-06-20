#!/bin/sh
if [ ! -d "./test/files/sizes" ]; then
  mkdir ./test/files/sizes
fi
cd ./test/files/sizes
dd if=/dev/zero of=5MB.bin bs=5000000 count=1
dd if=/dev/zero of=20MB.bin bs=20000000 count=1
