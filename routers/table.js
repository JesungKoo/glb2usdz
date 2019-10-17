const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const THREE = require('three');
const program = require('commander');
const Canvas = require('canvas');
const { Blob, FileReader } = require('vblob');

// Patch global scope to imitate browser environment.
global.window = global;
global.Blob = Blob;
global.FileReader = FileReader;
global.THREE = THREE;
global.document = {
  createElement: (nodeName) => {
    if (nodeName !== 'canvas') throw new Error(`Cannot create node ${nodeName}`);
    const canvas = new Canvas(256, 256);
    // This isn't working — currently need to avoid toBlob(), so export to embedded .gltf not .glb.
    // canvas.toBlob = function () {
    //   return new Blob([this.toBuffer()]);
    // };
    return canvas;
  }
};

require('three/examples/js/exporters/GLTFExporter');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('table');
  })

router.route('/output')
  .get((req, res) => {
    res.send('heelo');
  })
  .post((req, res) => {
    const table = req.body;
    const width = table.x/100;
    const length = table.y/100;
    const height = (table.z - table.topThickness)/100;
    const topT = table.topThickness/100;
    const legT = table.legThickness/100;
    createTable(width, length, height, topT, legT);
    
    res.render('table-output', { table: req.body });
    exec('sh glb2usdz.sh');
  });

router.route('/ar')
  .get((req, res) => {
    res.render('table-ar');
  });

module.exports = router;



function createTable(width, length, height, topT, legT) {
  const topColor = 0x000000;
  const legColor = 0x000000;

  const legPosX = (width - legT)/2;
  const legPosY = (length - legT)/2;

  const topGeo = new THREE.BoxBufferGeometry(width, topT, length);
  const topMat = new THREE.MeshStandardMaterial( { color: topColor } );
  const top = new THREE.Mesh( topGeo, topMat );
  top.position.set(0, height + topT/2, 0);

  const legGeo = new THREE.BoxBufferGeometry(legT, height, legT);
  const legMat = new THREE.MeshStandardMaterial( {color: legColor} );
  const legHeight = height/2;
  const leg1 = new THREE.Mesh(legGeo, legMat);
  const leg2 = new THREE.Mesh(legGeo, legMat);
  const leg3 = new THREE.Mesh(legGeo, legMat);
  const leg4 = new THREE.Mesh(legGeo, legMat);
  leg1.position.set(-legPosX, legHeight, legPosY);
  leg2.position.set(legPosX, legHeight, legPosY); 
  leg3.position.set(legPosX, legHeight, -legPosY);
  leg4.position.set(-legPosX, legHeight, -legPosY);

  const table = new THREE.Object3D();
  table.add(top,leg1,leg2,leg3,leg4);

  const exporter = new THREE.GLTFExporter();
  exporter.parse(table, (gltf) => {
    gltf = JSON.stringify(gltf);
    fs.writeFile('model.gltf', gltf, (err) => {
      if (err) throw err;
      console.log('file saved!');
    });
  }, {'binary': false});

}