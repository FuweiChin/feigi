describe("Timer",()=>{
	it("start, tick and complete",(done)=>{
		var timer=new Timer(1000,5);
		var tickCount=0;
		timer.addEventListener("timer",function(){
			tickCount++;
		});
		timer.addEventListener("timerComplete",function(){
			expect(tickCount).toBe(5);
			expect(timer.repeatCount).toBe(5);
			done();
		});
		timer.start();
	},6000);
});
