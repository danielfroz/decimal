#!/bin/sh
#
# Test script
# Author: Daniel Froz <daniel.froz@actt.io>
#

CONFIG=""
if [ -f deno-local.json ]; then
  CONFIG="--config deno-local.json"
fi

ARGS=""
case $1 in -r*)
  ARGS="-r"
esac

deno test $ARGS -A $CONFIG .