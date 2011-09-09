root = this;
isServer = false

#get Event emitter in server or generate it in client
if typeof module isnt 'undefined' and module.exports
	EventEmitter = require( "events" ).EventEmitter
	_ = require( "underscore" )
	isServer = true
else
	class EventEmitter
		# ### constructor
		# **constructor to handle internal events**
		constructor: ->
			@_events = @_events or {}
		
		# ### on
		# **Add an event listener**  
		# **event:** { String } *event name*  
		# **fct:** { Function } *function called on event*  
		on: (event, fct) =>
			@_events = @_events or {}
			@_events[ event ] = @_events[ event ] or []
			@_events[ event ].push( fct )
			return
		
		# ### removeListener
		# **Remove an event listener**  
		# **event:** { String } *event name*  
		# **fct:** { Function } *function called on event* 
		removeListener: (event, fct)=>
			@_events = @_events or {}
			return if( event in @_events is false )
			@_events[ event ].splice( @_events[ event ].indexOf( fct ), 1 )
			return
		
		# ### emit
		# **send a event and run all functions binded to this event**  
		# **event:** { String } *event name*  
		emit: ( event )=>
			@_events = @_events or {}
			return if( event of @_events is false )
			for eReceiver, i in @_events[ event ]
				eReceiver.apply( this, Array.prototype.slice.call( arguments, 1 ) )
			return

class SimpleAsyncRow extends EventEmitter
	constructor: ( @tasks, async, options )->


class SimpleAsync extends EventEmitter
	constructor: ( processing = {}, options = {} )->
		# Option Timeout. Defines the time in milisecnods to wail for a response.
		# Every single response will reset the timeout.
		# If option timeout is 0 the module will wail to infinity 
		options.timeout or= 0

		if not _.isEmpty( processing )
			processing = _.clone( processing )

			@initProcessing()

	initProcessing: =>
		
		for key, tasks of @processing when task isnt null
			@processing[ key ] = new SimpleAsyncRow( tasks, @, options )
		@

	run: ( callback = -> )=>
		processingid = Math.floor( Math.random() * 1000000000 )
		result = {}
		for key, task of @processing when task isnt null
			# no preconditions so run the task 
			console.log "PROCESS", task
			if _.isFunction( task )
				fnCb = _.bind( ( err, res, key, processingid )->
					console.log "int CB", arguments
					return
				, @, key, processingid )

				task.call( @, callback: fnCb, result: result )

		setTimeout( 3000, _.bind( callback, @, null , result ) )

oExport = SimpleAsync


# Export the Underscore object for **CommonJS**, with backwards-compatibility
# for the old `require()` API. If we're not in CommonJS, add `_` to the
# global object.
if typeof module isnt 'undefined' and module.exports
	module.exports = oExport
else
	root.SimpleAsync = oExport
