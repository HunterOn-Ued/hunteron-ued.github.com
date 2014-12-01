/**
 * Created by mizi on 2014/11/24.
 */
'use strict';

angular.module('bfdf.resources.candidate', [])

.service('$_Candidate', ['$resource', function($resource){
    return {
        list: $resource('/store/candidates.json'),
        detail: $resource('/store/candidate.json')
    }
}]);