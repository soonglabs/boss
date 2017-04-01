![Soong Research Labs](assets/soong.png "Soong Research Labs")

# BOSS - the browser operating system simulator
[![Build Status](https://travis-ci.org/soonglabs/boss.svg?branch=master)](https://travis-ci.org/soonglabs/boss)
[![npm version](https://badge.fury.io/js/soonglabs-boss.svg)](https://badge.fury.io/js/soonglabs-boss)

The Browser Operating System Simulator. http://www.boss.computer

## Getting Started

Want to use boss in your project? The following steps should help get you started. 
See the example directory in this repo.

`npm install soonglabs-boss`

Because boss executes js dynamically, it is recomended to always run boss in an sandboxed iframe.

index.html

```
<iframe sandbox="allow-scripts allow-modals allow-popups" src="./boss.html"></iframe>
```
In your boss.html include the boss.js, and boss.css files. A default image (image.js) is also included.
Make sure you include any other js/css files that your image requires. See example/boss.html to see what the
default image requires.

boss.html

```
<html>
 <head>
    <script src="node_modules/dist/js/boss.js"></script>
    <script src="node_modules/dist/image.js"></script>
    <link href="node_modules/dist/css/boss.css" rel="stylesheet"/>
    <script>
      'use strict';
      ($(document).ready(function() {
          var newBoss = new Boss(boss_image, 'BOSS-dev', 'prod');
          newBoss.cmd.shell('', null);
      }));
    </script>           
    <title>BOSS</title>
  </head>
  <body id="boss"></body>
</html>
```

## Installation

Clone the repo

```
git clone git+https://github.com/soonglabs/boss.git
```

Install dependencies

```
npm install gulp -g
npm install
```

### Run Local server

Build and run local dev server on port 8080

```
npm start
```

### Run Tests

```
npm test
```


