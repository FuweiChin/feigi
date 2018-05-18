function extractSnippets(code){
	var regex=/\/\/```(\w+)\r?\n([\s\S]+?)(?:\/\/```)(\r?\n|$)/mg;
	var snippets={};
	code.replace(regex,function($0,lang,block){
		var blocks=snippets[lang];
		if(!Array.isArray(blocks)){
			blocks=new Array();
			snippets[lang]=blocks;
		}
		blocks.push(block);
		return "";
	});
	return snippets;
}

var code=`//\`\`\`sh
#!/bin/bash
echo "$HOME"
//\`\`\`

//\`\`\`sh
#!/bin/zsh
echo "$HOME"
//\`\`\`

//\`\`\`bat
@echo off
echo %UserProfile%
//\`\`\`
`;

var snippets=extractSnippets(code);
console.log(snippets);
/*{
	"sh": [
		"#!/bin/bash...",
		"#!/bin/zsh..."
	],
	"bat": [
		"@echo off..."
	]
}*/
