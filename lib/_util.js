/**
 *  lib/_util.js
 *
 *  David Janes
 *  Consensas
 *  2021-03-09
 *
 *  Copyright (2013-2021) Consensas
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

/**
 *  Drop in replacement for lodash stuff
 */
// https://stackoverflow.com/a/33332038/96338
const isPlainObject = d => 
    (d === void 0 || d === null || Array.isArray(d) || typeof d == "function" || d.constructor === Date ) ?
       false : (typeof d == "object")

// https://stackoverflow.com/a/32922084/96338
const isEqual = (x, y) => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => isEqual(x[key], y[key]))
    ) : (x === y);
}

const isBuffer = v => v instanceof Buffer
const isString = v => typeof v === "string"
const isArray = v => Array.isArray(v)
const isUndefined = v => v === void 0
const isNumber = o => typeof o === "number" && !Number.isNaN(o) && Number.isFinite(o)
const isBoolean = o => typeof o === "boolean"
const isNull = o => o === null

const keys = o => Object.keys(o)
const mapValues = (o, f) => Object.entries(o).forEach(([ key, value ]) => f(value, key))

/**
 */
const split = key => key.split(".")

/**
 */
const get = (d, key) => {
    const parts = split(key)

    while (parts.length && isPlainObject(d)) {
        d = d[parts.shift()]
    }

    return d
}

/**
 */
const encode = s => encodeURI(s).replace(/%22/g, '"')

/**
 */
const isQuotable = s => {
    if (!isString(s)) {
        return false
    } else if (s.indexOf('"') > -1) {
        return true
    } else if (s.match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/)) {
        return true
    } else {
        return false
    }
}

/**
 */
const quote = s => {
    return `"${s.replace(/[\"]/g, '""')}"`
}

/**
 *  API
 */
exports.split = split
exports.get = get
exports.isQuotable = isQuotable
exports.quote = quote
exports.encode = encode
exports.isPlainObject = isPlainObject
exports.isBuffer = isBuffer
exports.isString = isString
exports.isArray = isArray
exports.isUndefined = isUndefined
exports.isNull = isNull
exports.isNumber = isNumber
exports.isBoolean = isBoolean
exports.isEqual = isEqual
exports.keys = keys
exports.mapValues = mapValues