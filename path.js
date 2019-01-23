/**
 * @module path
 */
var path={
  /**
   * @readonly
   * @type {string}
   */
  get sep(){
    return "/";
  },
  /**
   * @param {string} str - file path or file name
   * @return {string}
   */
  dirname(str){
    var pos=str.lastIndexOf("/");
    var name=pos==-1?"./":str.substring(0,pos+1);
    if(typeof ext=="string"&&name.endsWith(ext))
      return name.slice(0,-ext.length);
    return name;
  },
  /**
   * @param {string} str - file path or file name
   * @param {string} [ext] - like ".txt" 
   * @return {string}
   */
  basename(str,ext){
    var pos=str.lastIndexOf("/");
    var name=pos==-1?str:str.slice(pos+1);
    if(typeof ext=="string"){
      if(ext.length>0&&name.endsWith(ext))
        return name.slice(0,-ext.length);
    }
    return name;
  },
  /**
   * @param {string} str - file path or file name
   * @return {string}
   */
  extname(str){
    var pos=str.lastIndexOf("/");
    var name=pos<0?str:str.substring(pos+1);
    var pos2=name.lastIndexOf(".");
    var ext=pos2<0||pos2==name.length-1?"":name.substring(pos2);
    return ext;
  },
  /**
   * resolve paths, originally based on pathname of `document.baseURI`
   * @param {string} [paths*]
   * @return {string}
   */
  resolve(...paths){
    var url=new URL(document.baseURI);
    for (var i = 0, iMax=arguments.length-1; i < arguments.length; i++) {
      var arg = arguments[i];
      if (arg.length > 0){
        if(i!=iMax&&!arg.endsWith("/"))
          arg+="/";
        url=new URL(arg,url.href);
      }
    }
    return url.pathname;
  }
};