import $ from 'jquery';

export default function prepareWindow() {
  $('body').css({
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  });

  $('head>link, head>style')
    .first()
    .before('<style type="text/css">.qbGameObject{border:0;margin:0;padding:0;left:0;top:0;position:absolute}</style>');
}
