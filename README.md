# GLB TO USDZ

## What is this?

A model generator that creates GLB/GLTF & USDZ model based on input data.

## Prerequisites

* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com)
* [EJS](https://ejs.co)
* [THREE.js](https://threejs.org)
* Shell Scripting
* [Apple usdzconvert library](https://developer.apple.com/download/more/?=USDPython) --> This library should be at project root directory

## How to start

First, clone the repo at your local device.

```bash
git clone https://github.com/JesungKoo/glb2usdz.git
```

Go to root directory.

```bash
cd glb2usdz
```

Run app.js

```bash
node app
```


## Updates

### 20191010

* add THREE.js based table mockup
* add gltf Exporter (half done)

### 20191016

* separate router modules
* add body-parser for handling POST request