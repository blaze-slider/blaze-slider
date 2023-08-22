#!/bin/bash
if [ ! "$BUILTIN_STATIC_S3_URI" ]; then
    echo "Missing S3 URI; exiting"
    exit 1
fi

ASSETDIRS=$(find dist -type d -mindepth 1 -maxdepth 3 -exec basename {} \;)
for i in $ASSETDIRS
do
    if [ ! -d "dist/${i}" ]
    then
        continue
    fi
    aws s3 sync "blaze-slider/dist/${i}" "${BUILTIN_STATIC_S3_URI}/dist/blaze/${i}"

done
