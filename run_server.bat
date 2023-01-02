@echo off
cd pocketbase
pocketbase.exe serve
start "" "http://127.0.0.1:8090"