
build: components index.js datatable.css template.js
	@component build --dev

template.js: template.html
	@component convert $<

components:
	@component install --dev

clean:
	rm -fr build components template.js

all:
	clear
	make clean
	make

.PHONY: clean all
