/**
 * Created by Antony on 2014/11/9.
 */

'use strict';
angular.module('app.tools', []).factory('tools', function () {
    var breaker = {};

    return {
        parseJSON: parseJSON
    };

    function parseJSON(json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
});