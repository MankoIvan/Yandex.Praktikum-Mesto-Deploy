module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "commonjs": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
    ],
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-underscore-dangle": [
        "error",
        {
          "allow": [
            "_id",
          ]
        }
      ]
    }
};