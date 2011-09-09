http = require( "http" )
_ = require( "underscore" )
SimpleAsync = require( "../async" )

fnRequest = ( req, response )->
	sa = new SimpleAsync( test )
	sa.run ( err, res )->
		response.end( "DONE: #{ JSON.stringify( res ) }" )		
	




# ## Testscripts

# Testfunction
fnTest = ( a, b, async )->
	# printout the last results
	res = a + b

	# define random time and the callback
	time = Math.floor( Math.random() * 2000 )
	fn = _.bind( async.callback, @, null, res )

	console.log "fnTest", async, time
	# run timeout
	setTimeout( time, fn )
	return

# test processing
test = 
	a: _.bind( fnTest, @, 1, 2 )
	b: _.bind( fnTest, @, 1, 2 )

 

http.createServer( fnRequest ).listen( 3001 )
console.log( "Listen to 3001" )