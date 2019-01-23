describe("FileFilter",()=>{
	var imageFileFilter=new FileFilter(".jpg,.png,image/png,image/jpeg");
	var textFile=new File([""],"foo.txt",{type:"text/plain"});
	var imageFile=new File([""],"foo.jpg",{type:"image/jpeg"});
	var imageFileNoExt=new File([""],"foo",{type:"image/png"});
	describe("#accept(file)",()=>{
		it("not accept text file",()=>{
			expect(imageFileFilter.accept(textFile)).toBe(false);
		});
		it("accept image file",()=>{
			expect(imageFileFilter.accept(imageFile)).toBe(true);
		});
		it("accept image file with no extension",()=>{
			expect(imageFileFilter.accept(imageFileNoExt)).toBe(true);
		});
	});
});
