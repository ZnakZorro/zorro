#!/bin/bash
mkdir wav
for x in ./*.wav; do 
	ls "$x"
	ffmpeg -y -i "${x::-4}".wav -c:a flac -ar 92000 ./"${x::-4}".flac -nostats -loglevel 0 -v quiet; 
	#yes | mv -f "${x}" ./wav
	mv -f -u "${x}" ./wav
done
echo "===done====================================";
echo "=================done======================";
echo "===================================done====";
ls -al *.flac

#for filename in ./*; do
#    for ((i=0; i<=3; i++)); do
#        ls -l "$filename"
#    done
#done
