module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "parserOptions": {
        "ecmaFeatures": {
            "ecmaVersion": 8,
            "experimentalObjectRestSpread": true,
            "jsx": true,
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "func-style": [
            2, 
            "expression", { 
                "allowArrowFunctions": true 
            }
        ]
    }
};