"use strict";
(() => {
var exports = {};
exports.id = 958;
exports.ids = [958];
exports.modules = {

/***/ 5940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ new_meetup)
});

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./pages/api/new-meetup.js

// api/new-meetup
// POST /api/new-meetup
const handler = async (req, res)=>{
    //console.log(req.method)
    if (req.method === "POST") {
        console.log("It working");
        const data = req.body;
        const { title , image , address , description  } = data;
        //as this returns some promises so we use async in this method
        const client = await external_mongodb_namespaceObject.MongoClient.connect("mongodb+srv://AkashRana:Akku1234@cluster0.legjxaa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0");
        const db = client.db(); //this used to hold of our database an if not any then it will create some
        //collection is a table in our table and document will of entries
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({
            message: "Meetup inserted!"
        });
    }
};
/* harmony default export */ const new_meetup = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5940));
module.exports = __webpack_exports__;

})();