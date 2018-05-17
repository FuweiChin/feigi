/**
 * @class FileFilter
 * @constructor
 * @param {string} accept - property "accept" of `<input type="file" accept=".jpg" />` or HTMLInputElement
 */
function FileFilter(accept){
	this.conditions=accept.match(/[^,]+/g);
}
/**
 * @method test
 * @param {File} file
 * @return {boolean}
 */
FileFilter.prototype.test=function(file){
	var conditions=this.conditions;
	if(conditions==null)
		return true;
	return conditions.some(function(c){
		if(c.charAt(0)=="."){//assuming c is a extname like '.jpg'(in lower case)
			var index=file.name.lastIndexOf(".");
			var extname=index==-1?"":file.name.substring(index);
			return extname.toLowerCase()==c;
		}else{//assuming c is mime type like 'image/jpeg', 'image/*', '*/javascript' or '*/*'
			var index=c.indexOf("*");
			var lastIndex=c.lastIndexOf("*");
			if(index==-1){//zero asterisk like 'image/jpeg'
				return c==file.type;
			}
			if(index==lastIndex){
				if(index==c.length-1){//like 'image/*'
					var prefix=c.substring(0,index);
					return file.type.slice(0,prefix.length)==prefix;
				}else if(index==0){//like '*/javascript'
					var suffix=c.substring(1);
					return file.type.slice(-suffix.length)==suffix;
				}
			}else{//maybe '*/*'
				var str=c.substring(index+1,lastIndex);
				return file.type.indexOf(str)!=-1;
			}
			return false;
		}
	});
};


//example
function test(){
	var imageFileFilter=new FileFilter(".jpg,.png,image/png,image/jpeg");
	var textFile=new File([""],"demo.txt",{type:"text/plain"});
	var imageFile=new File([""],"cover.jpg",{type:"image/jpeg"});
	var imageFileNoExt=new File([""],"cover",{type:"image/png"});
	console.info("starting asserts");
	console.assert(!imageFileFilter.test(textFile), textFile.name, "won't match", imageFileFilter.conditions.join(","));
	console.assert(imageFileFilter.test(imageFile), imageFile.name, "will match", imageFileFilter.conditions.join(","));
	console.assert(imageFileFilter.test(imageFileNoExt), imageFileNoExt.name, "match match", imageFileFilter.conditions.join(","));
	console.info("done test");
}

