describe("BytesFormat",()=>{
	var numberFormat=new Intl.NumberFormat(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
	var bytesFormat=new BytesFormat("IEC",{numberFormat:numberFormat});
	describe("#format(bytes) to IEC spec format",()=>{
		it("format to B",function(){
			expect(bytesFormat.format(1023)).toBe("1,023 B");
		});
		it("format to KB",function(){
			expect(bytesFormat.format(1025)).toBe("1.00 KB");
			expect(bytesFormat.format(1023*1024)).toBe("1,023.00 KB");
		});
		it("format to MB",function(){
			expect(bytesFormat.format(1.9073486328125*1024*1024)).toBe("1.91 MB");
			expect(bytesFormat.format(1023*1024*1024)).toBe("1,023.00 MB");
		});
	});
});
