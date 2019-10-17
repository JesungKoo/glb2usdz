#!/bin/sh
cd usdpython_0
BASEPATH=$(dirname "$0")
export PATH=$PATH:$BASEPATH/USD:$PATH:$BASEPATH/usdzconvert;
export PYTHONPATH=$PYTHONPATH:$BASEPATH/USD/lib/python
usdzconvert ../model.gltf ../public/model.usdz