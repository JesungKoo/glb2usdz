# GLTF TO USDZ

## 목표

FE 화면에서 버튼 클릭시, GLTF가 생성된다(미구현). 이때, 생성된 GLTF를 USDZ로 변환하는 기능을 구현한다.

## 필요 기술

* Node.js
* Express.js
* Shell Scripting
* [Apple usdzconvert library](https://developer.apple.com/download/more/?=USDPython) --> 이 파일을 받아서 레포지토리 폴더에 넣어야함.

## 시작점

0. git & gitignore

```bash
echo "node_modules" > .gitignore
git init
```

1. 익스프레스 서버 만들기

```bash
npm i --save express 
```

템플릿 엔진은 ejs로
```bash
npm i ejs
```

2. 간단한 POST

```html
<form method="post" class="convert">
  <button type="submit">Convert!</button>
</form>
```

3. 앱이 POST를 받으면

```js
app.post('/', (req, res) => res.send('POST Req'));
```

## 해결해야할 문제

POST를 받는 것까진 쉽다. POST를 받았을 때 모델 컨버팅을 하는 방법은?

1. 먼저 USDZ convert를 활성화한다.

노드가 접근하는 쉘이 이 디렉토리라 가정을 하고

```bash
cd usdpython_0
./USD.command
```

2. 변환을 한다

```bash
usdzconvert ../model.glb ../model.usdz
```

이제 이 과정속에서 노드와 쉘간의 통신만 어떻게 처리하면 되는데.

### 해법

`app.js` 파일에서 다음 로직을 구현한다.

```js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.post('/', (req, res) => {
  exec('sh gltf2usdz.sh');
  res.send("Done!");
});
```

`gltf2usdz.sh` 파일은 다음과 같이 구성되어 있다.

```bash
#!/bin/sh
cd usdpython_0
BASEPATH=$(dirname "$0")
export PATH=$PATH:$BASEPATH/USD:$PATH:$BASEPATH/usdzconvert;
export PYTHONPATH=$PYTHONPATH:$BASEPATH/USD/lib/python
usdzconvert ../model.glb ../model.usdz
```

루트 디렉토리의 `model.glb`를 `model.usdz`로 바꾸는데 성공하였다.

### 추가 문제 발생

1. Mac이 아니면 usdzconvert 사용 자체가 불가능하다면? 사실 이 모든게 꿈이라면? 그런데 그것이 실제로 일어났습니다. 현재 맥에서만 사용 가능한듯.
2. 파일 이름에 대한 원칙이 필요하다. 실제 저장은 어떤 방식으로 할건지? 계속 사용자가 그걸 확인할 수 있게 하려면 사용자 정보가 있거나, 이름이 있거나 해야할 것 같은데.

