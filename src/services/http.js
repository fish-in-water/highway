import {assign} from '../utils';
//import $ from 'Zepto';

/**
 * http服务
 * @param param0 
 */
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
