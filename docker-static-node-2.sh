#!/bin/bash

build() {
	sudo docker build -t bitliner/static-node-2 .
}
push() {
	sudo docker push bitliner/static-node-2
}

usage() {
	echo "Actions:"
	echo "		build	build the image"
	echo "		push	push the image"
}

case $1 in
	build)
		build;;
	push)
		push;;
	*)
		usage;;
esac
