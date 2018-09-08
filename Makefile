all: 
	prettier --write "**/*.ts"
	tsc
	node dist/index.js