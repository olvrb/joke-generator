all: format build run

build: 
	tsc

format:
	prettier --write "**/*.ts"

run: 
	node dist/index.js
