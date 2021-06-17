'use strict';
	const w = window;

	const scrollRefs = ( pos = 0) => w.scrollTo({top: pos, behavior:'smooth'});
	const scrollOffs = ( { offsetTop : offset } , top = 100 ) => scrollRefs(offset - top);

	const logConsole = ( par ) => {
		console.warn('from helpers',par);
	};

	const ObjConfig = {key:'no valid for the future GAAAA', post:'nel prro'};

export { scrollRefs, scrollOffs, logConsole, ObjConfig as default};
