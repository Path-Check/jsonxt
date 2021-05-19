/*
 *  lib/index.js
 *
 *  David Janes
 *  Consenas
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

module.exports = Object.assign(
    {},
    require("./pack"),
    require("./unpack"),
    require("./resolve"),
    {
        resolvers: require("./resolvers"),
        encoders: {},
        decoders: {},
        schemas: {},
    }
)

const fs = require("fs")
const path = require("path")
/* istanbul ignore next */
const files = fs.readdirSync(path.join(__dirname, "coders"))
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
        const name = path.basename(file, ".js")
        const coder = require(`./coders/${file}`)
        if (coder.encode && coder.decode) {
            module.exports.encoders[name] = coder.encode
            module.exports.decoders[name] = coder.decode
        }
        if (coder.schema) {
            module.exports.schemas[name] = coder.schema
        }
    })

module.exports.ENCODE = {
    ESCAPE: "~",
    UNDEFINED: "",
    EMPTY_STRING: "~",
    NULL: "~.",
}
