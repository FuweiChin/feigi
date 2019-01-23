/**
 * A File filter by file name extension or file mime type
 * @class FileFilter
 */
class FileFilter{
	/**
	 * @constructor
	 * @param {string} accept - attribute "accept" of `<input type="file" accept=".jpg" />`
	 */
	constructor(accept){
		this.conditions=accept.match(/[^,]+/g);
	}
	/**
	 * @method accept
	 * @param {File} file
	 * @return {boolean}
	 */
	accept(file){
		var conditions=this.conditions;
		if(conditions==null)
			return true;
		return conditions.some(function(c){
			if(c.charAt(0)=="."){//assuming c is a extname like '.jpg'
				let filename=file.name||"";//incase of Blob
				let index=filename.lastIndexOf(".");
				let extname=index==-1?"":filename.substring(index);
				return extname.toLowerCase()==c.toLowerCase();
			}else{//assuming c is mime type like 'image/jpeg', 'image/*', '*/javascript' or '*/*'
				let index=c.indexOf("*");
				let lastIndex=c.lastIndexOf("*");
				if(index==-1){//zero asterisk like 'image/jpeg'
					return c==file.type;
				}else if(index==lastIndex){
					if(index==c.length-1){//like 'image/*'
						let prefix=c.substring(0,index);
						return file.type.slice(0,prefix.length)==prefix;
					}else if(index==0){//like '*/javascript'
						let suffix=c.substring(1);
						return file.type.slice(-suffix.length)==suffix;
					}
				}else{//maybe '*/*'
					let str=c.substring(index+1,lastIndex);
					return file.type.indexOf(str)!=-1;
				}
				return false;
			}
		});
	}
}
