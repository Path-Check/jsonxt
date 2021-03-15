/*
 *  lib/encoders/isoyyyymm-2020-base32.js
 *
 *  David Janes
 *  Consenas
 *  2021-03-16
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

const _util = require("../_util")
const NAME = "isoyyyymm-2020-base32"

/**
 *  Encode YYYY-MM dates relative to 2020 (e.g. Expiry Dates)
 *  as a Base 32 Integer
 */
exports.encode = (rule, value) => {
    if (!_util.isString(value)) {
        throw new Error(`${NAME}: expected value to be string`)
    }

    const date = new Date(value)
    
    return _util.integer_to_base32(
        (date.getFullYear() - 2020) * 100 +
        date.getMonth()
    )
}

/**
 */
exports.decode = (rule, value) => {
    throw new Error(`${NAME}: not implemented`)
}