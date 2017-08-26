import {assign} from '../utils';
//import $ from 'Zepto';

const http = ({$ctx}) => {

  $ctx.$http = assign((options) => {
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
