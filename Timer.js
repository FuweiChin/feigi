/**
 * JavaScript edition of ActionScript's flash.utils.Timer
 * @class
 */
class Timer extends EventTarget {
	/**
	 * @constructor
	 * @param {number} delay - interval milliseconds for the timer
	 * @param {number} [repeatCount] - default to 0 which means unlimited repeat
	 */
	constructor(delay,repeatCount=0){
		super();
		this._delay=Math.max(delay|0,1);
		this._repeatCount=Math.max(repeatCount|0,0)||0x7FFFFFFF;
		this._handle=0;
		this._currentCount=0;
	}
	/**
	 * @property {number} delay
	 */
	get delay(){
		return this._delay;
	}
	set delay(value){
		this._delay=Math.max(value|0,1);
	}
	/**
	 * @property {number} repeatCount
	 */
	get repeatCount(){
		return this._repeatCount;
	}
	set repeatCount(value){
		this._repeatCount=Math.max(value|0,0);
	}
	/**
	 * @readonly
	 * @property {number} currentCount
	 */
	get currentCount(){
		return this._currentCount;
	}
	/**
	 * @readonly
	 * @property {number} running
	 */
	get running(){
		return this._handle==0;
	}
	/**
	 * start the timer if not running
	 */
	start(){
		if(this._handle!=0)
			return;
		this._handle=setInterval(()=>{
			if(this._currentCount<this._repeatCount){
				this.dispatchEvent(new Event("timer"));
				if(++this._currentCount==this._repeatCount){
					this.stop();
					this.dispatchEvent(new Event("timerComplete"));
				}
			}
		},this._delay);
	}
	/**
	 * stop the timer if running
	 */
	stop(){
		if(this._handle==0)
			return;
		clearInterval(this._handle);
		this._handle=0;
	}
	/**
	 * stop the timer if running and set currentCount to 0
	 */
	reset(){
		this.stop();
		this._currentCount=0;
	}
}