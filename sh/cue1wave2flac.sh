echo "---"
echo $1
echo "---"
shnsplit -f "$1.cue" -t "%n. %t - %p" "$1.wav" -o flac





#working sample
#shnsplit -f "U2-The Best Of 1980-1990.cue" -t "%n. %t - %p" "U2-The Best Of 1980-1990.wav" -o flac
#shnsplit -f "Queen - Greatest Hits II (UHQCD).cue" -t "%n. %t - %p" "Queen - Greatest Hits II (UHQCD)".flac -o flac

