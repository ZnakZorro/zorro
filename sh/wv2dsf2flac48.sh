#!/bin/bash
mkdir dsf
mkdir wv

for x in ./*.wv; do
	ls "$x"
	wvunpack "${x}" -o "${x::-3}".dsf
	ffmpeg -y -i "${x::-3}".dsf -c:a flac -ar 48000 "${x::-3}".flac -nostats -loglevel 0 -v quiet;
	mv -f -u "${x}" ./wv
	mv -f -u "${x::-3}".dsf ./dsf	
done


echo "===done====================================";
echo "=================done======================";
echo "===================================done====";
ls -al *.flac

