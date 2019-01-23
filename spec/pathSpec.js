describe("path",()=>{
	it(".dirname(str)",()=>{
		//common
		expect(path.dirname("/path/to/foo.html")).toBe("/path/to/");
		expect(path.dirname("/path/to/")).toBe("/path/to/");
		//special
		expect(path.dirname("path/to/foo.html")).toBe("path/to/");
		expect(path.dirname("foo.html")).toBe("./");
	});
	it(".basename(str)",()=>{
		//common
		expect(path.basename("foo.html")).toBe("foo.html");
		expect(path.basename("/path/to/foo.html")).toBe("foo.html");
		//special
		expect(path.basename("/path/to/")).toBe("");
		expect(path.basename("/path/to/..")).toBe("..");
		//with ext common
		expect(path.basename("foo.exe",".exe")).toBe("foo");
		expect(path.basename("FOO.EXE",".exe")).toBe("FOO.EXE");
		//with ext special
		expect(path.basename("foo.tar.gz",".tar.gz")).toBe("foo");
		expect(path.basename("foo.html","")).toBe("foo.html");
	});
	it(".basename(str,ext)",()=>{
		//common
		expect(path.basename("foo.exe",".exe")).toBe("foo");
		expect(path.basename("FOO.EXE",".exe")).toBe("FOO.EXE");
		//with ext special
		expect(path.basename("foo.tar.gz",".tar.gz")).toBe("foo");
		expect(path.basename("foo.html","")).toBe("foo.html");
	});
	it(".extname(str)",()=>{
		//common
		expect(path.extname("foo.html")).toBe(".html");
		expect(path.extname("foo.tar.gz")).toBe(".gz");
		expect(path.extname("/path/to/foo.html")).toBe(".html");
		//special
		expect(path.extname(".gitignore")).toBe(".gitignore");
		expect(path.extname("foo.")).toBe("");
		expect(path.extname("FOO.EXE")).toBe(".EXE");
		expect(path.extname("/path/to/foo.html/")).toBe("");
	});
	it(".resolve(path)",()=>{
		//common
		var a=document.body.appendChild(document.createElement("a"));
		a.setAttribute("href","/path/to/foo.html");
		expect(path.resolve("/path/to/foo.html")).toBe(a.pathname);
		a.setAttribute("href","foo.html");
		expect(path.resolve("foo.html")).toBe(a.pathname);
		//special
		a.setAttribute("href","./foo.html");
		expect(path.resolve("./foo.html")).toBe(a.pathname);
		a.setAttribute("href","../foo.html");
		expect(path.resolve("../foo.html")).toBe(a.pathname);
	});
	it(".resolve(...paths)",()=>{
		//var stripDrive=(str)=>str.replace(/(^\/[A-Z]:|)/,"");
		var drivePrefix=(location.pathname.match(/\/C:/)||[""])[0];
		//common
		expect(path.resolve("/path","to","foo.html")).toBe(drivePrefix+"/path/to/foo.html");
		expect(path.resolve("/path/","to/","foo/")).toBe(drivePrefix+"/path/to/foo/");
		//special
		expect(path.resolve("path","/to","foo.html")).toBe(drivePrefix+"/to/foo.html");
		expect(path.resolve("path","to","/foo.html")).toBe(drivePrefix+"/foo.html");
	});
});