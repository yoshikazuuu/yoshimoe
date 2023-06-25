#!/bin/zsh

# Input directory containing the images to resize
input_dir="public/img"

# Output directory to save the resized images
output_dir="public/img-small"

# Loop through all image files in the input directory
for file in "$input_dir"/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    output_file="$output_dir/${filename%.*}_small.${filename##*.}"
    
    ffmpeg -i "$file" -vf scale=20:-1 "$output_file"
    
    echo "Resized: $file -> $output_file"
  fi
done
