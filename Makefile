
# Development shortcuts

server: go-to-ui
	@temporal server start-dev

worker:
	@npm run start.watch

workflow:
	@npm run workflow

go-to-ui:
	@open http://localhost:8233/

test:
	@npm run test:watch
