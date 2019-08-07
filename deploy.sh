#! /bin/bash

rsync -avz -e "ssh 6666" --delete dist/ scott@112.74.83.47:~/Yikeyong
