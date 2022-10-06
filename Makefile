default:
	source  ./env/bin/activate;
	python3 ytg/manage.py runserver 0.0.0.0:8000;

fe:
	npm run dev --prefix frontend

	