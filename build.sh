#!/bin/bash

CLIENT_PUBLIC_BUNDLE_FILE=./client/public/index_bundle.js
SERVER_PUBLIC_BUNDLE_FILE=./server/public/index_bundle.js

if [ -f "$CLIENT_PUBLIC_BUNDLE_FILE" ]; then
    echo "기존 client 번들 결과 파일을 삭제합니다..."
    rm "$CLIENT_PUBLIC_BUNDLE_FILE"
fi

if [ -f "$SERVER_PUBLIC_BUNDLE_FILE" ]; then
    echo "기존 server 번들 결과 파일을 삭제합니다..."
    rm "$SERVER_PUBLIC_BUNDLE_FILE"
fi

cd ./client

echo "FE 빌드를 시작합니다..."
npm run build

echo "빌드 된 결과 bundle 파일을 server의 public 디렉토리로 복사합니다"
cp ./public/index_bundle.js ../server/public/

sleep 1
cd ../

if [ -f "$SERVER_PUBLIC_BUNDLE_FILE" ]; then
    echo "$SERVER_PUBLIC_BUNDLE_FILE 이동 완료!"
fi
