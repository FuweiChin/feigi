/**
 * Intl style BytesFormat to format bytes
 * @class
 */
class BytesFormat {
	/**
	 * @constructor
	 * @param {string}  preset - preset name "IEC", "SI" or "default"
	 * @param {BytesFormatOptions} [options]
	 */
	constructor(spec="IEC",options=null){
		if(spec==undefined)
			spec=="default";
		if(!presets.hasOwnProperty(spec))
			throw new TypeError("Invalid spec tag");
		var settings=Object.assign({},presets[spec],options);
		settings.bases=settings.units.map((u,i)=>Math.pow(settings.system,i));
		this._settings=settings;
		this._numberFormat=settings.numberFormat||new Intl.NumberFormat();
	}
	/**
	 * @param {number}  preset - bytes to format
	 * @return {string}
	 */
	format(bytes){
		if(!isFinite(bytes))
			return "";
		var settings=this._settings;
		var unitIndex=settings.unitIndex;
		if(unitIndex<0)
			unitIndex=Math.log(bytes)/Math.log(settings.system)|0;
		var value=bytes/settings.bases[unitIndex];
		value=this._numberFormat.format(value);
		var dotIndex=-1;
		if(unitIndex==0&&(dotIndex=value.indexOf("."))!=-1)//return "1,023" instead of "1,023.00"
			value=value.substring(0,dotIndex);
		var unit=settings.units[unitIndex];
		return value+" "+unit;
	}
}
/**
 * @typedef {Object} BytesFormatOptions
 * @property {number} system - 1024 or 1000 
 * @property {Array} units - local presentation of bytes, kibibytes/kilobytes
 * @property {number} unitIndex - set to -1 to auto-determine unit, or other to use fixed unit
 * @property {Intl.NumberFormat} [filter=(filepath,stats)=>true] given filepath and stats, tell whether to copy
 */
var presets={
	get default(){
		return this["IEC"];
	},
	"IEC": {
		system: 1024,
		units: ["B","KB","MB","GB","TB"],
		unitIndex: -1
	},
	"SI": {
		system: 1000,
		units: ["B","kB","MB","GB","TB"],
		unitIndex: -1
	}
};
