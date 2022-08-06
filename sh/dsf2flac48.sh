mkdir flac48
for x in ./*.dsf; do ffmpeg -i "${x::-4}".dsf -c:a flac -ar 48000 ./flac48/"${x::-4}".flac; done

#ffmpeg -i "03.dsf" -c:a flac -ar 96000 "03-96.flac"
#for x in ./*; do ls "${x}"; done
#for x in ./*; do ls "${x::-4}"; done
#for x in ./*; do ffmpeg -i "$x" "${x::-4}".flac; done
