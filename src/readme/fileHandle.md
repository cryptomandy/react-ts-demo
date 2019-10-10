### vue 项目中下载数据量大的 excel 文件或者二进制文件

1. 请求数据，responseType == 'Blob '|| 'ArrayBuffer'

responseType 值的类型：

| 值          |                   数据类型 |
| :---------- | -------------------------: |
| ''、 text   | DOMString (这个是默认类型) |
| arraybuffer |           ArrayBuffer 对象 |
| blob        |                  Blob 对象 |
| document    |              Document 对象 |
| json        |          JavaScript object |

- ArrayBuffer：代表内存之中的一段二进制数据，一旦生成不能再改。可以通过视图（TypedArray 和 DataView）进行操作
- Blob： Blob 对象表示不可变的类似文件对象的原始数据。Blob 表示不一定是 JavaScript 原生形式的数据。
  blob 对象本质上是 js 中的一个对象，里面可以储存大量的二进制编码格式的数据。

```js
let blog = new Blob(['后台返回的二进制文件'], {
  type: '该文件是什么类型的文件(MIME)'
});
```

type 类型：[转载]：[https://blog.csdn.net/chenhuaa123/article/details/81052115]

```json
后缀名       MIME名称
*.3gpp    audio/3gpp, video/3gpp
*.ac3    audio/ac3
*.asf       allpication/vnd.ms-asf
*.au           audio/basic
*.css           text/css
*.csv           text/csv
*.doc    application/msword    
*.dot    application/msword    
*.dtd    application/xml-dtd    
*.dwg    image/vnd.dwg    
*.dxf      image/vnd.dxf
*.gif            image/gif    
*.htm    text/html    
*.html    text/html    
*.jp2            image/jp2    
*.jpe       image/jpeg
*.jpeg    image/jpeg
*.jpg          image/jpeg    
*.js       text/javascript, application/javascript    
*.json    application/json    
*.mp2    audio/mpeg, video/mpeg    
*.mp3    audio/mpeg    
*.mp4    audio/mp4, video/mp4    
*.mpeg    video/mpeg    
*.mpg    video/mpeg    
*.mpp    application/vnd.ms-project    
*.ogg    application/ogg, audio/ogg    
*.pdf    application/pdf    
*.png    image/png    
*.pot    application/vnd.ms-powerpoint    
*.pps    application/vnd.ms-powerpoint    
*.ppt    application/vnd.ms-powerpoint    
*.rtf            application/rtf, text/rtf    
*.svf           image/vnd.svf    
*.tif         image/tiff    
*.tiff       image/tiff    
*.txt           text/plain    
*.wdb    application/vnd.ms-works    
*.wps    application/vnd.ms-works    
*.xhtml    application/xhtml+xml    
*.xlc      application/vnd.ms-excel    
*.xlm    application/vnd.ms-excel    
*.xls           application/vnd.ms-excel    
*.xlt      application/vnd.ms-excel    
*.xlw      application/vnd.ms-excel    
*.xml    text/xml, application/xml    
*.zip            aplication/zip    
*.xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

- Blob() 构造函数返回一个新的 Blob 对象。
- array 是一个由 ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings 会被编码为 UTF-8。

```js
setDownLoad(url, params){
  this.$http({
    url:url,
    method:'post',
    headers:{
      //请求头token等
    },
    responseType: 'blob' || 'ArrayBuffer' //指定接口返回一个Blob对象
  }).then(res => {
    //处理数据
    this.downloadFileEvt(res);
  })
}
```

2. 数据处理方法

```js
downloadFileEvt(response, fileName) {
  const blob = new Blob([response], {
    type: 'application/vnd.ms-excel'
  });
  if (
    'download' in document.createElement('a') &&
    navigator.userAgent.indexOf('Edge') <= -1
  ) {
    // 非IE 及edge下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveOrOpenBlob(blob, fileName);
  }
}
```
