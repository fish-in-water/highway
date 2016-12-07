import {assign} from '../utils';
//import $ from 'Zepto';

const http = function ({$ctx}) {

  $ctx.$http = assign(function (options) {
    return $.ajax(options);
  }, {
    $get: $.get,
    $post: $.post,
    $json: $.getJSON,
    $jsonp: $.ajaxJSONP,
    $settings: $.ajaxSettings || $.ajaxSetup
  });

  return $ctx.$http;
};

export default http;
