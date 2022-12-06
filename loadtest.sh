echo tests on redirection
echo ______________________
echo                
npx autocannon http://localhost:3001/RM_g-KgUG  -c 100 -w 3

echo tests on form submittion
echo ______________________
echo                          
npx autocannon http://localhost:3001/shorten -m POST -H Content-Type=application/json -b '{"title": "some title", "description": "some description", "url": "https://www.google.com/search?q=google&oq=google&aqs=chrome.0.69i59l3j69i60l3j69i65l2.1357j0j1&sourceid=chrome&ie=UTF-8'${RANDOM}\"'}' -c 100 -w 3