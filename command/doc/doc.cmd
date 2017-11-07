echo '`Git book` server start'

cd _doc/source
gitbook serve -p 4000
open http://localhost:4000