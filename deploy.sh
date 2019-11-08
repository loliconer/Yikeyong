#! /bin/bash

rsync -avze "ssh -p 6666" --delete dist/ scott@112.74.83.47:~/Yikeyong
