touch "$1/0-bytes"
dd if=/dev/zero of="$1/5MB" bs=5000000 count=1
dd if=/dev/zero of="$1/20MB" bs=20000000 count=1
dd if=/dev/zero of="$1/over-200MB" bs=200000001 count=1