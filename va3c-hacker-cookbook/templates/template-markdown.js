
<small>
<u>[0]</u> = Open in new tab/window  
<u>links</u> = Open inside this viewer
</small>

<details>
<summary><hh>summary</hh></summary>
details details
</details>

<style>#hh { color: #f00; display:inline; margin: 0; padding: 0; }</style>
<style>img { width: 375px; } </style>


		loadMarkdownInMenu( 'readme.md', menu );

		loadSTLInIframe( '#./stl/' + file[0] + '#axis#gradient#grid#ground#random#' );




	function slideMenu(){

		header.style.left = header.style.left === '20px' ? '350px' : '20px';

	}



	function onHashChange() {

		hashes = location.hash.split ( '#' );

		if ( hashes.length < 1 ) { return; } 

		var fileName = hashes[ 1 ].toLowerCase();

		var fileType = (fileName.substr( fileName.lastIndexOf( '.' )).toLowerCase() );

		if ( fileType === '.html' || fileType === '.htm' ) {

			loadHTMLInIframe( location.hash );

		} else if ( fileType === '.md' ) {

			loadMarkdownInIframe( location.hash );

		} else if ( fileType === '.json' || fileType === '.js' ) {

			loadJSONInIframe( location.hash );

		}

	}



	function loadJSONInIframe( hash, callback ) {

		var hashes = hash.split ( '#' );

		add = hashes.indexOf( 'add=true' ) === -1 ? false : true;

		if ( !ifr || add === false ) {

			loadThreeJSInIframe( hash, callback );

		} else {

			ifr.contentWindow.loadFileJSON( hash, callback );

			history.pushState( '', document.title, window.location.pathname );

		}

		function callback() {

console.log( 'loaded: ', hashes[ 1 ] );

		}

	}

	function loadMarkdownInMenu( fileName, panel ) {

		var converter = new Showdown.converter();

		var xmlHttp = new XMLHttpRequest ();
		xmlHttp.open( 'GET', fileName, true );
		xmlHttp.onreadystatechange = callback;
		xmlHttp.send( null );

		function callback() {

			text = xmlHttp.responseText;

			panel.innerHTML = converter.makeHtml( text );

		}

	}

/*

Using srcdoc means not having to create an extra file.

Yes, quotes are cumbersome - but just for now. ECMA 6 - coming soon - requires quotes only at start and finish 

*/

	function loadMarkdownInIframe( hashes, callback ) {

		ifr = resetIframe( callback );

		var srcdoc =  "<div id=doc ><\/div>" +

			"<script src=http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js ><\/script>" +

			"<script>" +

			"	doc.style.cssText = 'font: bold 12pt monospace; margin-left: 80px; max-width: 900px';" +

			"	var xmlHttp;" +

			"	var converter = new Showdown.converter();" +

			"	requestFile( '" + hashes + "' );" +

			"	function requestFile( fileName ) {" +

			"		xmlHttp = new XMLHttpRequest();" +
			"		xmlHttp.open( 'GET', fileName, true );" +
			"		xmlHttp.onreadystatechange = callback;" +
			"		xmlHttp.send( null );" +

			"	}" +

			"	function callback() {" +

			"		var text = xmlHttp.responseText;" +
			"		text = converter.makeHtml( text );" +
			"		doc.innerHTML = text;" +

			"	}" +

			"<\/script>" +

		"";

		ifr.srcdoc = srcdoc;

		slideMenu(); // to hide

		location.hash = '';

	};