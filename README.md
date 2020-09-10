Для доступа к API использован json-server
> https://github.com/typicode/json-server

запуском команды
- json-server --watch fake-server/entities.json --port 3001 с указанием кастомного порта
- json-server --watch fake-server/entities.json --port 3001 --host 192.168.ХХХ.ХХХ с указанием URL виртуальной машины для доступа с хоста
- json-server --watch fake-server/entities.json --port 3001 --host 192.168.ХХХ.ХХХ --delay 3000 с выставлением задержки ответа сервера в 3s

Файл фейковой БД `/fake-server/entities.json`