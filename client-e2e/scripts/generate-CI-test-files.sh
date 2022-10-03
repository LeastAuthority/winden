#!/bin/sh
if [ ! -d "./test/files/sizes" ]; then
  mkdir ./test/files/sizes
  cd ./test/files/sizes
  dd if=/dev/zero of=5MB bs=5000000 count=1
  dd if=/dev/zero of=20MB bs=20000000 count=1
fi
