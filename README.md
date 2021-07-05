# candidateScore



curl --location --request POST 'http://localhost:8080/register' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{

"name":"",
"email":"pramod@gmail.com"


}'



curl --location --request POST 'http://localhost:8080/addScore' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{

"candidateId":"60e0714ca3836b22640b1764",
"score":9,
"round":"third_round"


}'


curl --location --request GET 'http://localhost:8080/highestScore' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw ''
