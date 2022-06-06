#!/bin/sh
mkdir -p /usr/src/app/test/files/sizes
cd /usr/src/app/test/files/sizes
dd if=/dev/zero of=20MB bs=20000000 count=1
dd if=/dev/zero of=300MB bs=300000000 count=1
dd if=/dev/zero of=4.2GB bs=1000000 count=4200
dd if=/dev/zero of=4.3GB bs=1000000 count=4300